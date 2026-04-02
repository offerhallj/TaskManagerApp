export class Task {
    // todo: implement subtasks as a task[] array; create a taskparent column in the database
    constructor(title, description, dueDate, priority, user) {
        this.title = "";
        this.description = "";
        this.createdDate = new Date();
        this.dueDate = new Date();
        this.status = TaskStatus.ToDo;
        this.priority = TaskPriority.Low;
        this.user = "";
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.user = user;
    }
    // I used this post to help convert the date
    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    get formattedDueDate() {
        const formattedDate = this.dueDate.toISOString().split('T')[0];
        if (formattedDate != undefined)
            return formattedDate;
        else
            return "";
    }
    get formattedCreatedDate() {
        const formattedDate = this.createdDate.toISOString().split('T')[0];
        if (formattedDate != undefined)
            return formattedDate;
        else
            return "";
    }
    get isOverdue() {
        return new Date() > this.dueDate;
    }
}
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus["ToDo"] = "To do";
    TaskStatus["InProgress"] = "In Progress";
    TaskStatus["Complete"] = "Complete";
})(TaskStatus || (TaskStatus = {}));
export var TaskPriority;
(function (TaskPriority) {
    TaskPriority["Low"] = "Low";
    TaskPriority["Medium"] = "Medium";
    TaskPriority["High"] = "High";
})(TaskPriority || (TaskPriority = {}));
//# sourceMappingURL=Task.js.map