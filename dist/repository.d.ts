export declare abstract class Repository<T> {
    protected _db: IDBDatabase | undefined;
    protected _dbIsOpen: boolean;
    /** If a database function is called before the database is open, add the function to this list and invoke it once the database is opened */
    protected readonly _delayedExecution: (() => void)[];
    /** Execute any functions which were delayed due to the database not being open at the time the function was called */
    protected perfomDelayedExecution(): void;
    protected openDatabase(table: string, version: number): void;
    /** Get the objectstore for the provided table using the provided transaction method */
    protected getObjectStore(table: string, method: IDBTransactionMode): IDBObjectStore | undefined;
    abstract createTable(): void;
}
//# sourceMappingURL=repository.d.ts.map