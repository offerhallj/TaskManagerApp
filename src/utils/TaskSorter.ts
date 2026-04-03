import { TaskPriority, TaskStatus, Task } from "../tasks/Task";
import { TaskElement } from "../task_elements/TaskElement";
import { TaskHeader } from "../task_tables/TaskHeader";

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
        case TaskHeader.CreatedDate:
        case TaskHeader.DueDate:
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
    if (a > b) return orderFactor(order);
    else return -orderFactor(order);
}

function statusSort(a: Task, b: Task, order: Order): number {
    if (a.status == b.status) return alphaNumericSort(a.title, b.title, order);
    if (a.status == TaskStatus.ToDo) return -orderFactor(order)
    if (b.status == TaskStatus.ToDo) return orderFactor(order)
    if (a.status == TaskStatus.Complete) return orderFactor(order)
    return -orderFactor(order)
}