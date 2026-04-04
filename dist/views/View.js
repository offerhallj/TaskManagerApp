import { TaskDisplayType } from "../task_elements/TaskElementFactory.js";
import { TaskDetail } from "../task_elements/TaskDetail.js";
import { TaskStatus, TaskPriority } from "../tasks/Task.js";
import { Order } from "../utils/TaskSorter.js";
// I referenced this post to initiaize the map with initial values
// https://stackoverflow.com/questions/41769955/initialize-a-map-containing-arrays-in-typescript
/** Saves the sorting and filtering preferences of the task table */
export class View {
    constructor() {
        this.user = "";
        this.title = "Dashboard";
        this.statusFilters = new Map([
            [TaskStatus.InProgress, true],
            [TaskStatus.Complete, true],
            [TaskStatus.ToDo, true]
        ]);
        this.priorityFilters = new Map([
            [TaskPriority.High, true],
            [TaskPriority.Medium, true],
            [TaskPriority.Low, true]
        ]);
        this.sortHeader = TaskDetail.CreatedDate;
        this.sortOrder = Order.Desc;
        this.searchFilter = TaskDetail.Title;
        this.searchValue = "";
        this.displayType = TaskDisplayType.Basic;
        this.isChanged = false;
    }
    static newFromExistingView(view) {
        let newView = new View();
        newView.user = view.user;
        newView.title = view.title;
        newView.sortHeader = view.sortHeader;
        newView.sortOrder = view.sortOrder;
        newView.searchFilter = view.searchFilter;
        newView.searchValue = view.searchValue;
        newView.displayType = view.displayType;
        let todo = view.statusFilters.get(TaskStatus.ToDo);
        let prog = view.statusFilters.get(TaskStatus.InProgress);
        let comp = view.statusFilters.get(TaskStatus.Complete);
        if (todo != undefined)
            newView.statusFilters.set(TaskStatus.ToDo, todo);
        if (prog != undefined)
            newView.statusFilters.set(TaskStatus.InProgress, prog);
        if (comp != undefined)
            newView.statusFilters.set(TaskStatus.Complete, comp);
        let low = view.priorityFilters.get(TaskPriority.Low);
        let mid = view.priorityFilters.get(TaskPriority.Medium);
        let hi = view.priorityFilters.get(TaskPriority.High);
        if (low != undefined)
            newView.priorityFilters.set(TaskPriority.Low, low);
        if (mid != undefined)
            newView.priorityFilters.set(TaskPriority.Medium, mid);
        if (hi != undefined)
            newView.priorityFilters.set(TaskPriority.High, hi);
        return newView;
    }
}
//# sourceMappingURL=View.js.map