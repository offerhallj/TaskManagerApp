import { LoginService } from "./login/LoginService.js";

const logService = LoginService.Instance;

function logOut() {
    logService.logout();
}
