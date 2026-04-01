export declare class Task {
    id: number | undefined;
    title: string;
    description: string;
    createdDate: Date;
    dueDate: Date | undefined;
    status: TaskStatus;
    constructor(title: string, description: string, dueDate: Date);
}
export declare enum TaskStatus {
    NotStarted = 0,
    Started = 1
}
//# sourceMappingURL=Task.d.ts.map