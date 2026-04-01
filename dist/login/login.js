var _a, _b;
import { LoginService } from "../../dist/login/LoginService.js";
import { User } from "../../dist/user/User.js";
const loginService = LoginService.Intance;
const createUsernameInput = document.querySelector("#create-account-form #username");
const createPasswordInput = document.querySelector("#create-account-form #password");
const createEmailInput = document.querySelector("#create-account-form #email");
const loginUsernameInput = document.querySelector("#login-form #username");
const loginPasswordInput = document.querySelector("#login-form #password");
(_a = document.getElementById("create-account-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", createUser);
(_b = document.getElementById("login-form")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", login);
/** Create a new user and try to add it to the database */
function createUser(e) {
    e.preventDefault();
    let newUser = new User(createUsernameInput.value, createPasswordInput.value, createEmailInput.value);
    loginService.createAccountAndLogin(newUser, createAccountAndLoginResponse);
}
/** Handle the result of the createUser operation */
function createAccountAndLoginResponse(result) {
    if (!result)
        console.log("failed to create the account");
    else
        loginResponse(result);
}
function login(e) {
    e.preventDefault();
    loginService.logIn(loginUsernameInput.value, loginPasswordInput.value, loginResponse);
}
/** Handle the result of the createUser operation */
function loginResponse(result) {
    if (!result)
        console.log("failed to login");
    else
        window.location.replace("/static/index.html");
}
//# sourceMappingURL=login.js.map