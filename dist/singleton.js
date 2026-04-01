export class Singleton {
    // I used the following resource to show me how to create an instance of a generic class
    // https://stackoverflow.com/questions/17382143/create-a-new-object-from-type-parameter-in-generic-class
    static getInstance(type) {
        if (!Singleton._instance) {
            Singleton._instance = new type;
        }
        return Singleton._instance;
    }
}
//# sourceMappingURL=singleton.js.map