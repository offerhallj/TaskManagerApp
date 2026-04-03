import { TaskHeader } from "./TaskHeader.js";
import { TaskTable } from "./TaskTable.js";
export class BasicTaskTable extends TaskTable {
    create() {
        return this.getTableWithHeaders(TaskHeader.Title, TaskHeader.DueDate, TaskHeader.Priority, TaskHeader.Status, TaskHeader.Tags, TaskHeader.Actions);
    }
}
//# sourceMappingURL=BasicTaskTable.js.map