const AUTHENTICATION_COOKIE: string = "auth"

export class LoginService {
    private static _instance: LoginService;

    static get Intance(): LoginService {
        if (LoginService._instance == null) LoginService._instance = new LoginService();
        return LoginService._instance;
    }

    /** Determines whether a user is currently logged in by getting and validating the authentication cookie */
    isLoggedIn(): boolean {
        let cookie = this.getAuthenticationCookie();
        if (cookie == undefined) return false;
        return this.validateAuthenticationCookie(cookie);
    }

    /** Returns the value stored at AUTHENtICATION_COOKIE or undefined if the cookie is not found */
    private getAuthenticationCookie(): string | undefined{
        const cookie = document.cookie;
        const cookies = cookie.split(";");
        for (let c of cookies) {
            let [key, value] = c.split("=");
            if (key == AUTHENTICATION_COOKIE) return value;
        }
        
        return undefined;
    }

    /** Compares the value of the authentication cookie against the value stored for the user in the database to determine if the login is valid */
    private validateAuthenticationCookie(cooke: string): boolean {
        return true;
    }
}