import { TaskDisplayType } from "../task_tables/TaskTableFactory.js";
import { BasicTaskElement } from "./BasicTaskElement.js";
import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";
import { OverdueTaskElement } from "./OverdueTaskElement.js";
import { DetailedTaskElement } from "./DetailedTaskElement.js";
export class TaskElementFactory {
    constructor(type, onEdit, onDelete) {
        this._onEdit = onEdit;
        this._onDelete = onDelete;
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
            default: newElement = new BasicTaskElement(task);
        }
        newElement.onEdit = this._onEdit;
        newElement.onDelete = this._onDelete;
        if (task.isOverdue) {
            newElement = new OverdueTaskElement(newElement);
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
//# sourceMappingURL=TaskElementFactory.js.map