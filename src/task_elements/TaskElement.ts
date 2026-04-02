import type { UIElement } from "../interfaces/UIElement.js";
import { Task } from "../tasks/Task.js";

export abstract class TaskElement implements UIElement {
    public readonly Task: Task;
    Element!: HTMLElement;
    
    protected edit!: ((element: TaskElement) => void);
    protected delete!: ((element: TaskElement) => void);
    public set onEdit(callback: (element: TaskElement) => void) { this.edit = callback; }
    public set onDelete(callback: (element: TaskElement) => void) { this.delete = callback; }

    constructor(task: Task) {
        this.Task = task;
        // I realized that calling the create method in the constructor here was causing issues with the create method in overduetaskelements
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
}