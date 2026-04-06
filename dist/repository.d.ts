/** An abstract implementation for a repository class which connects to IndexedDB */
export declare abstract class Repository<T> {
    /** The database instance */
    protected _db: IDBDatabase | undefined;
    /** Indicates whether the database is accessible for queries */
    protected _dbIsOpen: boolean;
    /** If a database function is called before the database is open, add the function to this list and invoke it once the database is opened */
    protected readonly _delayedExecution: (() => void)[];
    /** Execute any functions which were delayed due to the database not being open at the time the function was called */
    protected perfomDelayedExecution(): void;
    /** Attempts to open the database; if the database does not exist, create one and call createTable() */
    protected openDatabase(table: string, version: number): void;
    /** Get the objectstore for the provided table using the provided transaction method */
    protected getObjectStore(table: string, method: IDBTransactionMode): IDBObjectStore | undefined;
    /** If the database is not open when a function is called in the repository,
     * add the function to the deleayedExecution list so it can be performed when the database is open */
    protected delayExecution(fun: () => void): boolean;
    /** Creates the table in the database for the given repository */
    abstract createTable(): void;
}
//# sourceMappingURL=repository.d.ts.map