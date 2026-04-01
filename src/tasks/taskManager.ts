import { TaskService } from "../../dist/tasks/TaskService.js";

const service = TaskService.Instance;
const createTitleInput = document.getElementById("create-title") as HTMLInputElement;
const createDescriptionInput = document.getElementById("create-description") as HTMLInputElement;
const createDueInput = document.getElementById("create-duedate") as HTMLInputElement;
const createPriorityInput = document.getElementById("create-priority") as HTMLInputElement;

document.getElementById("create-task")?.addEventListener("submit", createTask)

function createTask(e: SubmitEvent) {
    e.preventDefault();

    service.createNewTask(
        createTitleInput.value,
        createDescriptionInput.value,
        createDueInput.value,
        createPriorityInput.value,
        () => { }
    )
}