import { storage } from "../../../../storage/storage.js";
import { renderHistory } from "../history/historyFunctions.js";

let projectToDelete = null;
let cardToDelete = null;

export function hideConfirm(){
    const confirmOverlay = document.getElementById("confirm-overlay");
    const confirmPanel = document.getElementById("confirm-panel");
    if (!confirmOverlay || !confirmPanel) return;

    confirmOverlay.classList.remove("opacity-100");
    confirmPanel.classList.remove("scale-100");
    confirmPanel.classList.add("scale-95");
    setTimeout(() => confirmOverlay.classList.add("hidden"), 300);
}

export function showConfirm(name){
    projectToDelete = name;
    cardToDelete = document.getElementById(name);
    const confirmOverlay = document.getElementById("confirm-overlay");
    const confirmPanel = document.getElementById("confirm-panel");
    if (!confirmOverlay || !confirmPanel) return;

    confirmOverlay.classList.remove("hidden");
    setTimeout(() => {
        confirmOverlay.classList.add("opacity-100");
        confirmPanel.classList.remove("scale-95");
        confirmPanel.classList.add("scale-100");
    }, 10);
}

export function handleConfirmDelete(){
    const historyContainer = document.getElementById("home-history");
    if (projectToDelete && historyContainer) {
        storage.deleteProject(projectToDelete);
        if (cardToDelete) historyContainer.removeChild(cardToDelete);
        hideConfirm();
        if (historyContainer.querySelectorAll('.project-card').length === 0) {
            renderHistory(historyContainer);
        }
    }
}
