import { TaskDisplayType } from "../task_tables/TaskTableFactory.js";
import { BasicTaskElement } from "./BasicTaskElement.js";
import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";
import { OverdueTaskElement } from "./OverdueTaskElement.js";
import { DetailedTaskElement } from "./DetailedTaskElement.js";

export class TaskElementFactory {
    private _type: TaskDisplayType;
    private _onEdit: (element: TaskElement) => void;
    private _onDelete: (element: TaskElement) => void;

    constructor(type: TaskDisplayType, 
        onEdit: (element: TaskElement) => void, 
        onDelete: (element: TaskElement) => void) {
            this._onEdit = onEdit;
            this._onDelete = onDelete;
            this._type = type;
    }

    public setDisplayType(type: TaskDisplayType) {
        this._type = type;
    }

    public create(task: Task): TaskElement {
        let newElement: TaskElement;
        switch (this._type) {
            case TaskDisplayType.Detailed: newElement = new DetailedTaskElement(task); break;   
            default: newElement = new BasicTaskElement(task)        
        }

        newElement.onEdit = this._onEdit;
        newElement.onDelete = this._onDelete;

        if (task.isOverdue) { newElement = new OverdueTaskElement(newElement); }
        return newElement;
    }

    /** Convert an existing list of taskElements to a new list according to the current display type */
    public convertElements(taskElements: TaskElement[]): TaskElement[] {
        const newElements: TaskElement[] = [];
        for (let element of taskElements) {
            newElements.push(this.create(element.Task));
        }

        return newElements;
    }
}
