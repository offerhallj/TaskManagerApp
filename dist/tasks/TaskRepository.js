import { Repository } from "../../dist/repository.js";
import { Task } from "../../dist/tasks/Task.js";
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
    createTable(callback) {
        var _a;
        const table = (_a = this._db) === null || _a === void 0 ? void 0 : _a.createObjectStore(TASK_TABLE, { keyPath: "id", autoIncrement: true });
        table === null || table === void 0 ? void 0 : table.createIndex("title", "title", { unique: false });
        table === null || table === void 0 ? void 0 : table.createIndex("description", "description", { unique: false });
        table === null || table === void 0 ? void 0 : table.createIndex("createdDate", "createdDate", { unique: false });
        table === null || table === void 0 ? void 0 : table.createIndex("dueDate", "dueDate", { unique: false });
        table === null || table === void 0 ? void 0 : table.createIndex("status", "status", { unique: false });
        table === null || table === void 0 ? void 0 : table.createIndex("priority", "priority", { unique: false });
        table === null || table === void 0 ? void 0 : table.createIndex("user", "user", { unique: false });
        callback();
    }
    createTask(newTask, callback) {
        var _a;
        if (!this._dbIsOpen) {
            this._delayedExecution.push(() => this.createTask(newTask, callback));
            return;
        }
        // perform the database transaction
        const transaction = (_a = this._db) === null || _a === void 0 ? void 0 : _a.transaction([TASK_TABLE], "readwrite");
        const objectStore = transaction === null || transaction === void 0 ? void 0 : transaction.objectStore(TASK_TABLE);
        const query = objectStore === null || objectStore === void 0 ? void 0 : objectStore.add(newTask);
        query === null || query === void 0 ? void 0 : query.addEventListener("success", () => {
            callback(true);
        });
        query === null || query === void 0 ? void 0 : query.addEventListener("error", () => {
            callback(false);
        });
    }
}
//# sourceMappingURL=TaskRepository.js.map