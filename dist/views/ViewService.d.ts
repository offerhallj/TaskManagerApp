import { View } from "./View.js";
/** An intermediatery class conencting views.ts to the ViewRepository */
export declare class ViewService {
    private static _instance;
    private _repo;
    static get Instance(): ViewService;
    createView(view: View, title: string, callback: (result: boolean, view: View | undefined) => void): void;
    saveView(view: View, title: string, callback: (result: boolean) => void): void;
    getAllViewsForUser(callback: (result: boolean, msg: string, views: View[]) => void): void;
    deleteView(view: View, viewList: View[], callback: (result: boolean, msg: string) => void): void;
    /** Try to get the username for the current user; print an error if undefined and return the result */
    private getUser;
}
//# sourceMappingURL=ViewService.d.ts.map