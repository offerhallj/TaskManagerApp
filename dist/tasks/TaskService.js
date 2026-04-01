import { Task, TaskPriority, TaskStatus } from "../../dist/tasks/Task.js";
import { TaskRepository } from "../../dist/tasks/TaskRepository.js";
import { LoginService } from "../../dist/login/LoginService.js";
const repo = TaskRepository.Instance;
const logService = LoginService.Instance;
export class TaskService {
    static get Instance() {
        if (TaskService._instance == null)
            TaskService._instance = new TaskService();
        return TaskService._instance;
    }
    createNewTask(title, description, due, priority, callback) {
        const username = logService.getCurrentUser();
        if (username == undefined) {
            console.log("Error! You must be logged in to create a task.");
            callback(false);
            return;
        }
        const newTask = new Task(title, description, new Date(due), priority, username);
        repo.createTask(newTask, callback);
    }
}
//# sourceMappingURL=TaskService.js.map