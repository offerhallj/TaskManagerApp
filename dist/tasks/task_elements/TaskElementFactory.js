import { BasicTaskElement } from "../../../dist/tasks/task_elements/BasicTaskElement.js";
import { Task } from "../../../dist/tasks/Task.js";
export class TaskElementFactory {
    constructor(type) {
        this._type = type;
    }
}
export var TaskElementType;
(function (TaskElementType) {
    TaskElementType[TaskElementType["Basic"] = 0] = "Basic";
    TaskElementType[TaskElementType["Urgent"] = 1] = "Urgent";
})(TaskElementType || (TaskElementType = {}));
export class TaskElement {
    constructor(task) {
        this._task = task;
    }
}
//# sourceMappingURL=TaskElementFactory.js.map