export class Task {
    constructor(title, description, dueDate, priority, user) {
        this.title = "";
        this.description = "";
        this.createdDate = new Date();
        this.status = TaskStatus.ToDo;
        this.priority = TaskPriority.Low;
        this.user = "";
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.user = user;
    }
}
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["ToDo"] = 0] = "ToDo";
    TaskStatus[TaskStatus["InProgress"] = 1] = "InProgress";
    TaskStatus[TaskStatus["Complete"] = 2] = "Complete";
})(TaskStatus || (TaskStatus = {}));
export var TaskPriority;
(function (TaskPriority) {
    TaskPriority["Low"] = "Low";
    TaskPriority["Medium"] = "Medium";
    TaskPriority["High"] = "High";
})(TaskPriority || (TaskPriority = {}));
//# sourceMappingURL=Task.js.map