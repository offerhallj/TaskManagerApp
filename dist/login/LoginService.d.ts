import { User } from "../user/User.js";
export declare class LoginService {
    private static _instance;
    static get Instance(): LoginService;
    /** Attempt to create an account and login */
    createAccountAndLogin(user: User, callback: (result: boolean) => void): void;
    /** Attempt to log the user in with the current credentials and return the result through the callback */
    logIn(username: string, password: string, callback: (result: boolean) => void): void;
    /** Clear the authentication token */
    logout(): void;
    /** Determines whether a user is currently logged in by getting and validating the authentication cookie */
    isLoggedIn(callback: (result: boolean) => void): void;
    /** Returns the value stored at AUTHENtICATION or undefined if the cookie is not found */
    private getAuthenticationCookie;
    /** Compares the value of the authentication cookie against the value stored for the user in the database to determine if the login is valid */
    private validateAuthenticationCookie;
    /** Get the username of the current user */
    getCurrentUser(): string | undefined;
}
//# sourceMappingURL=LoginService.d.ts.map