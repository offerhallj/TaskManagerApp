import { DetailedTaskTable } from "./DetailedTaskTable.js";
import { BasicTaskTable } from "./BasicTaskTable.js";
import { TaskTable } from "./TaskTable.js";
export class TaskTableFactory {
    constructor(displayType) {
        this._displayType = TaskDisplayType.Basic;
        this._displayType = displayType;
    }
    setDisplayType(displayType) {
        this._displayType = displayType;
    }
    create() {
        switch (this._displayType) {
            case TaskDisplayType.Detailed: return new DetailedTaskTable();
            default: return new BasicTaskTable();
        }
    }
}
export var TaskDisplayType;
(function (TaskDisplayType) {
    TaskDisplayType[TaskDisplayType["Basic"] = 0] = "Basic";
    TaskDisplayType[TaskDisplayType["Detailed"] = 1] = "Detailed";
    TaskDisplayType[TaskDisplayType["Compact"] = 2] = "Compact";
})(TaskDisplayType || (TaskDisplayType = {}));
//# sourceMappingURL=TaskTableFactory.js.map