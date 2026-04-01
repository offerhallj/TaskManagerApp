export class Task {
    public id: number | undefined;
    public title: string = "";
    public description: string = "";
    public createdDate: Date = new Date();
    public dueDate: Date | undefined;
    public status: TaskStatus = TaskStatus.NotStarted;

    constructor(title: string, description: string, dueDate: Date) {
        title = title;
        description = description;
        dueDate = dueDate;
    }
}

export enum TaskStatus {
    NotStarted, InProgress, Complete
}