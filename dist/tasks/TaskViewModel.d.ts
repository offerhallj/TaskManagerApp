import { Observable } from "../../dist/interfaces/Observable.js";
import { Task } from "../../dist/tasks/Task.js";
export declare class TaskViewModel extends Observable<TaskUpdateEvent> {
    private static _instance;
    static get Instance(): TaskViewModel;
    private _tasks;
    private _selectedTask;
    setTasks(tasks: Task[]): void;
    setSelectedTask(task: Task): void;
    deleteTask(task: Task): void;
}
export declare enum TaskUpdateEvent {
    NewTaskList = 0,
    NewSelectedTask = 1,
    DeletedTask = 2
}
//# sourceMappingURL=TaskViewModel.d.ts.map