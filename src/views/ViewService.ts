import { LoginService } from "../login/LoginService.js";
import { ViewRepository } from "./ViewRepository.js";
import { View } from "./View.js";

const logService = LoginService.Instance;

export class ViewService {
    private static _instance: ViewService;
    private _repo: ViewRepository = new ViewRepository();

    static get Instance(): ViewService { 
        if (ViewService._instance == null) ViewService._instance = new ViewService();
        return ViewService._instance;
    }

    createView(view: View, callback: (result: boolean, view: View | undefined) => void) {
        const user = this.getUser();
        if (user == undefined) { callback(false, undefined); return; }
        view.user = user;
        this._repo.createView(view, callback);
    }

    saveView() {

    }

    getView() {

    }

    getAllViews() {

    }

    deleteView() {

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