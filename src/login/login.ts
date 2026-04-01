import { LoginService } from "../../dist/login/LoginService.js";

/** Validate that the user is logged in and redirect to login.html if not */
export function validateLogin(): void {
    // determine whether we're already on the login page
    let url = window.location.href.split("/");
    let page = url[url.length - 1];
    if (page == "login.html") return;

    if (!LoginService.Intance.isLoggedIn()) {
        // redirect code was sourced from here
        // https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage
        window.location.replace("/static/login.html");
    }
}
