export interface IObservable<T, E> {
    _observers: ((result: T, event: E) => void)[];
    subscribe(callback: (result: T, event: E) => void): void;
    unsubscribe(callback: (result: T, event: E) => void): void;
    notify(value: T, event: E): void;
}
export declare abstract class Observable<T, E> implements IObservable<T, E> {
    _observers: ((result: T, event: E) => void)[];
    subscribe(callback: (result: T, event: E) => void): void;
    unsubscribe(callback: (result: T, event: E) => void): void;
    notify(value: T, event: E): void;
}
//# sourceMappingURL=Observable.d.ts.map