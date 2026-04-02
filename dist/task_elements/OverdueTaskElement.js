import { TaskElement } from "./TaskElement.js";
/** Create an overdue wrapper around the given task element */
export class OverdueTaskElement extends TaskElement {
    constructor(innerTaskElement) {
        super(innerTaskElement.Task);
        this._innerTaskElement = innerTaskElement;
        this.Element = this.create();
    }
    create() {
        console.log(this._innerTaskElement);
        const innerElement = this._innerTaskElement.Element;
        innerElement.classList.add("overdue");
        return innerElement;
    }
}
//# sourceMappingURL=OverdueTaskElement.js.map