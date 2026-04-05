import type { TaskDetail } from "./TaskDetail.js";
import type { UIElement } from "../interfaces/UIElement.js";
import { isFilteredOut } from "../utils/TaskFilter.js";
import { Task, TaskStatus } from "../tasks/Task.js";

export abstract class TaskElement implements UIElement {
    static details: TaskDetail[] = [];
    
    public readonly Task: Task;
    Element!: HTMLElement;
    
    public onEdit!: ((element: TaskElement) => void);
    public onDelete!: ((element: TaskElement) => void);
    public edit(element: TaskElement): void { this.onEdit(element); }
    public delete(element: TaskElement): void { this.onDelete(element); }


    constructor(task: Task) {
        this.Task = task;
        // I realized that calling the create method in the constructor here was causing issues with the create method in overduetasks
        // so I've had to override the constructor in all of the children
    }

    abstract create(): HTMLElement;

    protected createCellForValue(val: string): HTMLElement {
        let td = document.createElement("td");
        td.textContent = val;
        return td;
    }

    protected createButtonCell(): HTMLElement {
        const buttonCell = document.createElement("td");
        buttonCell.appendChild(this.createEditButton());
        buttonCell.appendChild(this.createDeleteButton());
        return buttonCell;
    }

    protected createEditButton(): HTMLElement {
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => this.edit(this));
        return editButton;
    }

    protected createDeleteButton(): HTMLElement {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => this.delete(this));
        return deleteButton;
    }

    public get isFilteredOut(): boolean {
        return isFilteredOut(this.Task);
    }

    protected createHTMLElement(element: string, ...classes: string[]): HTMLElement {
        const el = document.createElement(element);
        if (classes != undefined) {
            for(let c of classes) {
                el.classList.add(c);
            }
        }

        return el;
    }

    protected createImage(res: string, width: number, ...classes: string[]): HTMLImageElement {
        const img = this.createHTMLElement("img", ...classes) as HTMLImageElement;
        img.src = res;
        img.width = width;
        return img;
    }

    protected createParentElement(type: string): HTMLElement {
        const taskElement = this.createHTMLElement("div", "task-element", type);
        const mainContent = this.createHTMLElement("div", "main-content");
        taskElement.appendChild(mainContent);
        const headerContainer = this.createHTMLElement("div", "header-container");
        mainContent.appendChild(headerContainer);
        const h3 = document.createElement("h3");
        h3.textContent = this.Task.title;
        headerContainer.appendChild(h3);
        const dueDate = this.createHTMLElement("div", "due-date-container");
        headerContainer.appendChild(dueDate);
        const clockImg = this.createImage("./icons/clock.svg", 20);
        dueDate.appendChild(clockImg);
        const dueP = document.createElement("p");
        dueP.textContent = `Due: ${this.Task.dueDate.toDateString()}`;
        dueDate.appendChild(dueP);

        const actionContainer = this.createActionContainer(type);
        taskElement?.appendChild(actionContainer);
        return taskElement;
    }

    protected createDetailContent(): HTMLElement {
        const parent = this.createHTMLElement("div", "task-detail-content");
        const clockImg = this.createImage("./icons/clock.svg", 20);
        const created = this.createTextElement("p", `Created: ${this.Task.createdDate.toDateString()}`);
        const priorityImg = this.createImage("./icons/priority.svg", 20);
        const priority = this.createTextElement("p", `Priority: ${this.Task.priority}`);
        const checklistImg = this.createImage("./icons/checklist.svg", 20);
        const status = this.createTextElement("p", `Status: ${this.Task.status}`);
        const userImg = this.createImage("./icons/user.svg", 20);
        const user = this.createTextElement("p", `Created by: ${this.Task.user}`);
        parent.appendChild(clockImg);
        parent.appendChild(created);
        parent.appendChild(priorityImg);
        parent.appendChild(priority);
        parent.appendChild(checklistImg);
        parent.appendChild(status);
        parent.appendChild(userImg);
        parent.appendChild(user);
        return parent;
    }

    protected createTagElement(): HTMLElement {
        const parent = this.createHTMLElement("div", "tag-container");
        parent.appendChild(this.createTextElement("p", "Tags: "));
        for(let tag of this.Task.getTagList()) {
            tag = tag.trim();
            if (tag == "") continue;
            let small = this.createTextElement("small", tag);
            parent.appendChild(small);
        }

        return parent;
    }

    protected createTextElement(type: string, content: string): HTMLElement {
        const text = document.createElement(type);
        text.textContent = content;
        return text;
    }

    protected createActionContainer(type: string): HTMLElement {
        const parent = this.createHTMLElement("div", "action-container");
        const deleteButton = this.createActionButton("Delete", "./icons/delete.svg", () => this.delete(this), type != "compact");
        const editButton = this.createActionButton("Edit", "./icons/edit-square.svg", () => this.edit(this), type != "compact");
        const statusSelector = this.createStatusSetter("./icons/checklist.svg");
        
        if (type != "detailed") {
            const compactContainer = this.createHTMLElement("div", "compact-action-container");
            parent.appendChild(compactContainer);
            if (type == "compact") {
                compactContainer.appendChild(statusSelector);
            } 

            compactContainer.appendChild(editButton);
            compactContainer.appendChild(deleteButton);
            if (type == "basic") {
                parent.appendChild(statusSelector);
            }

        }

        if (type == "detailed") {
            parent.appendChild(editButton);
            parent.appendChild(deleteButton);
            parent.appendChild(statusSelector);
        }

        return parent;
    }

    protected createActionButton(label: string, rsc: string, action: () => void, withLabel: boolean = true): HTMLElement {
        const button = this.createHTMLElement("div", "action-button");
        const icon = this.createImage(rsc, 24);
        button.appendChild(icon);
        if (withLabel) {
            const p = this.createTextElement("p", label);
            button.appendChild(p);
        }
        button.addEventListener("click", action);
        return button;
    }

    protected createStatusSetter(rsc: string) {
        const button = this.createHTMLElement("div", "action-button");
        const icon = this.createImage(rsc, 24);
        button.appendChild(icon);
        const select = document.createElement("select");
        select.appendChild(this.createStatusOption(TaskStatus.ToDo));
        select.appendChild(this.createStatusOption(TaskStatus.InProgress));
        select.appendChild(this.createStatusOption(TaskStatus.Complete));
        button.appendChild(select);
        return button;
    }

    private createStatusOption(status: TaskStatus): HTMLElement {
        const option = document.createElement("option");
        option.textContent = status;
        option.value = status;
        return option;
    }
}