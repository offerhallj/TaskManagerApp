import { UserRepository } from "../user/UserRepository.js";
import { User } from "../user/User.js";
const AUTHENTICATION = "auth";
const repo = UserRepository.Instance;
export class LoginService {
    static get Instance() {
        if (LoginService._instance == null)
            LoginService._instance = new LoginService();
        return LoginService._instance;
    }
    /** Attempt to create an account and login */
    createAccountAndLogin(user, callback) {
        repo.createUser(user, result => {
            // if we successfully create the account, attempt to log in
            if (result) {
                this.logIn(user.username, user.password, callback);
            }
            // otherwise, fail
            else
                callback(result);
        });
    }
    /** Attempt to log the user in with the current credentials and return the result through the callback */
    logIn(username, password, callback) {
        repo.validateLoginCredentials(username, password, (result, auth) => {
            if (result) {
                document.cookie = `${AUTHENTICATION}=user:${username},token:${auth};max-age=10000`;
                callback(true);
            }
            else {
                callback(false);
            }
        });
    }
    /** Clear the authentication token */
    logout() {
        console.log("logged out");
        document.cookie = `${AUTHENTICATION}=;max-age=-1`;
    }
    /** Determines whether a user is currently logged in by getting and validating the authentication cookie */
    isLoggedIn(callback) {
        let cookie = this.getAuthenticationCookie();
        if (cookie == undefined)
            callback(false);
        else
            this.validateAuthenticationCookie(cookie, callback);
    }
    /** Returns the value stored at AUTHENtICATION or undefined if the cookie is not found */
    getAuthenticationCookie() {
        const cookie = document.cookie;
        const cookies = cookie.split(";");
        for (let c of cookies) {
            let [key, value] = c.split("=");
            if (key == AUTHENTICATION)
                return value;
        }
        return undefined;
    }
    /** Compares the value of the authentication cookie against the value stored for the user in the database to determine if the login is valid */
    validateAuthenticationCookie(cookie, callback) {
        const vals = cookie.split(",");
        const username = vals[0]?.split(":")[1];
        const token = vals[1]?.split(":")[1];
        repo.validateAuthenticationToken(username, token, callback);
    }
    /** Get the username of the current user */
    getCurrentUser() {
        const token = this.getAuthenticationCookie();
        if (token == null || token == undefined)
            return undefined;
        const vals = token.split(",");
        return vals[0]?.split(":")[1];
    }
}
//# sourceMappingURL=LoginService.js.map