import { LoginService } from "../../dist/login/LoginService.js";
/** Validate that the user is logged in and redirect to login.html if not */
export function validateLogin() {
    LoginService.Intance.isLoggedIn(isLoggedInReponse);
}
function isLoggedInReponse(result) {
    // if the user is authenticated, do nothing
    if (result == true)
        return;
    // otherwise, redirect to the login page
    // redirect code was sourced from here
    // https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage
    window.location.replace("/static/login.html");
}
validateLogin();
//# sourceMappingURL=validateLogin.js.map