import { Task } from "../tasks/Task.js";
export class TaskElement {
    set onEdit(callback) { this.edit = callback; }
    set onDelete(callback) { this.delete = callback; }
    constructor(task) {
        this.Task = task;
        this._element = this.create();
    }
    get Element() { return this._element; }
}
//# sourceMappingURL=TaskElement.js.map