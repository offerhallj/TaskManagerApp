import { isFilteredOut } from "../utils/TaskFilter.js";
import { Task, TaskStatus } from "../tasks/Task.js";
export class TaskElement {
    edit(element) { this.onEdit(element); }
    delete(element) { this.onDelete(element); }
    setStatus(element) { this.onSetStatus(element); }
    constructor(task) {
        this.Task = task;
        // I realized that calling the create method in the constructor here was causing issues with the create method in overduetasks
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
    get isFilteredOut() {
        return isFilteredOut(this.Task);
    }
    createHTMLElement(element, ...classes) {
        const el = document.createElement(element);
        if (classes != undefined) {
            for (let c of classes) {
                el.classList.add(c);
            }
        }
        return el;
    }
    createImage(res, width, ...classes) {
        const img = this.createHTMLElement("img", ...classes);
        img.src = res;
        img.width = width;
        return img;
    }
    createParentElement(type) {
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
    createDetailContent() {
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
    createTagElement() {
        const parent = this.createHTMLElement("div", "tag-container");
        parent.appendChild(this.createTextElement("p", "Tags: "));
        for (let tag of this.Task.getTagList()) {
            tag = tag.trim();
            if (tag == "")
                continue;
            let small = this.createTextElement("small", tag);
            parent.appendChild(small);
        }
        return parent;
    }
    createTextElement(type, content) {
        const text = document.createElement(type);
        text.textContent = content;
        return text;
    }
    createActionContainer(type) {
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
    createActionButton(label, rsc, action, withLabel = true) {
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
    createStatusSetter(rsc) {
        const button = this.createHTMLElement("div", "action-button");
        const icon = this.createImage(rsc, 24);
        button.appendChild(icon);
        const select = document.createElement("select");
        select.appendChild(this.createStatusOption(TaskStatus.ToDo));
        select.appendChild(this.createStatusOption(TaskStatus.InProgress));
        select.appendChild(this.createStatusOption(TaskStatus.Complete));
        button.appendChild(select);
        console.log(this.Task.status);
        select.value = this.Task.status;
        select.addEventListener("change", () => {
            console.log(select.value);
            this.Task.status = select.value;
            this.setStatus(this);
        });
        return button;
    }
    createStatusOption(status) {
        const option = document.createElement("option");
        option.textContent = status;
        option.value = status;
        return option;
    }
}
TaskElement.details = [];
//# sourceMappingURL=TaskElement.js.map