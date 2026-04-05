import { glass, mode } from "../../../../global/global.js";
import { togglePanel, handleCreateProject, handleNameInput } from "./newProjectPanelFunctions.js";

export const projectPanel = document.createElement("div");
projectPanel.className = `${glass} fixed top-24 right-8 w-11/12 max-w-72 p-3 rounded-2xl z-[70] hidden flex flex-col gap-3 transition-all duration-300 scale-90 opacity-0 origin-top-right ${mode === "dark" ? "text-white" : "text-black"}`;

const panelTitle = document.createElement("h2");
panelTitle.innerText = "New Project";
panelTitle.className = "text-lg font-bold tracking-tight text-center";

const inputsContainer = document.createElement("div");
inputsContainer.className = "flex flex-col gap-2";

export const nameInput = document.createElement("input");
nameInput.placeholder = "Project Name";
nameInput.className = `${glass} bg-transparent w-full rounded-full px-4 py-1.5 outline-none focus:border-orange-400  transition-all placeholder:text-gray-500 text-sm`;

export const nameError = document.createElement("span");
nameError.innerText = "Please enter a project name";
nameError.className = "text-red-500 text-[10px] ml-1 -mt-1 hidden";

inputsContainer.append(nameInput, nameError);

const actionsContainer = document.createElement("div");
actionsContainer.className = "flex gap-2";

export const cancelBtn = document.createElement("button");
cancelBtn.innerText = "Cancel";
cancelBtn.className = `${glass} flex-1 py-1.5 rounded-full font-semibold transition-all text-black text-sm ${mode === "light" ? "text-black" : "text-white"} hover:brightness-110 hover:scale-105`;

export const createBtn = document.createElement("button");
createBtn.innerText = "Create";
createBtn.className = "flex-1 py-1.5 rounded-full font-bold bg-gradient-to-r from-red-400 to-orange-300 text-white hover:brightness-110 hover:scale-105 transition-all shadow-lg shadow-orange-400/20 text-sm";

actionsContainer.append(cancelBtn, createBtn);
projectPanel.append(panelTitle, inputsContainer, actionsContainer);

// Wire up internal events
cancelBtn.onclick = () => togglePanel(false, projectPanel, nameInput, nameError);
createBtn.onclick = () => handleCreateProject(nameInput, nameError, (show) => togglePanel(show, projectPanel, nameInput, nameError));
nameInput.oninput = () => handleNameInput(nameError, nameInput);