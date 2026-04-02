import { LoginService } from "./login/LoginService.js";
const logService = LoginService.Instance;
// I'll remove these two functions later
function createNav() {
    const nav = document.querySelector("nav > ul");
    nav.innerHTML = "";
    nav.appendChild(getNavLinkFor("/static/index.html", "Home"));
    nav.appendChild(getNavLinkFor("/static/task-functions.html", "Tasks"));
    const logout = getNavLinkFor("/static/login.html", "Logout");
    logout.addEventListener("click", logOut);
    nav.appendChild(logout);
}
function getNavLinkFor(path, label) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("href", path);
    a.textContent = label;
    li.appendChild(a);
    return li;
}
function logOut() {
    logService.logout();
}
document.addEventListener("DOMContentLoaded", () => {
    createNav();
});
//# sourceMappingURL=app.js.map