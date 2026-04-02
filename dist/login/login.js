import { LoginService } from "./LoginService.js";
import { User } from "../user/User.js";
const loginService = LoginService.Instance;
const createUsernameInput = document.querySelector("#create-account-form #username");
const createPasswordInput = document.querySelector("#create-account-form #password");
const createEmailInput = document.querySelector("#create-account-form #email");
const loginUsernameInput = document.querySelector("#login-form #username");
const loginPasswordInput = document.querySelector("#login-form #password");
document.getElementById("create-account-form")?.addEventListener("submit", createUser);
document.getElementById("login-form")?.addEventListener("submit", login);
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
    console.log(loginService);
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