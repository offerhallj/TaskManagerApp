import { TaskPriority, TaskStatus, Task } from "../tasks/Task.js";
import { TaskElement } from "../task_elements/TaskElement.js";
import { TaskHeader } from "../task_tables/TaskHeader.js";

export function sort(header: TaskHeader, elements: TaskElement[], order: Order = Order.Asc) {
    switch (header) {
        case TaskHeader.ID:  
            return elements.sort((a, b) => alphaNumericSort(a.Task.id, b.Task.id, order));
        case TaskHeader.Title:  
            return elements.sort((a, b) => alphaNumericSort(a.Task.title, b.Task.title, order));
        case TaskHeader.Description:  
            return elements.sort((a, b) => alphaNumericSort(a.Task.description, b.Task.description, order));
        case TaskHeader.User:  
            return elements.sort((a, b) => alphaNumericSort(a.Task.user, b.Task.user, order));
        case TaskHeader.Tags: 
            return elements.sort((a, b) => alphaNumericSort(a.Task.tags, b.Task.tags, order));

        case TaskHeader.Status: 
            return elements.sort((a, b) => statusSort(a.Task, b.Task, order));

        case TaskHeader.Priority: 
            return elements.sort((a, b) => prioritySort(a.Task, b.Task, order));

        case TaskHeader.CreatedDate:
            return elements.sort((a, b) => dateSort(a.Task.createdDate, b.Task.createdDate, order));

        case TaskHeader.DueDate:
            return elements.sort((a, b) => dateSort(a.Task.dueDate, b.Task.dueDate, order));
    }
}

export function canSort(header: TaskHeader): boolean {
    if (header == TaskHeader.Actions) return false;
    return true;
}

export enum Order {
    Asc, Desc
}

function orderFactor(order: Order): number {
    if (order == Order.Asc) return 1;
    return -1;
}

function alphaNumericSort(a: number | string, b: number | string, order: Order): number {
    // convert string values to lowercase to ensure capitalization doesn't effect sorting
    if (typeof(a) === "string") a = a.toLowerCase();
    if (typeof(b) === "string") b = b.toLowerCase();
    if (a > b) return orderFactor(order);
    else if (a < b) return -orderFactor(order);
    else return 0;
}

function statusSort(a: Task, b: Task, order: Order): number {
    if (a.status == b.status) return 0;
    if (a.status.toLowerCase() == TaskStatus.ToDo.toLowerCase()) return -orderFactor(order)
    if (b.status.toLowerCase() == TaskStatus.ToDo.toLowerCase()) return orderFactor(order)
    if (a.status.toLowerCase() == TaskStatus.Complete.toLowerCase()) return orderFactor(order)
    if (b.status.toLowerCase() == TaskStatus.Complete.toLowerCase()) return -orderFactor(order)
    return 0;
}

function prioritySort(a: Task, b: Task, order: Order): number {
    if (a.priority == b.priority) return 0;
    if (a.priority.toLowerCase() == TaskPriority.Low.toLowerCase()) return -orderFactor(order)
    if (b.priority.toLowerCase() == TaskPriority.Low.toLowerCase()) return orderFactor(order)
    if (a.priority.toLowerCase() == TaskPriority.High.toLowerCase()) return orderFactor(order)
    if (b.priority.toLowerCase() == TaskPriority.High.toLowerCase()) return -orderFactor(order)
    return 0;
}

function dateSort(a: Date, b: Date, order: Order): number {
    console.log("here");
    if (a > b) return orderFactor(order);
    else if (a < b) return -orderFactor(order);
    else return 0;
}