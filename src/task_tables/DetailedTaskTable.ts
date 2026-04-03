import { TaskHeader } from "./TaskHeader.js";
import { TaskTable } from "./TaskTable.js";

export class DetailedTaskTable extends TaskTable {
    readonly displayHeaders: TaskHeader[] = [
        TaskHeader.Title, 
        TaskHeader.Description, 
        TaskHeader.DueDate, 
        TaskHeader.Priority, 
        TaskHeader.Status, 
        TaskHeader.Tags, 
        TaskHeader.CreatedDate, 
        TaskHeader.User, 
        TaskHeader.Actions
    ];
    
    constructor() {
        super();
        this.Element = this.create();
    }

    create(): HTMLElement {
        return this.getTableWithHeaders(...this.displayHeaders);
    }
}