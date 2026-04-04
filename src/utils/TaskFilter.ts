import { TaskDetail } from "../task_elements/TaskDetail.js";
import { ViewHolder } from "../views/ViewHolder.js";
import { Task } from "../tasks/Task.js";


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

function isTextFiltered(text: string): boolean {
    const viewHolder = ViewHolder.Instance;
    if (viewHolder.rView.searchFilter == undefined) return false;
    return !text.toLowerCase().includes(viewHolder.rView.searchValue.toLowerCase().trim());
}

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