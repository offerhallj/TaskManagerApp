import { LoginService } from "../login/LoginService.js";
import { ViewRepository } from "./ViewRepository.js";
import { View } from "./View.js";
import { ViewHolder } from "./ViewHolder.js";
const logService = LoginService.Instance;
export class ViewService {
    constructor() {
        this._repo = new ViewRepository();
    }
    static get Instance() {
        if (ViewService._instance == null)
            ViewService._instance = new ViewService();
        return ViewService._instance;
    }
    createView(view, title, callback) {
        const user = this.getUser();
        if (user == undefined) {
            callback(false, undefined);
            return;
        }
        // remove the view's ID to ensure it saves as a new view and doesn't override the existing view
        view = View.newFromExistingView(view);
        view.title = title;
        view.user = user;
        view.isChanged = false;
        this._repo.createView(view, callback);
    }
    saveView(view, title, callback) {
        console.log("here");
        const user = this.getUser();
        if (user == undefined) {
            console.log("Error: no user was found");
            return;
        }
        view.title = title;
        this._repo.saveView(view, (r, msg) => {
            if (r) {
                view.isChanged = false;
            }
            console.log(msg);
            callback(r);
        });
    }
    getAllViewsForUser(callback) {
        const user = this.getUser();
        if (user == undefined) {
            callback(false, "No user found", []);
            return;
        }
        this._repo.getAllViewsForUser(user, callback);
    }
    deleteView(view, viewList, callback) {
        if (viewList.length == 1) {
            callback(false, "You cannot delete your last view!");
            return;
        }
        if (view.id == undefined) {
            callback(false, "Error: This view has an invalid ID and cannot be deleted");
            return;
        }
        this._repo.deleteView(view.id, (r, msg) => {
            let index = viewList.indexOf(view);
            viewList.splice(index, 1);
            callback(r, msg);
        });
    }
    /** Try to get the username for the current user; print an error if undefined and return the result */
    getUser() {
        const username = logService.getCurrentUser();
        if (username == undefined) {
            console.log("Error! You must be logged in to create a task.");
        }
        return username;
    }
}
//# sourceMappingURL=ViewService.js.map