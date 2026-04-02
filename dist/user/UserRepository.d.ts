import { Repository } from "../repository.js";
import { User } from "./User.js";
export declare class UserRepository extends Repository<UserRepository> {
    private static _instance;
    static get Instance(): UserRepository;
    constructor();
    createTable(callback: () => void): void;
    /** Attempt to add a user to the database and invoke the callback with the result and authorization token */
    createUser(newUser: User, callback: (result: boolean) => void): void;
    /** Determine whether the username and password pair match the information in the database and return an authentication token if so */
    validateLoginCredentials(username: string, password: string, callback: (result: boolean, auth: string) => void): void;
    /** Determine whether the token assigned to this user in the database matches the username and token pair provided */
    validateAuthenticationToken(username: string, token: string, callback: (result: boolean) => void): void;
    private createToken;
}
//# sourceMappingURL=UserRepository.d.ts.map