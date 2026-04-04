import { Observable } from "../interfaces/Observable.js";
import type { View } from "./View.js";
export declare class ViewHolder extends Observable<View> {
    private static _instance;
    static get Instance(): ViewHolder;
    private _view;
    get view(): View;
    setView(view: View): void;
}
//# sourceMappingURL=ViewHolder.d.ts.map