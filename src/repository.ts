import { Singleton } from "../dist/singleton.js";

export abstract class Repository<T> extends Singleton<T> {
    protected _db: IDBDatabase | undefined;
    protected _dbIsOpen: boolean = false;

    /** If a database function is called before the database is open, add the function to this list and invoke it once the database is opened */
    protected readonly _delayedExecution: (() => void)[] = []; 

    /** Execute any functions which were delayed due to the database not being open at the time the function was called */
    protected perfomDelayedExecution() {
        for (let fun of this._delayedExecution) {
            fun();
        }

        this._delayedExecution.splice(0, this._delayedExecution.length - 1);
    }

}
