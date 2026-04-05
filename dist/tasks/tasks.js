import { TaskElementFactory, TaskDisplayType } from "../task_elements/TaskElementFactory.js";
import { TaskDetail } from "../task_elements/TaskDetail.js";
import { TaskElement } from "../task_elements/TaskElement.js";
import { canSort, Order, sort } from "../utils/TaskSorter.js";
import { TaskPriority, TaskStatus } from "./Task.js";
import { ViewHolder } from "../views/ViewHolder.js";
import { canFilter } from "../utils/TaskFilter.js";
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
        // if the viewholder loaded a view before we loaded our tasks, draw the tasks
        // otherwise, wait for the viewholder to load
        if (viewHolder.rView != undefined) {
            drawTaskElements();
        }
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
            taskContainer.removeChild(element);
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
    taskContainer.innerHTML = "";
    for (let task of taskElements) {
        if (task.isFilteredOut)
            continue;
        taskContainer.appendChild(task.Element);
    }
}
/** */
function changeTableDisplay(type) {
    elementFactory.setDisplayType(type);
    taskElements = elementFactory.convertElements(taskElements);
    drawTaskElements();
}
function sortElements(value) {
    let detail = value.split(",")[0];
    let order = value.split(",")[1];
    sort(detail, taskElements, order);
    viewHolder.rwView.sortHeader = detail;
    viewHolder.rwView.sortOrder = order;
    drawTaskElements();
}
// I used this resource to see how to iterate over an enum
// https://blog.logrocket.com/iterate-over-enums-typescript/
function drawPriorityFilter() {
    priorityFilters.innerHTML = "";
    for (let priority of Object.values(TaskPriority)) {
        createFilterElement(priorityFilters, priority, (isChecked) => {
            viewHolder.rwView.priorityFilters.set(priority, isChecked);
            drawTaskElements();
        });
    }
}
function drawStatusFilter() {
    statusFilters.innerHTML = "";
    for (let status of Object.values(TaskStatus)) {
        createFilterElement(statusFilters, status, (isChecked) => {
            viewHolder.rwView.statusFilters.set(status, isChecked);
            console.log(viewHolder.rwView.statusFilters.get(status));
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
    filterCheckboxes.set(value, checkbox);
    parent.appendChild(checkbox);
    parent.appendChild(label);
}
/** After loading a view, set the value of the filter checkboxes to the values in the view */
function setFilterValues() {
    // since we don't want the view to register any changes when the checkbox change event is triggered, 
    // cache the current state of the view and reassign it when the operation is finished
    const initalState = viewHolder.rView.isChanged;
    setFilterValue(TaskPriority.Low, viewHolder.rView.priorityFilters.get(TaskPriority.Low));
    setFilterValue(TaskPriority.Medium, viewHolder.rView.priorityFilters.get(TaskPriority.Medium));
    setFilterValue(TaskPriority.High, viewHolder.rView.priorityFilters.get(TaskPriority.High));
    setFilterValue(TaskStatus.ToDo, viewHolder.rView.statusFilters.get(TaskStatus.ToDo));
    setFilterValue(TaskStatus.InProgress, viewHolder.rView.statusFilters.get(TaskStatus.InProgress));
    setFilterValue(TaskStatus.Complete, viewHolder.rView.statusFilters.get(TaskStatus.Complete));
    viewHolder.rView.isChanged = initalState;
}
function setFilterValue(detail, value) {
    let checkbox = filterCheckboxes.get(detail);
    if (checkbox == undefined || value == undefined)
        return;
    checkbox.checked = value;
}
const filterCheckboxes = new Map();
function drawSearchFilterOptions() {
    searchFilterOptions.innerHTML = "";
    for (let detail of Object.values(TaskDetail)) {
        if (!canFilter(detail))
            continue;
        searchFilterOptions.appendChild(createOptionForTaskDetail(detail));
    }
}
function drawSortOptions() {
    sortOptions.innerHTML = "";
    for (let detail of Object.values(TaskDetail)) {
        if (!canSort(detail))
            continue;
        let asc = createOptionForTaskDetail(detail);
        let dsc = createOptionForTaskDetail(detail);
        asc.value += `,${Order.Asc}`;
        asc.textContent += ": Ascending";
        dsc.value += `,${Order.Desc}`;
        dsc.textContent += ": Descending";
        sortOptions.appendChild(asc);
        sortOptions.appendChild(dsc);
    }
}
function createOptionForTaskDetail(detail) {
    const option = document.createElement("option");
    option.textContent = detail;
    option.value = detail;
    return option;
}
function filterBySearch(e) {
    if (e.target.id == searchFilterOptions.id) {
        viewHolder.rwView.searchFilter = searchFilterOptions.value;
        viewHolder.rwView.searchValue = "";
        searchBar.setAttribute("placeholder", `Search ${searchFilterOptions.value}`);
        searchBar.value = "";
    }
    else {
        viewHolder.rwView.searchValue = searchBar.value;
        if (searchBar.value.includes("{") && !searchBar.value.includes("}"))
            return;
    }
    drawTaskElements();
}
function onNewView(view) {
    sortOptions.value = `${view.sortHeader},${view.sortOrder}`;
    searchFilterOptions.value = view.searchFilter;
    searchBar.value = view.searchValue;
    setFilterValues();
    drawTaskElements();
}
const service = TaskService.Instance;
let taskElements = [];
const elementFactory = new TaskElementFactory(TaskDisplayType.Basic, editTask, deleteTask);
const taskContainer = document.getElementById("task-container");
const priorityFilters = document.getElementById("priority-filter-container");
const statusFilters = document.getElementById("status-filter-container");
const sortOptions = document.getElementById("sort-options");
const searchFilterOptions = document.getElementById("search-options");
const searchBar = document.getElementById("search-bar");
const viewHolder = ViewHolder.Instance;
viewHolder.subscribe(onNewView);
document.getElementById("search-form")?.addEventListener("input", filterBySearch);
document.getElementById("detailed-view")?.addEventListener("click", () => changeTableDisplay(TaskDisplayType.Detailed));
document.getElementById("compact-view")?.addEventListener("click", () => changeTableDisplay(TaskDisplayType.Compact));
document.getElementById("basic-view")?.addEventListener("click", () => changeTableDisplay(TaskDisplayType.Basic));
document.getElementById("new-task")?.addEventListener("click", () => createTask());
sortOptions.addEventListener("change", () => sortElements(sortOptions.value));
getAllTasks();
drawSearchFilterOptions();
drawPriorityFilter();
drawStatusFilter();
drawSortOptions();
//# sourceMappingURL=tasks.js.map