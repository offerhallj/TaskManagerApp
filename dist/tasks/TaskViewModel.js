import { Observable } from "../../dist/interfaces/Observable.js";
import { Task } from "../../dist/tasks/Task.js";
export class TaskViewModel extends Observable {
    constructor() {
        super(...arguments);
        this._tasks = [];
    }
    static get Instance() {
        if (TaskViewModel._instance == null)
            TaskViewModel._instance = new TaskViewModel();
        return TaskViewModel._instance;
    }
    setTasks(tasks) {
        this._tasks = tasks;
        this.notify(TaskUpdateEvent.NewTaskList);
    }
    setSelectedTask(task) {
        this._selectedTask = task;
        this.notify(TaskUpdateEvent.NewSelectedTask);
    }
    deleteTask(task) {
    }
}
export var TaskUpdateEvent;
(function (TaskUpdateEvent) {
    TaskUpdateEvent[TaskUpdateEvent["NewTaskList"] = 0] = "NewTaskList";
    TaskUpdateEvent[TaskUpdateEvent["NewSelectedTask"] = 1] = "NewSelectedTask";
    TaskUpdateEvent[TaskUpdateEvent["DeletedTask"] = 2] = "DeletedTask";
})(TaskUpdateEvent || (TaskUpdateEvent = {}));
//# sourceMappingURL=TaskViewModel.js.map