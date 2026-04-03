import { TaskHeader } from "./TaskHeader.js";
import { TaskTable } from "./TaskTable.js";
export class DetailedTaskTable extends TaskTable {
    create() {
        return this.getTableWithHeaders(TaskHeader.Title, TaskHeader.DueDate, TaskHeader.Priority, TaskHeader.Status, TaskHeader.Tags, TaskHeader.CreatedDate, TaskHeader.User, TaskHeader.Actions);
    }
}
//# sourceMappingURL=DetailedTaskTable.js.map