import { Singleton } from "../dist/singleton.js";
export class Repository extends Singleton {
    constructor() {
        super(...arguments);
        this._dbIsOpen = false;
        /** If a database function is called before the database is open, add the function to this list and invoke it once the database is opened */
        this._delayedExecution = [];
    }
    /** Execute any functions which were delayed due to the database not being open at the time the function was called */
    perfomDelayedExecution() {
        for (let fun of this._delayedExecution) {
            fun();
        }
        this._delayedExecution.splice(0, this._delayedExecution.length - 1);
    }
}
//# sourceMappingURL=repository.js.map