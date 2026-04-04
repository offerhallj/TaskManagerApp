import { ViewHolder } from "../views/ViewHolder.js";
import { ViewService } from "./ViewService.js";
import { View } from "./View.js";
const viewHolder = ViewHolder.Instance;
const viewService = ViewService.Instance;
viewHolder.subscribe(onNewView);
let viewsList = [];
function getAllViewsForUser() {
    viewService.getAllViewsForUser((r, msg, views) => {
        if (!r) {
            console.log(msg);
            return;
        }
        console.log(views);
        viewsList = views;
        drawViewOptions();
        if (viewsList[0] != undefined)
            viewHolder.setView(viewsList[0]);
    });
}
function drawViewOptions() {
    viewContainerNav.innerHTML = "";
    for (let view of viewsList) {
        const li = document.createElement("li");
        li.textContent = view.title;
        viewContainerNav.appendChild(li);
    }
}
function createNewView() {
    viewService.createView(viewHolder.view, (r, v) => {
        if (!r || v == undefined) {
            console.log("Error: View could not be created");
            return;
        }
        viewHolder.setView(v);
        viewsList.push(v);
        drawViewOptions();
    });
}
function saveCurrentView() {
}
function onNewView(view) {
    viewTitle.textContent = view.title;
}
document.getElementById("save-view")?.addEventListener("click", saveCurrentView);
document.getElementById("new-view")?.addEventListener("click", createNewView);
const viewContainerNav = document.getElementById("views-nav");
const viewTitle = document.getElementById("view-title");
getAllViewsForUser();
//# sourceMappingURL=views.js.map