export declare class Singleton<T> {
    private static _instance;
    static getInstance<T>(type: {
        new (): T;
    }): T;
}
//# sourceMappingURL=singleton.d.ts.map