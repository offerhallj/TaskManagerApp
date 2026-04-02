import { BasicTaskElement } from "./BasicTaskElement.js";
import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";
export class TaskElementFactory {
    constructor(type, onEdit, onDelete) {
        this._onEdit = onEdit;
        this._onDelete = onDelete;
        this._type = type;
    }
    create(task) {
        let newElement = new BasicTaskElement(task);
        switch (this._type) {
            case TaskElementType.Basic:
                newElement = new BasicTaskElement(task);
                break;
        }
        newElement.onEdit = this._onEdit;
        newElement.onDelete = this._onDelete;
        return newElement;
    }
}
export var TaskElementType;
(function (TaskElementType) {
    TaskElementType[TaskElementType["Basic"] = 0] = "Basic";
    TaskElementType[TaskElementType["Urgent"] = 1] = "Urgent";
})(TaskElementType || (TaskElementType = {}));
//# sourceMappingURL=TaskElementFactory.js.map