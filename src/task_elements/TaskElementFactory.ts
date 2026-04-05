import { DetailedTaskElement } from "./DetailedTaskElement.js";
import { CompactTaskElement } from "./CompactTaskElement.js";
import { OverdueTask } from "./decorators/OverdueTask.js";
import { BasicTaskElement } from "./BasicTaskElement.js";
import { DueToday } from "./decorators/DueToday.js";
import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";

export class TaskElementFactory {
    private _type: TaskDisplayType;
    private _onEdit: (element: TaskElement) => void;
    private _onDelete: (element: TaskElement) => void;
    private _onChangeStatus: (element: TaskElement) => void;

    constructor(type: TaskDisplayType, 
        onEdit: (element: TaskElement) => void, 
        onDelete: (element: TaskElement) => void,
        onChangeStatus: (element: TaskElement) => void) {
            this._onEdit = onEdit;
            this._onDelete = onDelete;
            this._onChangeStatus = onChangeStatus;
            this._type = type;
    }

    public setDisplayType(type: TaskDisplayType) {
        this._type = type;
    }

    public create(task: Task): TaskElement {
        let newElement: TaskElement;
        switch (this._type) {
            case TaskDisplayType.Detailed: newElement = new DetailedTaskElement(task); break;   
            case TaskDisplayType.Compact: newElement = new CompactTaskElement(task); break;   
            default: newElement = new BasicTaskElement(task)        
        }

        newElement.onEdit = this._onEdit;
        newElement.onDelete = this._onDelete;
        newElement.onSetStatus = this._onChangeStatus;
        
        if (task.isOverdue) { newElement = new OverdueTask(newElement); }
        else if (task.isDueToday) { newElement = new DueToday(newElement); }
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

export enum TaskDisplayType {
    Basic, Detailed, Compact
}
