import { TaskDetail } from "../task_elements/TaskDetail.js";
import { ViewHolder } from "../views/ViewHolder.js";
import { Task } from "../tasks/Task.js";

/** Checks the current Task against the filters in the current View to determine if the task should be visible in the taskview or filtered out */
export function isFilteredOut(task: Task) {
    const viewHolder = ViewHolder.Instance;
    // handle basic filters first
    if (viewHolder.rView.priorityFilters.get(task.priority) == false) return true;
    if (viewHolder.rView.statusFilters.get(task.status) == false) return true;

    // handle search filters
    switch (viewHolder.rView.searchFilter) {
        case TaskDetail.Title: return isTextFiltered(task.title);
        case TaskDetail.Description: return isTextFiltered(task.description);
        case TaskDetail.User: return isTextFiltered(task.user);
        case TaskDetail.Tags: return isTextFiltered(task.tags);
        case TaskDetail.DueDate: return isDateFiltered(task.dueDate.toDateString());
        case TaskDetail.CreatedDate: return isDateFiltered(task.createdDate.toDateString());
    }

    return false;
}

/** Returns true if the provided TaskDetail is a valid filter in the searchbar */
export function canFilter(header: TaskDetail): boolean {
    switch (header) {
        case TaskDetail.ID:
        case TaskDetail.Actions:
        case TaskDetail.Status:
        case TaskDetail.Priority:
            return false;
        default: 
            return true;
    }
}

/** Returns true if the given task detail (text) contains the searchValue in the View; 
 * Used for basic text fields (title, description, tag, etc.)
*/
function isTextFiltered(text: string): boolean {
    const viewHolder = ViewHolder.Instance;
    if (viewHolder.rView.searchFilter == undefined) return false;
    return !text.toLowerCase().includes(viewHolder.rView.searchValue.toLowerCase().trim());
}

/** Returns true if the given task detail (text) contains the searchValue in the View 
 * Used for date fields (createdDate and dueDate)
*/
function isDateFiltered(text: string): boolean {
    const viewHolder = ViewHolder.Instance;
    let searchFilter = viewHolder.rView.searchValue.trim();
    if (searchFilter == "") return false;
    if (searchFilter.includes("{")) searchFilter = translateDateKeyword(searchFilter);
    searchFilter = searchFilter.toLowerCase();
    text = text.toLowerCase();

    console.log(text + " " + searchFilter);

    if (text == searchFilter) return false;
    return true;
}

/** Returns the value of any keywords enclosed in curly braces in the searchbar */
function translateDateKeyword(searchFilter: string): string {
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