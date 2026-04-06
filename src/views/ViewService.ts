import { LoginService } from "../login/LoginService.js";
import { ViewRepository } from "./ViewRepository.js";
import { View } from "./View.js";

const logService = LoginService.Instance;

/** An intermediatery class conencting views.ts to the ViewRepository */
export class ViewService {
    private static _instance: ViewService;
    private _repo: ViewRepository = new ViewRepository();

    static get Instance(): ViewService { 
        if (ViewService._instance == null) ViewService._instance = new ViewService();
        return ViewService._instance;
    }

    createView(view: View, title: string, callback: (result: boolean, view: View | undefined) => void) {
        const user = this.getUser();
        if (user == undefined) { callback(false, undefined); return; }
        // remove the view's ID to ensure it saves as a new view and doesn't override the existing view
        view = View.newFromExistingView(view);
        view.title = title;
        view.user = user;
        view.isChanged = false;
        this._repo.createView(view, callback);
    }

    saveView(view: View, title: string, callback: (result: boolean) => void) {
        console.log("here")
        const user = this.getUser();
        if (user == undefined) { console.log("Error: no user was found") ; return; }
        view.title = title;
        this._repo.saveView(view, (r, msg) => {
            if (r) { view.isChanged = false; }
            console.log(msg);
            callback(r);
        });
    }

    getAllViewsForUser(callback: (result: boolean, msg: string, views: View[]) => void) {
        const user = this.getUser();
        if (user == undefined) {callback(false, "No user found", []); return; }
        this._repo.getAllViewsForUser(user, callback);
    }

    deleteView(view: View, viewList: View[], callback: (result: boolean, msg: string) => void) {
        if (viewList.length == 1) {callback(false, "You cannot delete your last view!"); return; }
        if (view.id == undefined) {callback(false, "Error: This view has an invalid ID and cannot be deleted"); return; }
        this._repo.deleteView(view.id, (r, msg) => {
            let index = viewList.indexOf(view);
            viewList.splice(index, 1);
            callback(r, msg);
        });
    }

    /** Try to get the username for the current user; print an error if undefined and return the result */
    private getUser(): string | undefined {
        const username = logService.getCurrentUser();
        if (username == undefined) {
            console.log("Error! You must be logged in to create a task.")
        }

        return username;
    }
}