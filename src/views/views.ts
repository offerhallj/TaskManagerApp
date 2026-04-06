// This script define the functionality of the Views list in the sidebar of main app page, as well as accessing an altering some of the UI in the Task View.
// Realistically, a lot of this code could and should have been implemented in some sort of ViewModel class, instead, to better seperate the UI code from other concerns

import { ViewHolder } from "../views/ViewHolder.js";
import { ViewService } from "./ViewService.js";
import { View } from "./View.js";

const viewHolder = ViewHolder.Instance;
const viewService = ViewService.Instance;
let activeView: HTMLElement | undefined = undefined;
viewHolder.subscribe(onNewView);

viewHolder.onViewIsChanged = (b) => updateViewTitle(b);

function updateViewTitle(isViewChanged: boolean) {
    let saveBtn = document.getElementById("save-view");
    if (isViewChanged) {
        viewTitle.textContent = `${viewHolder.rView.title} *`;
        saveBtn?.classList.remove("inactive");
    } 
    
    if (!isViewChanged) {
        viewTitle.textContent = viewHolder.rView.title;
        saveBtn?.classList.add("inactive");
    } 
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
        openViewTitleInput();

    })
}

function saveCurrentView() {
    viewService.saveView(viewHolder.rView, viewNameInput.value, (b) => {
        if (b) updateViewTitle(false);
        closeViewTitleInput();
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

function onNewView(view: View) {
    viewTitle.textContent = view.title;
    viewNameInput.value = view.title;
}

const viewActionLabel = document.getElementById("view-action") as HTMLElement;

setButtonActions("delete-view", "Delete this View", deleteActiveView);
setButtonActions("save-view", "Save this View", saveCurrentView);
setButtonActions("new-view", "Create from View", createNewView);
setButtonActions("edit-view", "Edit this View", openViewTitleInput);

function openViewTitleInput() {
    viewTitle.classList.add("hidden");
    viewTitleInputContainer.classList.remove("hidden");
    viewNameInput.value = viewHolder.rView.title;
    viewNameInput.focus();
}

function closeViewTitleInput() {
    viewTitle.classList.remove("hidden");
    viewTitleInputContainer.classList.add("hidden");
}

function setButtonActions(buttonID: string, hoverTxt: string, clickAction: () => void) {
    let btn = document.getElementById(buttonID);
    btn?.addEventListener("click", clickAction);
    btn?.addEventListener("mouseenter", () => viewActionLabel.textContent = hoverTxt);
    btn?.addEventListener("mouseout", () => viewActionLabel.textContent = "");
}

document.getElementById("cancel-view-title")?.addEventListener("click", closeViewTitleInput);
document.getElementById("save-view-title")?.addEventListener("click", () => {
    setViewTitle();
});

document.addEventListener("keypress", (e) => {
    if(e.key == "Enter" && viewNameInput == document.activeElement) {
        setViewTitle();
    }
});

function setViewTitle() {
    viewHolder.rView.title = viewNameInput.value;
    saveCurrentView();
}

function addNewView() {
    // console.log("here");
    createNewView();
}

const viewNameInput = document.getElementById("view-name") as HTMLInputElement;
const viewContainerNav = document.getElementById("views-nav") as HTMLElement;
const viewTitle = document.getElementById("view-title") as HTMLElement;
const viewTitleInputContainer = document.getElementById("view-title-input") as HTMLElement;
document.getElementById("add-new-view")?.addEventListener("click", addNewView);

getAllViewsForUser();

