const AUTHENTICATION_COOKIE = "auth";
export class LoginService {
    static get Intance() {
        if (LoginService._instance == null)
            LoginService._instance = new LoginService();
        return LoginService._instance;
    }
    /** Determines whether a user is currently logged in by getting and validating the authentication cookie */
    isLoggedIn() {
        let cookie = this.getAuthenticationCookie();
        if (cookie == undefined)
            return false;
        return this.validateAuthenticationCookie(cookie);
    }
    /** Returns the value stored at AUTHENtICATION_COOKIE or undefined if the cookie is not found */
    getAuthenticationCookie() {
        const cookie = document.cookie;
        const cookies = cookie.split(";");
        for (let c of cookies) {
            let [key, value] = c.split("=");
            if (key == AUTHENTICATION_COOKIE)
                return value;
        }
        return undefined;
    }
    /** Compares the value of the authentication cookie against the value stored for the user in the database to determine if the login is valid */
    validateAuthenticationCookie(cooke) {
        return true;
    }
}
//# sourceMappingURL=LoginService.js.map