import { View } from "./View.js";
export declare class ViewService {
    private static _instance;
    private _repo;
    static get Instance(): ViewService;
    createView(view: View, callback: (result: boolean, view: View | undefined) => void): void;
    saveView(): void;
    getView(): void;
    getAllViews(): void;
    deleteView(): void;
    /** Try to get the username for the current user; print an error if undefined and return the result */
    private getUser;
}
//# sourceMappingURL=ViewService.d.ts.map