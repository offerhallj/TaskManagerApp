// I used this article to help get started with IndexedDB
// https://blog.logrocket.com/using-indexeddb-complete-guide/

const USER_DATABASE = "user_database";

export class UserRepository {
    private static _intance: UserRepository;
    private _db: IDBDatabase | undefined;

    static get Instance(): UserRepository {
        if (UserRepository._intance == null) UserRepository._intance = new UserRepository();
        return UserRepository._intance;
    }

    constructor() {
        this.openDatabase();
    }
    
    private openDatabase() {
        const request = window.indexedDB.open(USER_DATABASE, 1);
    
        request.addEventListener("error", () => {
            console.log("Error opening database");
            }
        );
    
        request.addEventListener("success", () => {
            console.log("Successfully opened database");    
            this._db = request.result;
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
            }
        );
    
        const table = this._db?.createObjectStore(USER_DATABASE, { keyPath: "id", autoIncrement:true});
        table?.createIndex("username", "username", { unique: true});
        table?.createIndex("password", "password", { unique: false});
        table?.createIndex("email", "email", { unique: true});
        table?.createIndex("activeToken", "activeToken", { unique: false});
    }
}