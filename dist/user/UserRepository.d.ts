import { User } from "../../dist/user/User.js";
export declare class UserRepository {
    private static _intance;
    private _db;
    private _dbIsOpen;
    /** If a database function is called before the database is open, add the function to this list and invoke it once the database is opened */
    private readonly _delayedExecution;
    static get Instance(): UserRepository;
    constructor();
    /** Open the USER_TABLE with indexedDB */
    private openDatabase;
    /** Execute any functions which were delayed due to the database not being open at the time the function was called */
    private perfomDelayedExecution;
    /** Attempt to add a user to the database and invoke the callback with the result and authorization token */
    createUser(newUser: User, callback: (result: boolean) => void): void;
    /** Determine whether the username and password pair match the information in the database and return an authentication token if so */
    validateLoginCredentials(username: string, password: string, callback: (result: boolean, auth: string) => void): void;
    /** Determine whether the token assigned to this user in the database matches the username and token pair provided */
    validateAuthenticationToken(username: string, token: string, callback: (result: boolean) => void): void;
    private createToken;
}
//# sourceMappingURL=UserRepository.d.ts.map