export declare class Task {
    id: number | undefined;
    title: string;
    description: string;
    createdDate: Date;
    dueDate: Date;
    status: TaskStatus;
    priority: TaskPriority;
    user: string;
    constructor(title: string, description: string, dueDate: Date, priority: TaskPriority, user: string);
}
export declare enum TaskStatus {
    ToDo = "To do",
    InProgress = "In Progress",
    Complete = "Complete"
}
export declare enum TaskPriority {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}
//# sourceMappingURL=Task.d.ts.map