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

    /** Add a new task to the database */
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

    // I used this article to figure out how to use cursors in indexedDB to iterate over the table
    // https://medium.com/@kamresh485/a-comprehensive-guide-to-cursors-in-indexeddb-navigating-and-manipulating-data-with-ease-2793a2e01ba3
    public getAllTasksForUser(user: string, callback: (result: boolean, tasks: Task[]) => void) {
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.getAllTasksForUser(user, callback));
            return;
        }

        const objectStore = this.getObjectStore(TASK_TABLE, "readonly");
        const cursorRequest = objectStore?.openCursor();
        const tasks: Task[] = [];
    
        cursorRequest?.addEventListener("success", (e) => {
            const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
                const task: Task = cursor.value as Task;
                if (task != undefined && task.user == user) tasks.push(task);
                cursor.continue();
                return;
            }

            callback(true, tasks);
        });
    }
}