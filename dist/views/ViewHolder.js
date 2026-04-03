import { Observable } from "../interfaces/Observable.js";
export class ViewHolder {
    static get Instance() {
        if (ViewHolder._instance == null)
            ViewHolder._instance = new ViewHolder();
        return ViewHolder._instance;
    }
    get view() { return this._view; }
    setView(view) {
        this._view = view;
    }
}
//# sourceMappingURL=ViewHolder.js.map