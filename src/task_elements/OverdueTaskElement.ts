import { TaskElement } from "./TaskElement.js";

/** Create an overdue wrapper around the given task element */
export class OverdueTaskElement extends TaskElement {
    private _innerTaskElement: TaskElement;

    constructor(innerTaskElement: TaskElement) {
        super(innerTaskElement.Task);
        this._innerTaskElement = innerTaskElement;
        this.Element = this.create();
    }

    create(): HTMLElement {
        const innerElement = this._innerTaskElement.Element;
        innerElement.classList.add("overdue");
        return innerElement;
    }
}