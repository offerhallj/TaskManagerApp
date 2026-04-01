import { Task, TaskPriority, TaskStatus } from "../../dist/tasks/Task.js";
import { TaskRepository } from "../../dist/tasks/TaskRepository.js";

const repo = TaskRepository.Instance;

export class TaskService {
    private static _instance: TaskService;

    static get Instance(): TaskService { 
        if (TaskService._instance == null) TaskService._instance = new TaskService();
        return TaskService._instance;
    }

    public createNewTask(title: string, description: string, due: string, priority: string, callback: (result: boolean) => void) {
        const newTask = new Task(title, description, new Date(due), <TaskPriority> priority);
        repo.createTask(newTask, callback);
    }
}