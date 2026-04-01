import { Task, TaskPriority, TaskStatus } from "../../dist/tasks/Task.js";
import { TaskRepository } from "../../dist/tasks/TaskRepository.js";
import { LoginService } from "../../dist/login/LoginService.js";

const repo = TaskRepository.Instance;
const logService = LoginService.Instance;

export class TaskService {
    private static _instance: TaskService;

    static get Instance(): TaskService { 
        if (TaskService._instance == null) TaskService._instance = new TaskService();
        return TaskService._instance;
    }

    public createNewTask(title: string, description: string, due: string, priority: string, callback: (result: boolean) => void) {
        const username = logService.getCurrentUser();
        if (username == undefined) {
            console.log("Error! You must be logged in to create a task.")
            callback(false);
            return;
        }

        const newTask = new Task(title, description, new Date(due), <TaskPriority> priority, username);

        repo.createTask(newTask, callback);
    }
}