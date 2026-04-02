import { Repository } from "../repository.js";
import { Task } from "../tasks/Task.js";
export declare class TaskRepository extends Repository<TaskRepository> {
    private static _instance;
    static get Instance(): TaskRepository;
    constructor();
    createTable(): void;
    /** Add a new task to the database */
    createTask(newTask: Task, callback: (result: boolean) => void): void;
    /** Retrieve all tasks from the database which were created by the provided user */
    getAllTasksForUser(user: string, callback: (result: boolean, tasks: Task[]) => void): void;
    updateTask(task: Task, callback: (result: boolean) => void): void;
    /** Remove the task with the given ID from the database */
    deleteTask(taskID: number, callback: (result: boolean) => void): void;
}
//# sourceMappingURL=TaskRepository.d.ts.map