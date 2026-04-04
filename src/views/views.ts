import { ViewHolder } from "../views/ViewHolder.js";
import { ViewService } from "./ViewService.js";
import { View } from "./View.js";

const viewHolder = ViewHolder.Instance;
const viewService = ViewService.Instance;
let activeView: HTMLElement | undefined = undefined;
viewHolder.subscribe(onNewView);

viewHolder.onViewIsChanged = (b) => updateViewTitle(b);

function updateViewTitle(isViewChanged: boolean) {
    if (isViewChanged) viewTitle.textContent = `${viewHolder.rView.title} *`;
    if (!isViewChanged) viewTitle.textContent = viewHolder.rView.title;
}

let viewsList: View[] = [];

function getAllViewsForUser() {
    viewService.getAllViewsForUser((r, msg, views) => {
        if (!r) { console.log(msg); return; }
        if (views == undefined || views.length == 0) {
            viewHolder.setView(new View());
            createNewView();
            return;
        }

        viewsList = views;
        drawViewOptions();
        if (viewsList[0] != undefined) {
            viewHolder.setView(viewsList[0]);
            let li: HTMLElement | null = viewContainerNav.querySelector("li:first-of-type");
            if (li != null) setActiveViewElement(li);
        }
    });
}

function drawViewOptions() {
    viewContainerNav.innerHTML = "";
    for(let view of viewsList) {
        const li = document.createElement("li");
        if (viewHolder.rView != undefined && viewHolder.rView.title == view.title) setActiveViewElement(li);
        li.textContent = view.title;
        viewContainerNav.appendChild(li);
        li.addEventListener("click", () => {
            setActiveViewElement(li);
            viewHolder.setView(view);
        })
    }
}

function setActiveViewElement(element: HTMLElement) {
    if (activeView != undefined) activeView.classList.remove("active");
    element.classList.add("active");
    activeView = element;
}

function createNewView() {
    viewService.createView(viewHolder.rView, viewNameInput.value, (r, v) => {
        if (!r || v == undefined) { console.log("Error: View could not be created"); return; }
        viewHolder.setView(v);
        viewsList.push(v);
        drawViewOptions();
    })
}

function saveCurrentView() {
    viewService.saveView(viewHolder.rView, viewNameInput.value, (b) => {
        if (b) updateViewTitle(false);
        drawViewOptions();
    });
}

function deleteActiveView() {
    viewService.deleteView(viewHolder.rView, viewsList, (r, msg) => {
        console.log(msg);
        if (r) { 
            let view = viewsList[0];
            if (view != undefined)
                viewHolder.setView(view);
            drawViewOptions();
        }
    })
}

function deleteView() {

}

function onNewView(view: View) {
    viewTitle.textContent = view.title;
    viewNameInput.value = view.title;
}

document.getElementById("delete-view")?.addEventListener("click", deleteActiveView);
document.getElementById("save-view")?.addEventListener("click", saveCurrentView);
document.getElementById("new-view")?.addEventListener("click", createNewView);

const viewNameInput = document.getElementById("view-name") as HTMLInputElement;
const viewContainerNav = document.getElementById("views-nav") as HTMLElement;
const viewTitle = document.getElementById("view-title") as HTMLElement;

getAllViewsForUser();