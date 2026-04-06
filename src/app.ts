// Ultimately, this script could have and should have served more of a purpose in the app, but I implemented most of the functionality in tasks.js.
// views.js, and login.js, so this script wound up being kind of useless. 
// Realistically I could have put this in login.js, but that script is for the login page and this is for the main page so I wanted to keep them seperate

import { LoginService } from "./login/LoginService.js";

const logService = LoginService.Instance;

function logOut() {
    logService.logout();
}
