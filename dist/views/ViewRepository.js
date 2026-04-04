import { Repository } from "../repository.js";
import { View } from "./View.js";
const VIEW_TABLE = "view_table";
export class ViewRepository extends Repository {
    constructor() {
        super();
        this.openDatabase(VIEW_TABLE, 1);
    }
    createTable() {
        const table = this._db?.createObjectStore(VIEW_TABLE, { keyPath: "id", autoIncrement: true });
        table?.createIndex("user", "user", { unique: false });
        table?.createIndex("statusFilters", "statusFilters", { unique: false });
        table?.createIndex("priorityFilters", "priorityFilters", { unique: false });
        table?.createIndex("sortHeader", "sortHeader", { unique: false });
        table?.createIndex("sortOrder", "sortOrder", { unique: false });
        table?.createIndex("searchFilter", "searchFilter", { unique: false });
        table?.createIndex("searchValue", "searchValue", { unique: false });
        table?.createIndex("title", "title", { unique: false });
        table?.createIndex("displayType", "displayType", { unique: false });
    }
    createView(view, callback) {
        if (this.delayExecution(() => this.createView(view, callback)))
            return;
        const objectStore = this.getObjectStore(VIEW_TABLE, "readwrite");
        const query = objectStore?.add(view);
        query?.addEventListener("success", () => {
            view.id = query.result;
            callback(true, view);
        });
        query?.addEventListener("error", () => {
            callback(false, undefined);
        });
    }
    saveView(view, callback) {
        if (this.delayExecution(() => this.saveView(view, callback)))
            return;
        const objectStore = this.getObjectStore(VIEW_TABLE, "readwrite");
        const query = objectStore?.put(view);
        query?.addEventListener("success", () => {
            callback(true, "View was sucessfully updated");
        });
        query?.addEventListener("error", () => {
            callback(false, "Error: This view could not be updated");
        });
    }
    getAllViewsForUser(user, callback) {
        if (this.delayExecution(() => this.getAllViewsForUser(user, callback)))
            return;
        const objectStore = this.getObjectStore(VIEW_TABLE, "readonly");
        const cursorRequest = objectStore?.openCursor();
        const views = [];
        cursorRequest?.addEventListener("success", (e) => {
            const cursor = e.target.result;
            if (cursor) {
                const newView = this.createViewFromAny(cursor.value, user);
                if (newView != undefined)
                    views.push(newView);
                cursor.continue();
                return;
            }
            callback(true, "Success", views);
        });
    }
    deleteView(id, callback) {
        if (this.delayExecution(() => this.deleteView(id, callback)))
            return;
        const objectStore = this.getObjectStore(VIEW_TABLE, "readwrite");
        const query = objectStore?.delete(id);
        query?.addEventListener("success", () => {
            callback(true, "View successfully deleted");
        });
        query?.addEventListener("error", () => {
            callback(false, "This view could not be deleted");
        });
    }
    createViewFromAny(result, user) {
        const rawView = result;
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
            return view;
        }
    }
}
//# sourceMappingURL=ViewRepository.js.map