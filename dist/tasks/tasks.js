var _a, _b;
import { TaskElementFactory, TaskElementType } from "../task_elements/TaskElementFactory.js";
import { TaskElement } from "../task_elements/TaskElement.js";
import { TaskService } from "./TaskService.js";
const factory = new TaskElementFactory(TaskElementType.Basic, editTask, deleteTask);
/** Retrieve all tasks for the current user from the database, convert them to taskElements, and draw them */
function getAllTasks() {
    taskElements.splice(0, taskElements.length);
    service.getAllTasks((result, tasks) => {
        if (result == false) {
            console.log("Error: Failed to retrieve tasks");
            return;
        }
        // once we've got all of the tasks, create the taskElements
        for (let task of tasks) {
            taskElements.push(factory.create(task));
        }
        // finally, draw the taskElements
        drawTaskElements();
    });
}
/** All all taskElements to the task table body */
function drawTaskElements() {
    taskBody.innerHTML = "";
    for (let task of taskElements) {
        drawTaskElement(task);
    }
}
/** Add a single taskElement to the task table body  */
function drawTaskElement(taskElement) {
    taskBody.appendChild(taskElement.Element);
}
/** Create a new task and add it to the view */
function createTask(e) {
    e.preventDefault();
    service.createNewTask(createTitleInput.value, createDescriptionInput.value, createDueInput.value, createPriorityInput.value, (result, newTask) => {
        if (result == false || newTask == undefined) {
            console.log("Error: task could not be created!");
            return;
        }
        const newTaskElement = factory.create(newTask);
        taskElements.push(newTaskElement);
        drawTaskElement(newTaskElement);
    });
}
function editTask(taskElement) {
    let task = taskElement.Task;
    if (task.id != undefined)
        editIDInput.value = task.id.toString();
    editUserInput.value = task.user;
    editTitleInput.value = task.title;
    editDescriptionInput.value = task.description;
    editDueInput.value = task.getFormattedDate();
    editPriorityInput.value = task.priority;
}
function saveTask(e) {
    e.preventDefault();
    console.log(editIDInput.value);
    console.log(editUserInput.value);
    service.editTask(parseInt(editIDInput.value), editTitleInput.value, editDescriptionInput.value, editDueInput.value, editPriorityInput.value, editUserInput.value, () => {
        getAllTasks();
    });
}
function deleteTask(taskElement) {
    service.deleteTask(taskElement.Task, r => {
        if (r == true) {
            const element = taskElement.Element;
            taskBody.removeChild(element);
            const index = taskElements.indexOf(taskElement);
            if (index >= 0)
                taskElements.splice(index, 1);
        }
    });
}
const service = TaskService.Instance;
const taskElements = [];
const createTitleInput = document.getElementById("create-title");
const createDescriptionInput = document.getElementById("create-description");
const createDueInput = document.getElementById("create-duedate");
const createPriorityInput = document.getElementById("create-priority");
const editIDInput = document.getElementById("edit-id");
const editUserInput = document.getElementById("edit-user");
const editTitleInput = document.getElementById("edit-title");
const editDescriptionInput = document.getElementById("edit-description");
const editDueInput = document.getElementById("edit-duedate");
const editPriorityInput = document.getElementById("edit-priority");
const taskBody = document.getElementById("task-table-body");
(_a = document.getElementById("create-task")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", createTask);
(_b = document.getElementById("edit-task")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", saveTask);
getAllTasks();
//# sourceMappingURL=tasks.js.map