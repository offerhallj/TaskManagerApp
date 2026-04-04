import { Observable } from "../interfaces/Observable.js";
import { View } from "./View.js";
export declare class ViewHolder extends Observable<View> {
    private static _instance;
    static get Instance(): ViewHolder;
    private _view;
    /** Access the view with intent to read and write; notify that changes have been made */
    get rwView(): View;
    /** Access the view with intent only to read */
    get rView(): View;
    setView(view: View): void;
    onViewIsChanged: ((val: boolean) => void) | undefined;
}
//# sourceMappingURL=ViewHolder.d.ts.map