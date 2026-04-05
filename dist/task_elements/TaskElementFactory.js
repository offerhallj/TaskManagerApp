import { DetailedTaskElement } from "./DetailedTaskElement.js";
import { CompactTaskElement } from "./CompactTaskElement.js";
import { OverdueTask } from "./decorators/OverdueTask.js";
import { BasicTaskElement } from "./BasicTaskElement.js";
import { DueToday } from "./decorators/DueToday.js";
import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";
export class TaskElementFactory {
    constructor(type, onEdit, onDelete, onChangeStatus) {
        this._onEdit = onEdit;
        this._onDelete = onDelete;
        this._onChangeStatus = onChangeStatus;
        this._type = type;
    }
    setDisplayType(type) {
        this._type = type;
    }
    create(task) {
        let newElement;
        switch (this._type) {
            case TaskDisplayType.Detailed:
                newElement = new DetailedTaskElement(task);
                break;
            case TaskDisplayType.Compact:
                newElement = new CompactTaskElement(task);
                break;
            default: newElement = new BasicTaskElement(task);
        }
        newElement.onEdit = this._onEdit;
        newElement.onDelete = this._onDelete;
        newElement.onSetStatus = this._onChangeStatus;
        if (task.isOverdue) {
            newElement = new OverdueTask(newElement);
        }
        else if (task.isDueToday) {
            newElement = new DueToday(newElement);
        }
        return newElement;
    }
    /** Convert an existing list of taskElements to a new list according to the current display type */
    convertElements(taskElements) {
        const newElements = [];
        for (let element of taskElements) {
            newElements.push(this.create(element.Task));
        }
        return newElements;
    }
}
export var TaskDisplayType;
(function (TaskDisplayType) {
    TaskDisplayType[TaskDisplayType["Basic"] = 0] = "Basic";
    TaskDisplayType[TaskDisplayType["Detailed"] = 1] = "Detailed";
    TaskDisplayType[TaskDisplayType["Compact"] = 2] = "Compact";
})(TaskDisplayType || (TaskDisplayType = {}));
//# sourceMappingURL=TaskElementFactory.js.map