import { LoginService } from "../login/LoginService.js";
import { TaskRepository } from "./TaskRepository.js";
import { Task, TaskPriority } from "./Task.js";
import { SESSION_TASK_KEY } from "../global.js";
const repo = TaskRepository.Instance;
const logService = LoginService.Instance;
export class TaskService {
    static get Instance() {
        if (TaskService._instance == null)
            TaskService._instance = new TaskService();
        return TaskService._instance;
    }
    /** Create a new task and add it to the database */
    createNewTask(title, description, due, priority, tags, callback) {
        const user = this.getUser();
        if (user == undefined) {
            callback(false, undefined);
            return;
        }
        const newTask = new Task(title, description, this.getDate(due), priority, user, tags);
        repo.createTask(newTask, (r, id) => {
            newTask.id = id;
            callback(r, newTask);
        });
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
    getTask(id, callback) {
        const user = this.getUser();
        if (user == undefined) {
            callback(false, undefined);
            return;
        }
        repo.getTask(id, user, callback);
    }
    editTask(id, title, description, due, priority, user, tags, callback) {
        const task = new Task(title, description, this.getDate(due), priority, user, tags);
        task.id = id;
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
    // I've implemented this method because I had a lot of issues with the way dates were converting to and from string values
    // basically the timezone kept changing which kept throwing off the dates, so I'm creating a new date without an input
    // to ensure it's local time, and then setting the oher values manually
    getDate(dateString) {
        const dateVals = dateString.split("-");
        let date = new Date();
        if (dateVals == undefined)
            date;
        date.setFullYear(parseInt(dateVals[0] != undefined ? dateVals[0] : "2000"));
        date.setMonth(parseInt(dateVals[1] != undefined ? dateVals[1] : "01") - 1);
        date.setDate(parseInt(dateVals[2] != undefined ? dateVals[2] : "01"));
        return date;
    }
}
//# sourceMappingURL=TaskService.js.map