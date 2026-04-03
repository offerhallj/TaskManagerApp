import { Observable } from "../interfaces/Observable.js";
import type { View } from "./View.js";

export class ViewHolder {
    private static _instance: ViewHolder;

    static get Instance(): ViewHolder {
        if (ViewHolder._instance == null) ViewHolder._instance = new ViewHolder();
        return ViewHolder._instance;
    }

    private _view!: View;
    get view(): View { return this._view;}
    public setView(view: View) {
        this._view = view;
    }
}