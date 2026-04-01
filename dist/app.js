var _a;
import { LoginService } from "../dist/login/LoginService.js";
const logService = LoginService.Intance;
(_a = document.getElementById("logout-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", logOut);
function logOut() {
    logService.logout();
}
//# sourceMappingURL=app.js.map