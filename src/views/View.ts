import { TaskDisplayType } from "../task_elements/TaskElementFactory.js";
import { TaskDetail } from "../task_elements/TaskDetail.js";
import { TaskStatus, TaskPriority } from "../tasks/Task.js";
import { Order } from "../utils/TaskSorter.js";

// I referenced this post to initiaize the map with initial values
// https://stackoverflow.com/questions/41769955/initialize-a-map-containing-arrays-in-typescript
/** Saves the sorting and filtering preferences of the task table */
export class View {
    public id: number | undefined;
    public user: string = "";
    public title: string = "Dashboard";

    public statusFilters: Map<TaskStatus, boolean> = new Map<TaskStatus, boolean>([
        [TaskStatus.InProgress, true],
        [TaskStatus.Complete, true],
        [TaskStatus.ToDo, true]
    ]);

    public priorityFilters: Map<TaskPriority, boolean> = new Map<TaskPriority, boolean>([
        [TaskPriority.High, true],
        [TaskPriority.Medium, true],
        [TaskPriority.Low, true]
    ]);

    public sortHeader: TaskDetail = TaskDetail.CreatedDate;
    public sortOrder: Order = Order.Desc;

    public searchFilter: TaskDetail = TaskDetail.Title;
    public searchValue: string = "";

    public displayType: TaskDisplayType = TaskDisplayType.Basic;

    public isChanged: boolean = false;

    /** Create a new View from and existing View */
    static newFromExistingView(view: View): View {
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
        if (todo != undefined) newView.statusFilters.set(TaskStatus.ToDo, todo);
        if (prog != undefined) newView.statusFilters.set(TaskStatus.InProgress, prog);
        if (comp != undefined) newView.statusFilters.set(TaskStatus.Complete, comp);

        let low = view.priorityFilters.get(TaskPriority.Low);
        let mid = view.priorityFilters.get(TaskPriority.Medium);
        let hi = view.priorityFilters.get(TaskPriority.High);
        if (low != undefined) newView.priorityFilters.set(TaskPriority.Low, low);
        if (mid != undefined) newView.priorityFilters.set(TaskPriority.Medium, mid);
        if (hi != undefined) newView.priorityFilters.set(TaskPriority.High, hi);

        return newView;
    }
}
