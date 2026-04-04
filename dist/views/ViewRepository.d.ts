import { Repository } from "../repository.js";
import { View } from "./View.js";
export declare class ViewRepository extends Repository<ViewRepository> {
    constructor();
    createTable(): void;
    createView(view: View, callback: (result: boolean, view: View | undefined) => void): void;
    saveView(view: View, callback: (r: boolean, msg: string) => void): void;
    getAllViewsForUser(user: string, callback: (result: boolean, msg: string, views: View[]) => void): void;
    deleteView(id: number, callback: (result: boolean, msg: string) => void): void;
    private createViewFromAny;
}
//# sourceMappingURL=ViewRepository.d.ts.map