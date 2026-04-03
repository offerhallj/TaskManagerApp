import type { UIElement } from "../interfaces/UIElement.js";
import { ViewHolder } from "../views/ViewHolder.js";
import { Task } from "../tasks/Task.js";

const viewHolder = ViewHolder.Instance;
export abstract class TaskElement implements UIElement {
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
        console.log(this.Task.priority);
        console.log(viewHolder.view);


        if (viewHolder.view.priorityFilters.get(this.Task.priority) == false) return true;
        if (viewHolder.view.statusFilters.get(this.Task.status) == false) return true;
        return false;
    }
}