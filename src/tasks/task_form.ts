import { SESSION_TASK_KEY } from "../global.js";
import { TaskService } from "./TaskService.js";
import { Task } from "./Task.js";

/** Get the cached id as an integer */
function getCachedID(): number {
    const cachedID = sessionStorage.getItem(SESSION_TASK_KEY);
    if (cachedID == null) return -1;
    return parseInt(cachedID);
}

/** Try to get the cached task id from session storage and populate the edit fields */
export function tryGetSelectedTask() {
    const id = getCachedID();
    if (id < 0) return;

    service.getTask(id, (r, task) => {
        console.log("here");
        if (r && task != undefined) {
            populateEditFields(task);
        }

        else {
            console.log("Error: could not find the selected task. Do you have permission to edit it?")
        }
    })
}

/** Populate the input fields with the data from the given task */
function populateEditFields(task: Task) {
    if (task.id != undefined) idInput.value = task.id.toString();
    userInput.value = task.user;
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    dueInput.value = task.formattedDueDate;
    priorityInput.value = task.priority;
    createdDate.value = task.formattedCreatedDate;
    statusInput.value = task.status;
    tagsInput.value = task.tags;
}

/** Create a new task and add it to the view */
function createTask() {   
    service.createNewTask(
        titleInput.value,
        descriptionInput.value,
        dueInput.value,
        priorityInput.value,
        tagsInput.value,
        (result, newTask) => { 
            if (result) redirect();
        }
    )
}

/** Save an edited task to the database */
function saveTask() {
    console.log(idInput.value);
    console.log(userInput.value);
    service.editTask(
        parseInt(idInput.value),
        titleInput.value,
        descriptionInput.value,
        dueInput.value,
        priorityInput.value,
        userInput.value,
        tagsInput.value,
        (result) => {
            if (result) redirect();
        }
    )    

}

/** */
function parseTags() {
}

/** Redirect to the tasks page */
function redirect() {
    window.location.reload();
    // window.location.replace("/static/index.html");
}

const service = TaskService.Instance;

const idInput = document.getElementById("id") as HTMLInputElement;
const userInput = document.getElementById("user") as HTMLInputElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const dueInput = document.getElementById("duedate") as HTMLInputElement;
const createdDate = document.getElementById("createdate") as HTMLInputElement;
const priorityInput = document.getElementById("priority") as HTMLInputElement;
const statusInput = document.getElementById("status") as HTMLInputElement;
const tagsInput = document.getElementById("tags") as HTMLInputElement;
tagsInput.addEventListener("input", parseTags);


document.querySelector("form.task-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = getCachedID();
    if (id < 0) createTask();
    else saveTask();
})

tryGetSelectedTask();