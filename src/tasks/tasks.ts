import { TaskService } from "../../dist/tasks/TaskService.js";
import { Task } from "../../dist/tasks/Task.js";

/** An instance of a task displayed in the UI */
class TaskElement {
    private _element: HTMLElement;
    private _task: Task;

    constructor(task: Task) {
        this._task = task;
        this._element = this.createHTMLElement();
    }

    private createHTMLElement(): HTMLElement {
        const tr = document.createElement("tr");
        tr.appendChild(this.createCellForValue(this._task.title));
        tr.appendChild(this.createCellForValue(this._task.description));
        tr.appendChild(this.createCellForValue(this._task.dueDate.toDateString()));
        tr.appendChild(this.createCellForValue(this._task.priority));
        tr.appendChild(this.createCellForValue(this._task.status));
        const buttonCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => populateEditOptions(this._task));


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => service.deleteTask(this._task, (r) => {
            if (r) deleteTaskElement(this);
            else console.log("Error: Could not delete the task.");
        }));

        buttonCell.appendChild(editButton);
        buttonCell.appendChild(deleteButton);
        tr.appendChild(buttonCell);
        return tr;
    }

    private createCellForValue(val: string): HTMLElement {
        let td = document.createElement("td");
        td.textContent = val;
        return td;
    }

    public get Element(): HTMLElement {
        return this._element;
    }
}

/** Retrieve all tasks for the current user from the database, convert them to taskElements, and draw them */
function getAllTasks() {
    service.getAllTasks((result, tasks) => {
        if (result == false) {
            console.log("Error: Failed to retrieve tasks");
            return;
        }
 
        // once we've got all of the tasks, create the taskElements
        for (let task of tasks) {
            taskElements.push(new TaskElement(task));
        }

        drawTaskElements();
    });
}

/** Display all taskElements in the task table body */
function drawTaskElements() {
    console.log("he");
    taskBody.innerHTML = "";
    for (let task of taskElements) {
        taskBody.appendChild(task.Element);
    }
}

function drawTaskElement(taskElement: TaskElement) {
    taskBody.appendChild(taskElement.Element);
}

function populateEditOptions(task: Task) {
    if (task.id != undefined) editIDInput.value = task.id.toString();
    editTitleInput.value = task.title;
    editDescriptionInput.value = task.description;
    editDueInput.value = task.getFormattedDate();
    editPriorityInput.value = task.priority;
}

function edtiTask(e: SubmitEvent) {
    e.preventDefault();
    // service.editTask()
}

function createTask(e: SubmitEvent) {
    e.preventDefault();
    
    service.createNewTask(
        createTitleInput.value,
        createDescriptionInput.value,
        createDueInput.value,
        createPriorityInput.value,
        (result, newTask) => { 
            if (result == false || newTask == undefined) {
                console.log("Error: task could not be created!");
                return;
            }

            const newTaskElement = new TaskElement(newTask);
            taskElements.push(newTaskElement);
            drawTaskElement(newTaskElement);
        }
    )
}

function saveTask(e: SubmitEvent) {
    e.preventDefault();


}

function deleteTaskElement(taskElement: TaskElement) {
    const element = taskElement.Element;
    taskBody.removeChild(element);
    const index = taskElements.indexOf(taskElement);
    if (index >= 0) taskElements.splice(index, 1);
}

const service = TaskService.Instance;
const taskElements: TaskElement[] = [];

const createTitleInput = document.getElementById("create-title") as HTMLInputElement;
const createDescriptionInput = document.getElementById("create-description") as HTMLInputElement;
const createDueInput = document.getElementById("create-duedate") as HTMLInputElement;
const createPriorityInput = document.getElementById("create-priority") as HTMLInputElement;

const editIDInput = document.getElementById("edit-id") as HTMLInputElement;
const editTitleInput = document.getElementById("edit-title") as HTMLInputElement;
const editDescriptionInput = document.getElementById("edit-description") as HTMLInputElement;
const editDueInput = document.getElementById("edit-duedate") as HTMLInputElement;
const editPriorityInput = document.getElementById("edit-priority") as HTMLInputElement;

const taskBody = document.getElementById("task-table-body") as HTMLElement;

document.getElementById("create-task")?.addEventListener("submit", createTask)
document.getElementById("edit-task")?.addEventListener("submit", saveTask)
getAllTasks();