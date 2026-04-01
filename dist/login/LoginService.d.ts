export declare class LoginService {
    private static _instance;
    static get Intance(): LoginService;
    /** Determines whether a user is currently logged in by getting and validating the authentication cookie */
    isLoggedIn(): boolean;
    /** Returns the value stored at AUTHENtICATION_COOKIE or undefined if the cookie is not found */
    private getAuthenticationCookie;
    /** Compares the value of the authentication cookie against the value stored for the user in the database to determine if the login is valid */
    private validateAuthenticationCookie;
}
//# sourceMappingURL=LoginService.d.ts.map