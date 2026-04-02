import { Observable } from "../interfaces/Observable.js";
import { Task } from "./Task.js";

export class TaskViewModel extends Observable<TaskUpdateEvent> {
    private static _instance: TaskViewModel;
    static get Instance(): TaskViewModel {
        if (TaskViewModel._instance == null) TaskViewModel._instance = new TaskViewModel();
        return TaskViewModel._instance;
    }

    private _tasks: Task[] = [];
    private _selectedTask: Task | undefined;

    public setTasks(tasks: Task[]) {
        this._tasks = tasks;
        this.notify(TaskUpdateEvent.NewTaskList);
    }

    public setSelectedTask(task: Task) {
        this._selectedTask = task;
        this.notify(TaskUpdateEvent.NewSelectedTask);
    }

    public deleteTask(task: Task) {
        
    }
}

export enum TaskUpdateEvent {
    NewTaskList, NewSelectedTask, DeletedTask
}