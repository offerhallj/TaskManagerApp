import { User } from "../../dist/user/User.js";
import { Repository } from "../repository.js";

const USER_TABLE = "user_table";

export class UserRepository extends Repository<UserRepository> {
    static get Instance(): UserRepository {
        return this.getInstance<UserRepository>(UserRepository);
    }
    
    constructor() {
        super();
        this.openDatabase();
    }
    
    // I used this article to help get started with IndexedDB
    // https://blog.logrocket.com/using-indexeddb-complete-guide/
    /** Open the USER_TABLE with indexedDB */
    private openDatabase() {
        const request = window.indexedDB.open(USER_TABLE, 1);
    
        request.addEventListener("error", () => {
            console.log("Error opening database");
            }
        );
    
        request.addEventListener("success", () => {
            console.log("Successfully opened database");    
            this._db = request.result;
            this._dbIsOpen = true;
            this.perfomDelayedExecution();
            }
        );
    
        // I was having an issue getting result from the EventTarget; 
        // after doing a bit of post I found this article that said to typecast it
        // https://stackoverflow.com/questions/75953640/how-to-get-event-target-result-in-javascript-indexdb-typescript-working
        request.addEventListener("upgradeneeded", init => {
            this._db = (init.target as IDBOpenDBRequest).result;
    
            this._db.onerror = () => {
                console.error('Error loading database.');
            };

            const table = this._db?.createObjectStore(USER_TABLE, { keyPath: "id", autoIncrement:true});
            table?.createIndex("username", "username", { unique: true});
            table?.createIndex("password", "password", { unique: false});
            table?.createIndex("email", "email", { unique: true});
            table?.createIndex("activeToken", "activeToken", { unique: false});
            this._dbIsOpen = true;

            this.perfomDelayedExecution();
        });
    }

    // I realized in my testing that returning a value from this method wasn't working because the value was being returned before the database finished processing
    // rather than returning a value, I decided to implement a callback so I can handle the result when the database is finished 
    /** Attempt to add a user to the database and invoke the callback with the result and authorization token */
    public createUser(newUser: User, callback: (result: boolean) => void) {
        // if the database is not open, add the method call to delayedExecution so that it can be executed once the database is ready,
        // then return
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.createUser(newUser, callback));
            return;
        }

        // perform the database transaction
        const transaction = this._db?.transaction([USER_TABLE], "readwrite");
        const objectStore = transaction?.objectStore(USER_TABLE);
        const query = objectStore?.add(newUser);

        // if successful, invoke the callback function with the token
        query?.addEventListener("success", () => {
            callback(true);
        });

        // if unsuccessful, invoke the callback function with no tokens
        query?.addEventListener("error", () => {
            callback(false);
        })
    }
 
    /** Determine whether the username and password pair match the information in the database and return an authentication token if so */
    public validateLoginCredentials(username: string, password: string, callback: (result: boolean, auth: string) => void) {
        // if the database is not open, add the method call to delayedExecution so that it can be executed once the database is ready,
        // then return
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.validateLoginCredentials(username, password, callback));
            return;
        }

        const transaction = this._db?.transaction([USER_TABLE], "readwrite");
        const objectStore = transaction?.objectStore(USER_TABLE);
        const index = objectStore?.index("username");
        const query = index?.get(username);
        
        query?.addEventListener("success", () => {
            let user: User = query.result as User;
            if (user == undefined || user.password != password) {
                callback(false, "");
            }

            else {
                const token = this.createToken();
                user.activeToken = token;
                
                // I got the put code from this post on stack overflow to set the token value in the database after the login
                // https://stackoverflow.com/questions/11217309/how-do-i-update-data-in-indexeddb
                objectStore?.put(user);
                callback(true, token);
            }
        })
    }

    /** Determine whether the token assigned to this user in the database matches the username and token pair provided */
    public validateAuthenticationToken(username: string, token: string, callback: (result: boolean) => void) {
        // if the database is not open, add the method call to delayedExecution so that it can be executed once the database is ready,
        // then return
        
        console.log("call");
        if (!this._dbIsOpen) {
            console.log("delay");
            this._delayedExecution.push(() => this.validateAuthenticationToken(username, token, callback));
            return;
        }
        
        const transaction = this._db?.transaction([USER_TABLE], "readonly");
        const objectStore = transaction?.objectStore(USER_TABLE);
        const index = objectStore?.index("username");
        const query = index?.get(username);
        console.log(username + " " + token);

        query?.addEventListener("success", () => {
            let user: User = query.result as User;
            console.log(user.activeToken == token);
            callback(user.activeToken == token);
        })

        query?.addEventListener("error", () => {
            console.log("err0r");
            callback(false);
        });
    }

    private createToken(): string {
        // https://stackoverflow.com/questions/43837659/guid-uuid-in-typescript-node-js-app
        return crypto.randomUUID();
    }
}
