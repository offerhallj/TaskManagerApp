import { TaskTable } from "./TaskTable.js";
export declare class TaskTableFactory {
    private _displayType;
    constructor(displayType: TaskDisplayType);
    setDisplayType(displayType: TaskDisplayType): void;
    create(): TaskTable;
}
export declare enum TaskDisplayType {
    Basic = 0,
    Detailed = 1,
    Compact = 2
}
//# sourceMappingURL=TaskTableFactory.d.ts.map