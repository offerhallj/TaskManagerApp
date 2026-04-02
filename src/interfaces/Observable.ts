export interface IObservable<E> {
    _observers: ((event: E) => void)[];
    subscribe(callback: (event: E) => void): void;
    unsubscribe(callback: (event: E) => void): void;
    notify(event: E): void;
}

// since most implementations of IObservable are going to use the same code, I've decided to
// implement an abstract class with the functionality already defined so i don't have to write it
// everytime I use the interface;
// however, I've still kept it as an interface as well so it can be implemented on classes which might
// already inherit
export abstract class Observable<E> implements IObservable<E> {
    _observers: ((event: E) => void)[] = [];

    subscribe(callback: (event: E) => void): void {
        this._observers.push(callback);
    }

    unsubscribe(callback: (event: E) => void): void {
        const index = this._observers.indexOf(callback);
        if (index >= 0) this._observers.splice(index, 1);
    }

    notify(event: E): void {
        for(let fun of this._observers) fun(event);
    }
}
