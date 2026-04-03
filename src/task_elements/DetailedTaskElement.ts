import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";

export class DetailedTaskElement extends TaskElement {
    constructor(task: Task) {
        super(task);
        this.Element = this.create();
    }

    public create(): HTMLElement {
        const tr = document.createElement("tr");
        tr.appendChild(this.createCellForValue(this.Task.title));
        tr.appendChild(this.createCellForValue(this.Task.description));
        tr.appendChild(this.createCellForValue(this.Task.dueDate.toDateString()));
        tr.appendChild(this.createCellForValue(this.Task.priority));
        tr.appendChild(this.createCellForValue(this.Task.status));
        tr.appendChild(this.createCellForValue(this.Task.tags));
        tr.appendChild(this.createCellForValue(this.Task.createdDate.toDateString()));
        tr.appendChild(this.createCellForValue(this.Task.user));
        tr.appendChild(this.createButtonCell());
        return tr;
    }
}