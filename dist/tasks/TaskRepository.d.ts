import { Repository } from "../../dist/repository.js";
import { Task } from "../../dist/tasks/Task.js";
export declare class TaskRepository extends Repository<TaskRepository> {
    private static _instance;
    static get Instance(): TaskRepository;
    constructor();
    createTable(callback: () => void): void;
    createTask(newTask: Task, callback: (result: boolean) => void): void;
}
//# sourceMappingURL=TaskRepository.d.ts.map