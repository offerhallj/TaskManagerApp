import { TaskPriority, TaskStatus, Task } from "../tasks/Task";
import { TaskElement } from "../task_elements/TaskElement";
import { TaskHeader } from "../task_tables/TaskHeader";
export function sort(header, elements, order = Order.Asc) {
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
export function canSort(header) {
    if (header == TaskHeader.Actions)
        return false;
    return true;
}
export var Order;
(function (Order) {
    Order[Order["Asc"] = 0] = "Asc";
    Order[Order["Desc"] = 1] = "Desc";
})(Order || (Order = {}));
function orderFactor(order) {
    if (order == Order.Asc)
        return 1;
    return -1;
}
function alphaNumericSort(a, b, order) {
    if (a > b)
        return orderFactor(order);
    else
        return -orderFactor(order);
}
function statusSort(a, b, order) {
    if (a.status == b.status)
        return alphaNumericSort(a.title, b.title, order);
    if (a.status == TaskStatus.ToDo)
        return -orderFactor(order);
    if (b.status == TaskStatus.ToDo)
        return orderFactor(order);
    if (a.status == TaskStatus.Complete)
        return orderFactor(order);
    return -orderFactor(order);
}
//# sourceMappingURL=TaskSorter.js.map