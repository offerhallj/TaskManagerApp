import { TaskTableFactory, TaskDisplayType } from "../task_tables/TaskTableFactory.js";
import { TaskElementFactory } from "../task_elements/TaskElementFactory.js";
import { TaskHeader } from "../task_tables/TaskHeader.js";
import { TaskElement } from "../task_elements/TaskElement.js";
import { Order, sort } from "../utils/TaskSorter.js";
import { TaskPriority, TaskStatus } from "./Task.js";
import { ViewHolder } from "../views/ViewHolder.js";
import { canFilter } from "../utils/TaskFilter.js";
import { SESSION_TASK_KEY } from "../global.js";
import { TaskService } from "./TaskService.js";
import { View } from "../views/View.js";
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
/** All all taskElements to the task table body */
function drawTaskElements() {
    taskTableContainer.innerHTML = "";
    taskTableContainer.appendChild(taskTable.Element);
    const body = taskTable.Body;
    body.innerHTML = "";
    for (let task of taskElements) {
        if (task.isFilteredOut)
            continue;
        body.appendChild(task.Element);
    }
}
/** */
function changeTableDisplay(type) {
    console.log(type);
    tableFactory.setDisplayType(type);
    elementFactory.setDisplayType(type);
    taskTable = tableFactory.create();
    console.log(taskElements);
    taskElements = elementFactory.convertElements(taskElements);
    console.log(taskElements);
    drawSearchFilterOptions();
    drawTaskElements();
}
function sortElements(header, order) {
    sort(header, taskElements, order);
    drawTaskElements();
}
// I used this resource to see how to iterate over an enum
// https://blog.logrocket.com/iterate-over-enums-typescript/
function drawPriorityFilter() {
    priorityFilters.innerHTML = "";
    for (let priority of Object.values(TaskPriority)) {
        createFilterElement(priorityFilters, priority, (isChecked) => {
            viewHolder.view.priorityFilters.set(priority, isChecked);
            drawTaskElements();
        });
    }
}
function drawStatusFilter() {
    statusFilters.innerHTML = "";
    for (let status of Object.values(TaskStatus)) {
        createFilterElement(statusFilters, status, (isChecked) => {
            viewHolder.view.statusFilters.set(status, isChecked);
            console.log(viewHolder.view.statusFilters.get(status));
            drawTaskElements();
        });
    }
}
function createFilterElement(parent, value, checkboxEvent) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = value;
    checkbox.checked = true;
    let label = document.createElement("label");
    label.textContent = value;
    label.setAttribute("for", value);
    checkbox.addEventListener("change", () => checkboxEvent(checkbox.checked));
    parent.appendChild(checkbox);
    parent.appendChild(label);
}
function drawSearchFilterOptions() {
    searchFilterOptions.innerHTML = "";
    for (let header of taskTable.displayHeaders) {
        if (!canFilter(header))
            continue;
        searchFilterOptions.appendChild(createOptionForTaskHeader(header));
    }
}
function createOptionForTaskHeader(header) {
    const option = document.createElement("option");
    option.textContent = header;
    option.value = header;
    return option;
}
function filterBySearch(e) {
    if (e.target.id == searchFilterOptions.id) {
        viewHolder.view.searchFilter = searchFilterOptions.value;
        viewHolder.view.searchValue = "";
        searchBar.setAttribute("placeholder", `Filter by ${searchFilterOptions.value}`);
        searchBar.value = "";
    }
    else {
        viewHolder.view.searchValue = searchBar.value;
        if (searchBar.value.includes("{") && !searchBar.value.includes("}"))
            return;
    }
    drawTaskElements();
}
function applySearchFilter() {
    console.log("ad");
}
const service = TaskService.Instance;
let taskElements = [];
const tableFactory = new TaskTableFactory(TaskDisplayType.Basic, sortElements);
const elementFactory = new TaskElementFactory(TaskDisplayType.Basic, editTask, deleteTask);
let taskTable = tableFactory.create();
const taskTableContainer = document.getElementById("task-table-container");
const priorityFilters = document.getElementById("priority-filter-container");
const statusFilters = document.getElementById("status-filter-container");
const searchFilterOptions = document.getElementById("search-options");
const searchBar = document.getElementById("search-bar");
const viewHolder = ViewHolder.Instance;
viewHolder.setView(new View);
document.getElementById("search-form")?.addEventListener("input", filterBySearch);
document.getElementById("detailed-view")?.addEventListener("click", () => changeTableDisplay(TaskDisplayType.Detailed));
document.getElementById("basic-view")?.addEventListener("click", () => changeTableDisplay(TaskDisplayType.Basic));
document.getElementById("new-task")?.addEventListener("click", () => createTask());
drawSearchFilterOptions();
getAllTasks();
document.addEventListener("DOMContentLoaded", () => {
    drawPriorityFilter();
    drawStatusFilter();
});
//# sourceMappingURL=tasks.js.map