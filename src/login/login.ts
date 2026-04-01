import { LoginService } from "../../dist/login/LoginService.js";
import { User } from "../../dist/user/User.js";

const loginService = LoginService.Intance;
const createUsernameInput = document.querySelector("#create-account-form #username") as HTMLInputElement;
const createPasswordInput = document.querySelector("#create-account-form #password") as HTMLInputElement;
const createEmailInput = document.querySelector("#create-account-form #email") as HTMLInputElement;

const loginUsernameInput = document.querySelector("#login-form #username") as HTMLInputElement;
const loginPasswordInput = document.querySelector("#login-form #password") as HTMLInputElement;

document.getElementById("create-account-form")?.addEventListener("submit", createUser);
document.getElementById("login-form")?.addEventListener("submit", login);

/** Create a new user and try to add it to the database */
function createUser(e: SubmitEvent) {
    e.preventDefault();
    
    let newUser = new User(createUsernameInput.value, createPasswordInput.value, createEmailInput.value);
    loginService.createAccountAndLogin(newUser, createAccountAndLoginResponse);
}

/** Handle the result of the createUser operation */
function createAccountAndLoginResponse(result: boolean) {
    if (!result) console.log("failed to create the account");
    else loginResponse(result);
}

function login(e: SubmitEvent) {
    e.preventDefault();
    loginService.logIn(loginUsernameInput.value, loginPasswordInput.value, loginResponse);
}

/** Handle the result of the createUser operation */
function loginResponse(result: boolean) {
    if (!result) console.log("failed to login");
    else window.location.replace("/static/index.html");
}