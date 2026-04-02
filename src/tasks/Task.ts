export class Task {
    public id: number | undefined;
    public title: string = "";
    public description: string = "";
    public createdDate: Date = new Date();
    public dueDate: Date = new Date();
    public status: TaskStatus = TaskStatus.ToDo;
    public priority: TaskPriority = TaskPriority.Low;
    public user: string = "";
    public tags: string = "";

    // todo: implement subtasks as a task[] array; create a taskparent column in the database

    constructor(title: string, description: string, dueDate: Date, priority: TaskPriority, user: string, tags: string) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.user = user;
        this.tags = tags;
    }
 
    // I used this post to help convert the date
    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd

    // The above method had an unforeseen bug which was recording dates in different timezones
    // I decided to format this manually and used this post to figure out the zero padding
    // https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
    public get formattedDueDate(): string {
        return this.getDateAsString(this.dueDate);
    }

    public get formattedCreatedDate(): string {
        return this.getDateAsString(this.createdDate);
    }

    private getDateAsString(date: Date): string {
        const year = String(date.getFullYear()).padStart(4, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    public get isOverdue(): boolean {
        return new Date() > this.dueDate;
    }

    public getTagList(): string[] {
        return this.tags.split(",");
    }

    public setTagList(...tags: string[]) {
        this.tags = "";
        for(let tag of tags) {
            this.tags += `tag,`;
        }
    }
}

export enum TaskStatus {
    ToDo = "To do", InProgress = "In Progress", Complete = "Complete"
}

export enum TaskPriority {
    Low = "Low", Medium = "Medium", High = "High"
}