import { Task } from "../tasks/Task.js";
export class TaskElement {
    edit(element) { this.onEdit(element); }
    delete(element) { this.onDelete(element); }
    constructor(task) {
        this.Task = task;
        // I realized that calling the create method in the constructor here was causing issues with the create method in overduetaskelements
        // so I've had to override the constructor in all of the children
    }
    createCellForValue(val) {
        let td = document.createElement("td");
        td.textContent = val;
        return td;
    }
    createButtonCell() {
        const buttonCell = document.createElement("td");
        buttonCell.appendChild(this.createEditButton());
        buttonCell.appendChild(this.createDeleteButton());
        return buttonCell;
    }
    createEditButton() {
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => this.edit(this));
        return editButton;
    }
    createDeleteButton() {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => this.delete(this));
        return deleteButton;
    }
}
//# sourceMappingURL=TaskElement.js.map