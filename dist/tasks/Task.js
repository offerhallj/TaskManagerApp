export class Task {
    constructor(title, description, dueDate) {
        this.title = "";
        this.description = "";
        this.createdDate = new Date();
        this.status = TaskStatus.NotStarted;
        title = title;
        description = description;
        dueDate = dueDate;
    }
}
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["NotStarted"] = 0] = "NotStarted";
    TaskStatus[TaskStatus["InProgress"] = 1] = "InProgress";
    TaskStatus[TaskStatus["Complete"] = 2] = "Complete";
})(TaskStatus || (TaskStatus = {}));
//# sourceMappingURL=Task.js.map