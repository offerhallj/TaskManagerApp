export interface IObservable<T, E> {
    _observers: ((result: T, event: E) => void)[];
    subscribe(callback: (result: T, event: E) => void): void;
    unsubscribe(callback: (result: T, event: E) => void): void;
    notify(value: T, event: E): void;
}

// since most implementations of IObservable are going to use the same code, I've decided to
// implement an abstract class with the functionality already defined so i don't have to write it
// everytime I use the interface;
// however, I've still kept it as an interface as well so it can be implemented on classes which might
// already inherit
export abstract class Observable<T, E> implements IObservable<T, E> {
    _observers: ((result: T, event: E) => void)[] = [];

    subscribe(callback: (result: T, event: E) => void): void {
        this._observers.push(callback);
    }

    unsubscribe(callback: (result: T, event: E) => void): void {
        const index = this._observers.indexOf(callback);
        if (index >= 0) this._observers.splice(index, 1);
    }

    notify(value: T, event: E): void {
        for(let fun of this._observers) fun(value, event);
    }
}
