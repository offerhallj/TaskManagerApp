import { Observable } from "../../dist/interfaces/Observable.js";
import { Task } from "../../dist/tasks/Task.js";

export class TaskViewModel extends Observable<TaskViewModel, TaskUpdateEvent> {
    private _tasks: Task[] = [];
    private _selectedTask: Task | undefined;

    public setTasks(tasks: Task[]) {
        this._tasks = tasks;
        this.notify(this, TaskUpdateEvent.NewTaskList);
    }

    public setSelectedTask(task: Task) {
        this._selectedTask = task;
        this.notify(this, TaskUpdateEvent.NewSelectedTask);
    }
}

export enum TaskUpdateEvent {
    NewTaskList, NewSelectedTask
}