import {toEditor} from "../../../../switchPages/switchPages.js";
import { storage } from "../../../../storage/storage.js";

export const togglePanel = (show, projectPanel, nameInput, nameError) => {
    if (show) {
        projectPanel.classList.remove("hidden");
        setTimeout(() => {
            projectPanel.classList.add("opacity-100", "scale-100");
        }, 10);
    } else {
        projectPanel.classList.remove("opacity-100", "scale-100");
        setTimeout(() => {
            projectPanel.classList.add("hidden");
            nameInput.value = "";
            nameError.classList.add("hidden");
            nameInput.classList.remove("border-red-500/50");
        }, 300);
    }
};

export const handleCreateProject = (nameInput, nameError, togglePanelFn) => {
    if (nameInput.value.trim() === "") {
        nameError.classList.remove("hidden");
        nameInput.classList.add("border-red-500/50");
        return;
    }
    // Logic to handle project creation would go here
    storage.createProject(`${nameInput.value}`,null);
    togglePanelFn(false);
    toEditor(nameInput.value);
};

export const handleNameInput = (nameError, nameInput) => {
    nameError.classList.add("hidden");
    nameInput.classList.remove("border-red-500/50");
};
