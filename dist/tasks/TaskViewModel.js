import { Observable } from "../../dist/interfaces/Observable.js";
import { Task } from "../../dist/tasks/Task.js";
export class TaskViewModel extends Observable {
    constructor() {
        super(...arguments);
        this._tasks = [];
    }
    setTasks(tasks) {
        this._tasks = tasks;
        this.notify(this, TaskUpdateEvent.NewTaskList);
    }
    setSelectedTask(task) {
        this._selectedTask = task;
        this.notify(this, TaskUpdateEvent.NewSelectedTask);
    }
}
export var TaskUpdateEvent;
(function (TaskUpdateEvent) {
    TaskUpdateEvent[TaskUpdateEvent["NewTaskList"] = 0] = "NewTaskList";
    TaskUpdateEvent[TaskUpdateEvent["NewSelectedTask"] = 1] = "NewSelectedTask";
})(TaskUpdateEvent || (TaskUpdateEvent = {}));
//# sourceMappingURL=TaskViewModel.js.map