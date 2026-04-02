import { Task } from "../../dist/tasks/Task.js";
export declare class TaskService {
    private static _instance;
    static get Instance(): TaskService;
    /** Create a new task and add it to the database */
    createNewTask(title: string, description: string, due: string, priority: string, callback: (result: boolean, newTask: Task | undefined) => void): void;
    /** Get all of the tasks for the current user */
    getAllTasks(callback: (result: boolean, tasks: Task[]) => void): void;
    editTask(task: Task, callback: (result: boolean) => void): void;
    /** Remove a task from the database */
    deleteTask(task: Task, callback: (result: boolean) => void): void;
    /** Try to get the username for the current user; print an error if undefined and return the result */
    private getUser;
}
//# sourceMappingURL=TaskService.d.ts.map