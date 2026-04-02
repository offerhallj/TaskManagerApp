export class Task {
    public id: number | undefined;
    public title: string = "";
    public description: string = "";
    public createdDate: Date = new Date();
    public dueDate: Date = new Date();
    public status: TaskStatus = TaskStatus.ToDo;
    public priority: TaskPriority = TaskPriority.Low;
    public user: string = "";

    // todo: implement subtasks as a task[] array; create a taskparent column in the database

    constructor(title: string, description: string, dueDate: Date, priority: TaskPriority, user: string) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.user = user;
    }
 
    // I used this post to help convert the date
    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    public get formattedDueDate(): string {
        const formattedDate = this.dueDate.toISOString().split('T')[0];
        if (formattedDate != undefined) return  formattedDate;
        else return "";
    }

    public get formattedCreatedDate(): string {
        const formattedDate = this.createdDate.toISOString().split('T')[0];
        if (formattedDate != undefined) return  formattedDate;
        else return "";
    }

    public get isOverdue(): boolean {
        return new Date() > this.dueDate;
    }
}

export enum TaskStatus {
    ToDo = "To do", InProgress = "In Progress", Complete = "Complete"
}

export enum TaskPriority {
    Low = "Low", Medium = "Medium", High = "High"
}