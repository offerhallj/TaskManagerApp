import { Repository } from "../repository.js";
import { View } from "./View.js";

const VIEW_TABLE = "view_table";

/** Implements methods for connecting to the Views Table in the database */
export class ViewRepository extends Repository<ViewRepository> {
    constructor() {
        super();
        this.openDatabase(VIEW_TABLE, 1);
    }

    /** Create the Views table */
    createTable(): void {
        const table = this._db?.createObjectStore(VIEW_TABLE, { keyPath: "id", autoIncrement:true});
        table?.createIndex("user", "user", { unique: false});
        table?.createIndex("statusFilters", "statusFilters", { unique: false});
        table?.createIndex("priorityFilters", "priorityFilters", { unique: false});
        table?.createIndex("sortHeader", "sortHeader", { unique: false});
        table?.createIndex("sortOrder", "sortOrder", { unique: false});
        table?.createIndex("searchFilter", "searchFilter", { unique: false});
        table?.createIndex("searchValue", "searchValue", { unique: false});
        table?.createIndex("title", "title", { unique: false});
        table?.createIndex("displayType", "displayType", { unique: false});
    }

    /** Add a new view to the Views Table */
    public createView(view: View, callback: (result: boolean, view: View | undefined) => void): void {
        if (this.delayExecution(() => this.createView(view, callback))) return;
        const objectStore = this.getObjectStore(VIEW_TABLE, "readwrite");
        const query = objectStore?.add(view);

        query?.addEventListener("success", () => {
            view.id = query.result as number;
            callback(true, view);
        })
        
        query?.addEventListener("error", () => {
            callback(false, undefined);
        })
    }

    /** Update an existing view in the Views table */
    public saveView(view: View, callback: (r: boolean, msg: string) => void): void {
        if (this.delayExecution(() => this.saveView(view, callback))) return;

        const objectStore = this.getObjectStore(VIEW_TABLE, "readwrite");
        const query = objectStore?.put(view);
        
        query?.addEventListener("success", () => {
            callback(true, "View was sucessfully updated");
        })
        
        query?.addEventListener("error", () => {
            callback(false, "Error: This view could not be updated");
        })
    }

    /** Return all views for the given user */
    public getAllViewsForUser(user: string, callback: (result: boolean, msg: string, views: View[]) => void) {
        if (this.delayExecution(() => this.getAllViewsForUser(user, callback))) return;

        const objectStore = this.getObjectStore(VIEW_TABLE, "readonly");
        const cursorRequest = objectStore?.openCursor();
        const views: View[] = [];

        cursorRequest?.addEventListener("success", (e) => {
            const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {

                const newView = this.createViewFromAny(cursor.value, user);
                if (newView != undefined) views.push(newView);

                cursor.continue();
                return;
            }

            callback(true, "Success", views);
        });
    }
    
    /** Remove a view from the Views Table */
    public deleteView(id: number, callback: (result: boolean, msg: string) => void) {
        if (this.delayExecution(() => this.deleteView(id, callback))) return;

        const objectStore = this.getObjectStore(VIEW_TABLE, "readwrite");
        const query = objectStore?.delete(id);

        query?.addEventListener("success", () => {
            callback(true, "View successfully deleted");
        })

        query?.addEventListener("error", () => {
            callback(false, "This view could not be deleted");
        })
    }

    /** Create a new View from the result of a database query */
    private createViewFromAny(result: any, user: string): View | undefined {
        const rawView = result as View;

        if (rawView != undefined && rawView.user == user) {
            const view = new View();
            view.id = rawView.id;
            view.user = rawView.user;
            view.title = rawView.title;
            view.statusFilters = rawView.statusFilters;
            view.priorityFilters = rawView.priorityFilters;
            view.sortHeader = rawView.sortHeader;
            view.sortOrder = rawView.sortOrder;
            view.searchFilter = rawView.searchFilter;
            view.searchValue = rawView.searchValue;
            view.displayType = rawView.displayType;
            return view;
        }
    }
}