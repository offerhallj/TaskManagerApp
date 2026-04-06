import { Observable } from "../interfaces/Observable.js";
import { View } from "./View.js";

/** A Singleton class which holds a copy of the current View */
export class ViewHolder extends Observable<View> {
    private static _instance: ViewHolder;
    static get Instance(): ViewHolder {
        if (ViewHolder._instance == null) ViewHolder._instance = new ViewHolder();
        return ViewHolder._instance;
    }
    
    private _view!: View;

    /** Access the view with intent to read and write; notify that changes have been made */
    get rwView(): View { 
        if (!this._view.isChanged) {
            console.log("he");
            this._view.isChanged = true;
            if (this.onViewIsChanged == undefined) return this._view;
            this.onViewIsChanged(this.rView.isChanged);
        }
        return this._view;
    }

    /** Access the view with intent only to read */
    get rView(): View { return this._view; }

    public setView(view: View) {
        this._view = view;
        this.notify(view);
        this._view.isChanged = false;
    }

    // This method is used to update the asterisk next to the view title in the UI, as well as to set the Save View button active
    /** Define a function to be called when the view is changed */
    onViewIsChanged: ((val: boolean) => void) | undefined;
}