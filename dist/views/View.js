import { TaskStatus, TaskPriority } from "../tasks/Task.js";
// I referenced this post to initiaize the map with initial values
// https://stackoverflow.com/questions/41769955/initialize-a-map-containing-arrays-in-typescript
/** Saves the sorting and filtering preferences of the task table */
export class View {
    constructor() {
        this.statusFilters = new Map([
            [TaskStatus.InProgress, true],
            [TaskStatus.Complete, true],
            [TaskStatus.ToDo, true]
        ]);
        this.priorityFilters = new Map([
            [TaskPriority.High, true],
            [TaskPriority.Medium, true],
            [TaskPriority.Low, true]
        ]);
    }
}
//# sourceMappingURL=View.js.map