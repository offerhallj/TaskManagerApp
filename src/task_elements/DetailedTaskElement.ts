import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";

export class DetailedTaskElement extends TaskElement {
    constructor(task: Task) {
        super(task);
        this.Element = this.create();
    }

    public create(): HTMLElement {
        const taskElement = this.createParentElement("detailed");
        const mainContent = taskElement.querySelector('.main-content');
        const tagElement = this.createTagElement();
        const details = this.createDetailContent();
        const desc = this.createTextElement("p", this.Task.description);
        mainContent?.appendChild(desc);
        mainContent?.appendChild(details);
        mainContent?.appendChild(tagElement);
        return taskElement;
    }
}