import type { UIElement } from "../../dist/interfaces/UIElement.js";
import { Task } from "../../dist/tasks/Task.js";

export abstract class TaskElement implements UIElement {
    public readonly Task: Task;
    protected _element: HTMLElement;
    
    protected edit!: ((element: TaskElement) => void);
    protected delete!: ((element: TaskElement) => void);
    public set onEdit(callback: (element: TaskElement) => void) { this.edit = callback; }
    public set onDelete(callback: (element: TaskElement) => void) { this.delete = callback; }


    constructor(task: Task) {
        this.Task = task;
        this._element = this.create();
    }

    public get Element() { return this._element; }

    abstract create(): HTMLElement;
}