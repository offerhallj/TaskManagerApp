import { TaskService } from "../../dist/tasks/TaskService.js";
import { Task } from "../../dist/tasks/Task.js";

/** An instance of a task displayed in the UI */
class TaskView {
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
            if (r) deleteTaskView(this);
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

/** Retrieve all tasks for the current user from the database, convert them to taskViews, and draw them */
function getAllTasks() {
    service.getAllTasks((result, tasks) => {
        if (result == false) {
            console.log("Error: Failed to retrieve tasks");
            return;
        }
 
        // once we've got all of the tasks, create the taskviews
        for (let task of tasks) {
            taskViews.push(new TaskView(task));
        }

        drawTaskViews();
    });
}

/** Display all taskViews in the task table body */
function drawTaskViews() {
    console.log("he");
    taskBody.innerHTML = "";
    for (let task of taskViews) {
        taskBody.appendChild(task.Element);
    }
}

function drawTaskView(taskview: TaskView) {
    taskBody.appendChild(taskview.Element);
}

function populateEditOptions(task: Task) {
    if (task.id != undefined) editIDInput.value = task.id.toString();
    editTitleInput.value = task.title;
    editDescriptionInput.value = task.description;
    console.log(task);
    editDueInput.value = task.getFormattedDate();
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

            const newTaskView = new TaskView(newTask);
            taskViews.push(newTaskView);
            drawTaskView(newTaskView);
        }
    )
}

function saveTask(e: SubmitEvent) {
    e.preventDefault();


}

function deleteTaskView(taskView: TaskView) {
    const element = taskView.Element;
    taskBody.removeChild(element);
    const index = taskViews.indexOf(taskView);
    if (index >= 0) taskViews.splice(index, 1);
}

const service = TaskService.Instance;
const taskViews: TaskView[] = [];

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