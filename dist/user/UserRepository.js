import { User } from "../../dist/user/User.js";
const USER_TABLE = "user_table";
export class UserRepository {
    static get Instance() {
        if (UserRepository._intance == null)
            UserRepository._intance = new UserRepository();
        return UserRepository._intance;
    }
    constructor() {
        this._dbIsOpen = false;
        /** If a database function is called before the database is open, add the function to this list and invoke it once the database is opened */
        this._delayedExecution = [];
        this.openDatabase();
    }
    // I used this article to help get started with IndexedDB
    // https://blog.logrocket.com/using-indexeddb-complete-guide/
    /** Open the USER_TABLE with indexedDB */
    openDatabase() {
        const request = window.indexedDB.open(USER_TABLE, 1);
        request.addEventListener("error", () => {
            console.log("Error opening database");
        });
        request.addEventListener("success", () => {
            console.log("Successfully opened database");
            this._db = request.result;
            this._dbIsOpen = true;
            this.perfomDelayedExecution();
        });
        // I was having an issue getting result from the EventTarget; 
        // after doing a bit of post I found this article that said to typecast it
        // https://stackoverflow.com/questions/75953640/how-to-get-event-target-result-in-javascript-indexdb-typescript-working
        request.addEventListener("upgradeneeded", init => {
            var _a;
            this._db = init.target.result;
            this._db.onerror = () => {
                console.error('Error loading database.');
            };
            const table = (_a = this._db) === null || _a === void 0 ? void 0 : _a.createObjectStore(USER_TABLE, { keyPath: "id", autoIncrement: true });
            table === null || table === void 0 ? void 0 : table.createIndex("username", "username", { unique: true });
            table === null || table === void 0 ? void 0 : table.createIndex("password", "password", { unique: false });
            table === null || table === void 0 ? void 0 : table.createIndex("email", "email", { unique: true });
            table === null || table === void 0 ? void 0 : table.createIndex("activeToken", "activeToken", { unique: false });
            this._dbIsOpen = true;
            this.perfomDelayedExecution();
        });
    }
    /** Execute any functions which were delayed due to the database not being open at the time the function was called */
    perfomDelayedExecution() {
        for (let fun of this._delayedExecution) {
            fun();
        }
        this._delayedExecution.splice(0, this._delayedExecution.length - 1);
    }
    // I realized in my testing that returning a value from this method wasn't working because the value was being returned before the database finished processing
    // rather than returning a value, I decided to implement a callback so I can handle the result when the database is finished 
    /** Attempt to add a user to the database and invoke the callback with the result and authorization token */
    createUser(newUser, callback) {
        var _a;
        // if the database is not open, add the method call to delayedExecution so that it can be executed once the database is ready,
        // then return
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.createUser(newUser, callback));
            return;
        }
        // perform the database transaction
        const transaction = (_a = this._db) === null || _a === void 0 ? void 0 : _a.transaction([USER_TABLE], "readwrite");
        const objectStore = transaction === null || transaction === void 0 ? void 0 : transaction.objectStore(USER_TABLE);
        const query = objectStore === null || objectStore === void 0 ? void 0 : objectStore.add(newUser);
        // if successful, invoke the callback function with the token
        query === null || query === void 0 ? void 0 : query.addEventListener("success", () => {
            callback(true);
        });
        // if unsuccessful, invoke the callback function with no tokens
        query === null || query === void 0 ? void 0 : query.addEventListener("error", () => {
            callback(false);
        });
    }
    /** Determine whether the username and password pair match the information in the database and return an authentication token if so */
    validateLoginCredentials(username, password, callback) {
        var _a;
        // if the database is not open, add the method call to delayedExecution so that it can be executed once the database is ready,
        // then return
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.validateLoginCredentials(username, password, callback));
            return;
        }
        const transaction = (_a = this._db) === null || _a === void 0 ? void 0 : _a.transaction([USER_TABLE], "readwrite");
        const objectStore = transaction === null || transaction === void 0 ? void 0 : transaction.objectStore(USER_TABLE);
        const index = objectStore === null || objectStore === void 0 ? void 0 : objectStore.index("username");
        const query = index === null || index === void 0 ? void 0 : index.get(username);
        query === null || query === void 0 ? void 0 : query.addEventListener("success", () => {
            let user = query.result;
            if (user.password == password) {
                const token = this.createToken();
                user.activeToken = token;
                // I got the put code from this post on stack overflow to set the token value in the database after the login
                // https://stackoverflow.com/questions/11217309/how-do-i-update-data-in-indexeddb
                objectStore === null || objectStore === void 0 ? void 0 : objectStore.put(user);
                callback(true, token);
            }
            else {
                callback(false, "");
            }
        });
    }
    /** Determine whether the token assigned to this user in the database matches the username and token pair provided */
    validateAuthenticationToken(username, token, callback) {
        // if the database is not open, add the method call to delayedExecution so that it can be executed once the database is ready,
        // then return
        var _a;
        console.log("call");
        if (!this._dbIsOpen) {
            console.log("delay");
            this._delayedExecution.push(() => this.validateAuthenticationToken(username, token, callback));
            return;
        }
        const transaction = (_a = this._db) === null || _a === void 0 ? void 0 : _a.transaction([USER_TABLE], "readonly");
        const objectStore = transaction === null || transaction === void 0 ? void 0 : transaction.objectStore(USER_TABLE);
        const index = objectStore === null || objectStore === void 0 ? void 0 : objectStore.index("username");
        const query = index === null || index === void 0 ? void 0 : index.get(username);
        console.log(username + " " + token);
        query === null || query === void 0 ? void 0 : query.addEventListener("success", () => {
            let user = query.result;
            console.log(user.activeToken == token);
            callback(user.activeToken == token);
        });
        query === null || query === void 0 ? void 0 : query.addEventListener("error", () => {
            console.log("err0r");
        });
    }
    createToken() {
        // https://stackoverflow.com/questions/43837659/guid-uuid-in-typescript-node-js-app
        return crypto.randomUUID();
    }
}
//# sourceMappingURL=UserRepository.js.map