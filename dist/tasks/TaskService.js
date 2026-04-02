import { Task, TaskPriority } from "../../dist/tasks/Task.js";
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
    /** Create a new task and add it to the database */
    createNewTask(title, description, due, priority, callback) {
        const user = this.getUser();
        if (user == undefined) {
            callback(false, undefined);
            return;
        }
        console.log(new Date(due));
        const newTask = new Task(title, description, new Date(due), priority, user);
        repo.createTask(newTask, (r) => callback(r, newTask));
    }
    /** Get all of the tasks for the current user */
    getAllTasks(callback) {
        const user = this.getUser();
        if (user == undefined) {
            callback(false, []);
            return;
        }
        repo.getAllTasksForUser(user, callback);
    }
    editTask(task, callback) {
        repo.updateTask(task, callback);
    }
    /** Remove a task from the database */
    deleteTask(task, callback) {
        if (task.id == undefined) {
            callback(false);
            return;
        }
        const taskID = task.id;
        repo.deleteTask(taskID, callback);
    }
    /** Try to get the username for the current user; print an error if undefined and return the result */
    getUser() {
        const username = logService.getCurrentUser();
        if (username == undefined) {
            console.log("Error! You must be logged in to create a task.");
        }
        return username;
    }
}
//# sourceMappingURL=TaskService.js.map