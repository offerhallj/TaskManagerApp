export class Task {
    // todo: implement subtasks as a task[] array; create a taskparent column in the database
    constructor(title, description, dueDate, priority, user, tags) {
        this.id = -1;
        this.title = "";
        this.description = "";
        this.createdDate = new Date();
        this.dueDate = new Date();
        this.status = TaskStatus.ToDo;
        this.priority = TaskPriority.Low;
        this.user = "";
        this.tags = "";
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
    get formattedDueDate() {
        return this.getDateAsString(this.dueDate);
    }
    get formattedCreatedDate() {
        return this.getDateAsString(this.createdDate);
    }
    getDateAsString(date) {
        const year = String(date.getFullYear()).padStart(4, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    get isOverdue() {
        const date = new Date();
        if (date.getFullYear() < this.dueDate.getFullYear())
            return false;
        if (date.getMonth() < this.dueDate.getMonth())
            return false;
        if (date.getDate() <= this.dueDate.getDate())
            return false;
        return true;
    }
    get isDueToday() {
        const date = new Date();
        if (date.getFullYear() != this.dueDate.getFullYear())
            return false;
        if (date.getMonth() != this.dueDate.getMonth())
            return false;
        if (date.getDate() != this.dueDate.getDate())
            return false;
        return true;
    }
    getTagList() {
        return this.tags.split(",");
    }
    setTagList(...tags) {
        this.tags = "";
        for (let tag of tags) {
            this.tags += `tag,`;
        }
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