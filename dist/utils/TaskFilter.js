import { TaskHeader } from "../task_tables/TaskHeader.js";
import { ViewHolder } from "../views/ViewHolder.js";
import { Task } from "../tasks/Task.js";
const viewHolder = ViewHolder.Instance;
export function isFilteredOut(task) {
    // handle basic filters first
    if (viewHolder.view.priorityFilters.get(task.priority) == false)
        return true;
    if (viewHolder.view.statusFilters.get(task.status) == false)
        return true;
    // handle search filters
    switch (viewHolder.view.searchFilter) {
        case TaskHeader.Title: return isTextFiltered(task.title);
        case TaskHeader.Description: return isTextFiltered(task.description);
        case TaskHeader.Tags: return isTextFiltered(task.tags);
        case TaskHeader.DueDate: return isDateFiltered(task.dueDate.toDateString());
        case TaskHeader.CreatedDate: return isDateFiltered(task.createdDate.toDateString());
    }
    return false;
}
export function canFilter(header) {
    switch (header) {
        case TaskHeader.Actions:
        case TaskHeader.Status:
        case TaskHeader.Priority:
            return false;
        default:
            return true;
    }
}
function isTextFiltered(text) {
    if (viewHolder.view.searchFilter == undefined)
        return false;
    return !text.toLowerCase().includes(viewHolder.view.searchValue.toLowerCase().trim());
}
function isDateFiltered(text) {
    let searchFilter = viewHolder.view.searchValue.trim();
    if (searchFilter == "")
        return false;
    if (searchFilter.includes("{"))
        searchFilter = translateDateKeyword(searchFilter);
    searchFilter = searchFilter.toLowerCase();
    text = text.toLowerCase();
    console.log(text + " " + searchFilter);
    if (text == searchFilter)
        return false;
    return true;
}
function translateDateKeyword(searchFilter) {
    if (searchFilter == "{today}") {
        let today = new Date().toDateString();
        return today;
    }
    if (searchFilter == "{tomorrow}") {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toDateString();
    }
    if (searchFilter == "{yesterday}") {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toDateString();
    }
    return "";
}
//# sourceMappingURL=TaskFilter.js.map