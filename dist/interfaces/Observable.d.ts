export interface IObservable<E> {
    _observers: ((event: E) => void)[];
    subscribe(callback: (event: E) => void): void;
    unsubscribe(callback: (event: E) => void): void;
    notify(event: E): void;
}
export declare abstract class Observable<E> implements IObservable<E> {
    _observers: ((event: E) => void)[];
    subscribe(callback: (event: E) => void): void;
    unsubscribe(callback: (event: E) => void): void;
    notify(event: E): void;
}
//# sourceMappingURL=Observable.d.ts.map