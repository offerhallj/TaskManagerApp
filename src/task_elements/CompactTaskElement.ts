import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";
import { TaskDetail } from "./TaskDetail.js";

export class CompactTaskElement extends TaskElement {   
    constructor(task: Task) {
        super(task);
        this.Element = this.create();
        
        TaskElement.details = [
            TaskDetail.Title,
            TaskDetail.DueDate,
        ];
    }

    public create(): HTMLElement {
        const taskElement = this.createParentElement("compact");
        return taskElement;
    }
}