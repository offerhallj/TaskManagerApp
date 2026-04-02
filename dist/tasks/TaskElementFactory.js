import { Task } from "../../dist/tasks/Task.js";
export class TaskElementFactory {
    constructor(type) {
        this._type = type;
    }
    create(task) {
        switch (this._type) {
            case TaskElementType.Basic: return new BasicTaskElement(task);
        }
        return new BasicTaskElement(task);
    }
}
export var TaskElementType;
(function (TaskElementType) {
    TaskElementType[TaskElementType["Basic"] = 0] = "Basic";
    TaskElementType[TaskElementType["Urgent"] = 1] = "Urgent";
})(TaskElementType || (TaskElementType = {}));
//# sourceMappingURL=TaskElementFactory.js.map