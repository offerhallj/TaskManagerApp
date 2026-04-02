import { TaskTableFactory, TaskDisplayType } from "../task_tables/TaskTableFactory.js";
import { TaskElementFactory } from "../task_elements/TaskElementFactory.js";
import { TaskElement } from "../task_elements/TaskElement.js";
import { SESSION_TASK_KEY } from "../global.js";
import { TaskService } from "./TaskService.js";
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
            taskElements.push(elementFactory.create(task));
        }
        // finally, draw the taskElements
        drawTaskElements();
    });
}
/** All all taskElements to the task table body */
function drawTaskElements() {
    taskTableContainer.innerHTML = "";
    taskTableContainer.appendChild(taskTable.Element);
    const body = taskTable.Body;
    body.innerHTML = "";
    for (let task of taskElements) {
        body.appendChild(task.Element);
    }
}
/** Add a single taskElement to the task table body  */
function drawTaskElement(taskElement) {
    taskTable.Body.appendChild(taskElement.Element);
}
/** Navigate to the taskform with the current task selected */
function editTask(taskElement) {
    let task = taskElement.Task;
    if (task.id == undefined)
        return;
    sessionStorage.setItem(SESSION_TASK_KEY, task.id.toString());
    window.location.replace("/static/taskform.html");
}
/** Delete the selected task */
function deleteTask(taskElement) {
    service.deleteTask(taskElement.Task, r => {
        if (r == true) {
            const element = taskElement.Element;
            taskTable.Body.removeChild(element);
            const index = taskElements.indexOf(taskElement);
            if (index >= 0)
                taskElements.splice(index, 1);
        }
    });
}
/** Navigate to the taskform to create a new task */
function createTask() {
    // clear the session storage
    sessionStorage.setItem("id", "-1");
    window.location.replace("/static/taskform.html");
}
function changeTableDisplay(type) {
    console.log(type);
    tableFactory.setDisplayType(type);
    elementFactory.setDisplayType(type);
    taskTable = tableFactory.create();
    console.log(taskElements);
    taskElements = elementFactory.convertElements(taskElements);
    console.log(taskElements);
    drawTaskElements();
}
const service = TaskService.Instance;
let taskElements = [];
const tableFactory = new TaskTableFactory(TaskDisplayType.Basic);
const elementFactory = new TaskElementFactory(TaskDisplayType.Basic, editTask, deleteTask);
let taskTable = tableFactory.create();
const taskTableContainer = document.getElementById("task-table-container");
document.getElementById("detailed-view")?.addEventListener("click", () => changeTableDisplay(TaskDisplayType.Detailed));
document.getElementById("basic-view")?.addEventListener("click", () => changeTableDisplay(TaskDisplayType.Basic));
document.getElementById("new-task")?.addEventListener("click", () => createTask());
getAllTasks();
//# sourceMappingURL=tasks.js.map