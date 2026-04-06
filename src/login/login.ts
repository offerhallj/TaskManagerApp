import { LoginService } from "./LoginService.js";
import { User } from "../user/User.js";

const loginService = LoginService.Instance;
const createUsernameInput = document.querySelector("#create-account-form #username") as HTMLInputElement;
const createPasswordInput = document.querySelector("#create-account-form #password") as HTMLInputElement;
const createEmailInput = document.querySelector("#create-account-form #email") as HTMLInputElement;

const loginUsernameInput = document.querySelector("#login-form #username") as HTMLInputElement;
const loginPasswordInput = document.querySelector("#login-form #password") as HTMLInputElement;

const createAccount = document.getElementById("create-account-form");
createAccount?.addEventListener("submit", createUser);
const loginForm = document.getElementById("login-form");
loginForm?.addEventListener("submit", login);

document.getElementById("goto-create")?.addEventListener("click", () => {
    createAccount?.classList.remove("hidden");
    loginForm?.classList.add("hidden");
});

document.getElementById("goto-login")?.addEventListener("click", () => {
    createAccount?.classList.add("hidden");
    loginForm?.classList.remove("hidden");
});

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
    console.log(loginService);
    loginService.logIn(loginUsernameInput.value, loginPasswordInput.value, loginResponse);
}

/** Handle the result of the createUser operation */
function loginResponse(result: boolean) {
    if (!result) console.log("failed to login");
    else window.location.replace("/docs/index.html");
}