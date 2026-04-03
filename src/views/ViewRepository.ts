import { Repository } from "../repository.js";
import { View } from "./View.js";

const VIEW_TABLE = "view_table";

export class ViewRepository extends Repository<ViewRepository> {
    constructor() {
        super();
        this.openDatabase(VIEW_TABLE, 1);
    }

    createTable(): void {
        const table = this._db?.createObjectStore(VIEW_TABLE, { keyPath: "id", autoIncrement:true});
        table?.createIndex("user", "user", { unique: false});
        table?.createIndex("statusFilters", "statusFilters", { unique: false});
        table?.createIndex("priorityFilters", "priorityFilters", { unique: false});
        table?.createIndex("sortHeader", "sortHeader", { unique: false});
        table?.createIndex("sortOrder", "sortOrder", { unique: false});
        table?.createIndex("searchFilter", "searchFilter", { unique: false});
        table?.createIndex("searchValue", "searchValue", { unique: false});
    }

    public createView(view: View, callback: (result: boolean, view: View | undefined) => void): void {
        if (this.delayExecution(() => this.createView(view, callback))) return;
        const objectStore = this.getObjectStore(VIEW_TABLE, "readwrite");
        const query = objectStore?.put(view);

        query?.addEventListener("success", () => {
            view.id = query.result as number;
            callback(true, view);
        })
        
        query?.addEventListener("error", () => {
            callback(false, undefined);
        })
    }
}