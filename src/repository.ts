export abstract class Repository<T> {
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

    protected openDatabase(table: string, version: number) {
        const request = window.indexedDB.open(table, version);

        request.addEventListener("error", () => {
            console.log(`Could not open ${table}`);
            }
        );

        request.addEventListener("success", () => {
            console.log(`Successfully opened ${table}`);    
            this._db = request.result;
            this._dbIsOpen = true;
            this.perfomDelayedExecution();
            }
        );

        // I was having an issue getting result from the EventTarget; 
        // after doing a bit of post I found this article that said to typecast it
        // https://stackoverflow.com/questions/75953640/how-to-get-event-target-result-in-javascript-indexdb-typescript-working
        request.addEventListener("upgradeneeded", init => {
            this._db = (init.target as IDBOpenDBRequest).result;
    
            this._db.onerror = () => {
                console.error('Error loading database.');
            };

            this.createTable();
        });
    }

    /** Get the objectstore for the provided table using the provided transaction method */
    protected getObjectStore(table: string, method: IDBTransactionMode): IDBObjectStore | undefined {
        const transaction = this._db?.transaction([table], method);
        return transaction?.objectStore(table); 
    }

    abstract createTable(): void;
}
