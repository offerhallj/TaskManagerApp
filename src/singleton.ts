export class Singleton<T> {
    private static _instance: any;

    // I used the following resource to show me how to create an instance of a generic class
    // https://stackoverflow.com/questions/17382143/create-a-new-object-from-type-parameter-in-generic-class
    static getInstance<T>(type: { new(): T }): T {
        if (!Singleton._instance) {
            Singleton._instance = new type;
        }

        return Singleton._instance;
    }
}