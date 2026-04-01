import { Repository } from "../../dist/repository.js";
import { Task } from "../../dist/tasks/Task.js";

const TASK_TABLE = "task_table"

export class TaskRepository extends Repository<TaskRepository> {
    private static _instance: TaskRepository;

    static get Instance(): TaskRepository { 
        if (TaskRepository._instance == null) TaskRepository._instance = new TaskRepository();
        return TaskRepository._instance;
    }

    constructor() {
        super();
        this.openDatabase(TASK_TABLE, 1);
    }

    createTable(callback: () => void): void {
        const table = this._db?.createObjectStore(TASK_TABLE, { keyPath: "id", autoIncrement:true});
        table?.createIndex("title", "title", { unique: false});
        table?.createIndex("description", "description", { unique: false});
        table?.createIndex("createdDate", "createdDate", { unique: false});
        table?.createIndex("dueDate", "dueDate", { unique: false});
        table?.createIndex("status", "status", { unique: false});
        table?.createIndex("priority", "priority", { unique: false});
        table?.createIndex("user", "user", { unique: false});
        callback();
    }

    public createTask(newTask: Task, callback: (result: boolean) => void) {
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.createTask(newTask, callback));
            return;
        }

        // perform the database transaction
        const transaction = this._db?.transaction([TASK_TABLE], "readwrite");
        const objectStore = transaction?.objectStore(TASK_TABLE);
        const query = objectStore?.add(newTask);
        
        query?.addEventListener("success", () => {
            callback(true);
        });

        query?.addEventListener("error", () => {
            callback(false);
        })
    }
}