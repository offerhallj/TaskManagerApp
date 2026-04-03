import { TaskHeader } from "./TaskHeader.js";
import { TaskTable } from "./TaskTable.js";
export class DetailedTaskTable extends TaskTable {
    constructor() {
        super();
        this.displayHeaders = [
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
        this.Element = this.create();
    }
    create() {
        return this.getTableWithHeaders(...this.displayHeaders);
    }
}
//# sourceMappingURL=DetailedTaskTable.js.map