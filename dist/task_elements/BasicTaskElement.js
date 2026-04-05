import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";
import { TaskDetail } from "./TaskDetail.js";
export class BasicTaskElement extends TaskElement {
    constructor(task) {
        super(task);
        this.Element = this.create();
        TaskElement.details = [
            TaskDetail.Title,
            TaskDetail.DueDate,
            TaskDetail.Priority,
            TaskDetail.Status,
            TaskDetail.Tags
        ];
    }
    create() {
        const taskElement = this.createParentElement("basic");
        const mainContent = taskElement.querySelector('.main-content');
        const tagElement = this.createTagElement();
        mainContent?.appendChild(tagElement);
        return taskElement;
    }
}
//# sourceMappingURL=BasicTaskElement.js.map