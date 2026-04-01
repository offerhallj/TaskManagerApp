// I used this article to help get started with IndexedDB
// https://blog.logrocket.com/using-indexeddb-complete-guide/
const USER_DATABASE = "user_database";
export class UserRepository {
    static get Instance() {
        if (UserRepository._intance == null)
            UserRepository._intance = new UserRepository();
        return UserRepository._intance;
    }
    constructor() {
        this.openDatabase();
    }
    openDatabase() {
        var _a;
        const request = window.indexedDB.open(USER_DATABASE, 1);
        request.addEventListener("error", () => {
            console.log("Error opening database");
        });
        request.addEventListener("success", () => {
            console.log("Successfully opened database");
            this._db = request.result;
        });
        // I was having an issue getting result from the EventTarget; 
        // after doing a bit of post I found this article that said to typecast it
        // https://stackoverflow.com/questions/75953640/how-to-get-event-target-result-in-javascript-indexdb-typescript-working
        request.addEventListener("upgradeneeded", init => {
            this._db = init.target.result;
            this._db.onerror = () => {
                console.error('Error loading database.');
            };
        });
        const table = (_a = this._db) === null || _a === void 0 ? void 0 : _a.createObjectStore(USER_DATABASE, { keyPath: "id", autoIncrement: true });
        table === null || table === void 0 ? void 0 : table.createIndex("username", "username", { unique: true });
        table === null || table === void 0 ? void 0 : table.createIndex("password", "password", { unique: false });
        table === null || table === void 0 ? void 0 : table.createIndex("email", "email", { unique: true });
        table === null || table === void 0 ? void 0 : table.createIndex("activeToken", "activeToken", { unique: false });
    }
}
//# sourceMappingURL=UserRepository.js.map