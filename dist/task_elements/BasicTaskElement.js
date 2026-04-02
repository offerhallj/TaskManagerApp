import { TaskElement } from "./TaskElement.js";
export class BasicTaskElement extends TaskElement {
    create() {
        const tr = document.createElement("tr");
        tr.appendChild(this.createCellForValue(this.Task.title));
        tr.appendChild(this.createCellForValue(this.Task.description));
        tr.appendChild(this.createCellForValue(this.Task.dueDate.toDateString()));
        tr.appendChild(this.createCellForValue(this.Task.priority));
        tr.appendChild(this.createCellForValue(this.Task.status));
        const buttonCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => this.edit(this));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => this.delete(this));
        buttonCell.appendChild(editButton);
        buttonCell.appendChild(deleteButton);
        tr.appendChild(buttonCell);
        return tr;
    }
    createCellForValue(val) {
        let td = document.createElement("td");
        td.textContent = val;
        return td;
    }
}
//# sourceMappingURL=BasicTaskElement.js.map