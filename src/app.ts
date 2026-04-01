import { LoginService } from "../dist/login/LoginService.js";

const logService = LoginService.Intance;

document.getElementById("logout-button")?.addEventListener("click", logOut);

function logOut() {
    logService.logout();
}