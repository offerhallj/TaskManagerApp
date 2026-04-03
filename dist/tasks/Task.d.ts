export declare class Task {
    id: number;
    title: string;
    description: string;
    createdDate: Date;
    dueDate: Date;
    status: TaskStatus;
    priority: TaskPriority;
    user: string;
    tags: string;
    constructor(title: string, description: string, dueDate: Date, priority: TaskPriority, user: string, tags: string);
    get formattedDueDate(): string;
    get formattedCreatedDate(): string;
    private getDateAsString;
    get isOverdue(): boolean;
    get isDueToday(): boolean;
    getTagList(): string[];
    setTagList(...tags: string[]): void;
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