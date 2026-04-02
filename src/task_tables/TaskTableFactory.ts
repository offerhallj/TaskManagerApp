import { DetailedTaskTable } from "./DetailedTaskTable.js";
import { BasicTaskTable } from "./BasicTaskTable.js";
import { TaskTable } from "./TaskTable.js";

export class TaskTableFactory {
    private _displayType: TaskDisplayType = TaskDisplayType.Basic;

    constructor(displayType: TaskDisplayType) {
        this._displayType = displayType;
    }

    public setDisplayType(displayType: TaskDisplayType) {
        this._displayType = displayType;
    }

    public create(): TaskTable {
        switch (this._displayType) {
            case TaskDisplayType.Detailed: return new DetailedTaskTable(); 
            default: return new BasicTaskTable();
        } 
    }
}


export enum TaskDisplayType {
    Basic, Detailed, Compact
}