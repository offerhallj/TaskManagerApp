import { Repository } from "../repository.js";
import { View } from "./View.js";
/** Implements methods for connecting to the Views Table in the database */
export declare class ViewRepository extends Repository<ViewRepository> {
    constructor();
    /** Create the Views table */
    createTable(): void;
    /** Add a new view to the Views Table */
    createView(view: View, callback: (result: boolean, view: View | undefined) => void): void;
    /** Update an existing view in the Views table */
    saveView(view: View, callback: (r: boolean, msg: string) => void): void;
    /** Return all views for the given user */
    getAllViewsForUser(user: string, callback: (result: boolean, msg: string, views: View[]) => void): void;
    /** Remove a view from the Views Table */
    deleteView(id: number, callback: (result: boolean, msg: string) => void): void;
    /** Create a new View from the result of a database query */
    private createViewFromAny;
}
//# sourceMappingURL=ViewRepository.d.ts.map