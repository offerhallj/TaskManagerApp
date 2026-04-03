import { ViewHolder } from "../views/ViewHolder.js";
import { ViewService } from "./ViewService.js";
const viewHolder = ViewHolder.Instance;
const viewService = ViewService.Instance;

document.getElementById("save-view")?.addEventListener("click", () => { 
    viewService.createView(viewHolder.view, (r, v) => {
        console.log(r);
        if (v != undefined) viewHolder.setView(v);
    })
});