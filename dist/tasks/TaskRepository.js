import { Repository } from "../repository.js";
import { Task } from "../tasks/Task.js";
const TASK_TABLE = "task_table";
export class TaskRepository extends Repository {
    static get Instance() {
        if (TaskRepository._instance == null)
            TaskRepository._instance = new TaskRepository();
        return TaskRepository._instance;
    }
    constructor() {
        super();
        this.openDatabase(TASK_TABLE, 1);
    }
    createTable() {
        const table = this._db?.createObjectStore(TASK_TABLE, { keyPath: "id", autoIncrement: true });
        table?.createIndex("title", "title", { unique: false });
        table?.createIndex("description", "description", { unique: false });
        table?.createIndex("createdDate", "createdDate", { unique: false });
        table?.createIndex("dueDate", "dueDate", { unique: false });
        table?.createIndex("status", "status", { unique: false });
        table?.createIndex("priority", "priority", { unique: false });
        table?.createIndex("user", "user", { unique: false });
        table?.createIndex("tags", "tags", { unique: false });
    }
    /** Add a new task to the database */
    createTask(newTask, callback) {
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.createTask(newTask, callback));
            return;
        }
        // perform the database transaction
        const objectStore = this.getObjectStore(TASK_TABLE, "readwrite");
        const query = objectStore?.add(newTask);
        query?.addEventListener("success", () => {
            console.log(query.result);
            callback(true, parseInt(query.result.toString()));
        });
        query?.addEventListener("error", () => {
            callback(false, -1);
        });
    }
    /** Retrieve the task with the given ID if the user matches the task user */
    getTask(id, user, callback) {
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.getTask(id, user, callback));
            return;
        }
        const objectStore = this.getObjectStore(TASK_TABLE, "readonly");
        const query = objectStore?.get(id);
        query?.addEventListener("success", () => {
            const newTask = this.createTaskFromAny(query.result, user);
            callback(newTask != undefined, newTask);
        });
        query?.addEventListener("error", () => {
            callback(false, undefined);
        });
    }
    // I used this article to figure out how to use cursors in indexedDB to iterate over the table
    // https://medium.com/@kamresh485/a-comprehensive-guide-to-cursors-in-indexeddb-navigating-and-manipulating-data-with-ease-2793a2e01ba3
    /** Retrieve all tasks from the database which were created by the provided user */
    getAllTasksForUser(user, callback) {
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.getAllTasksForUser(user, callback));
            return;
        }
        const objectStore = this.getObjectStore(TASK_TABLE, "readonly");
        const cursorRequest = objectStore?.openCursor();
        const tasks = [];
        cursorRequest?.addEventListener("success", (e) => {
            const cursor = e.target.result;
            if (cursor) {
                // I used copilot to help revise this code after I experienced a bug which was being caused by
                // casing cursor.value as a Task rather than explicitly creating a new task. I had assumed
                // those would operate in the same way but apparently using const task = cursor.value as Task
                // only creates a data object which doesn't contain any of Task's functions.
                // I ultimately went with a slightly different method from what it suggested
                // https://copilot.microsoft.com/shares/uyZawt3i8e5dBe4neqFcv
                const newTask = this.createTaskFromAny(cursor.value, user);
                if (newTask != undefined)
                    tasks.push(newTask);
                cursor.continue();
                return;
            }
            callback(true, tasks);
        });
    }
    createTaskFromAny(result, user) {
        const task = result;
        if (task != undefined && task.user == user) {
            const newTask = new Task(task.title, task.description, task.dueDate, task.priority, task.user, task.tags);
            newTask.createdDate = task.createdDate;
            newTask.priority = task.priority;
            newTask.id = task.id;
            return newTask;
        }
    }
    // I referenced this post on stackoverflow to implement the update method
    // https://stackoverflow.com/questions/11217309/how-do-i-update-data-in-indexeddb
    updateTask(task, callback) {
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.updateTask(task, callback));
            return;
        }
        const objectStore = this.getObjectStore(TASK_TABLE, "readwrite");
        const request = objectStore?.put(task);
        request?.addEventListener("success", () => {
            callback(true);
        });
        request?.addEventListener("error", () => {
            callback(false);
        });
    }
    /** Remove the task with the given ID from the database */
    deleteTask(taskID, callback) {
        const objectStore = this.getObjectStore(TASK_TABLE, "readwrite");
        const query = objectStore?.delete(taskID);
        query?.addEventListener("success", () => {
            callback(true);
        });
        query?.addEventListener("error", () => {
            callback(false);
        });
    }
}
//# sourceMappingURL=TaskRepository.js.map