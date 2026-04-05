import {glass, mode, switchMode} from "../../../../global/global.js";
import { projectPanel, nameInput, nameError } from "../newProjectPanel/newProjectPanel.js";
import { togglePanel } from "../newProjectPanel/newProjectPanelFunctions.js";

// Set initial body background based on mode
document.body.classList.add("transition-colors", "duration-300");
if (mode === "dark") document.documentElement.classList.add('dark');

// Navigation component
export const nav = document.createElement("nav");
nav.id = "home-nav";

// Nav Styling
nav.className = `fixed top-4 left-1/2 -translate-x-1/2 w-11/12 h-16 flex items-center justify-between px-4 rounded-full z-50 border transition-all duration-300 ${glass}`;

// Logo Section (Left)
const logoDiv = document.createElement("div");
logoDiv.className = "flex items-center gap-3";

const logoImg = document.createElement("img");
logoImg.src = "../../logos/nav_logo.png";
logoImg.alt = "Pukiton Logo";
logoImg.className = "bg-transparent backdrop-brightness-90 size-10 object-contain rounded-full";

const logoImgContainer = document.createElement("div");
logoImgContainer.className = "p-1 rounded-full bg-transparent backdrop-brightness-90";
logoImgContainer.append(logoImg);

const logoTitle = document.createElement("h1");
logoTitle.innerText = "Pukiton";
logoTitle.className = "text-2xl font-bold tracking-tight bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent";

logoDiv.append(logoImgContainer, logoTitle);

// Actions Section (Right)
const actionsDiv = document.createElement("div");
actionsDiv.className = "flex justify-end items-center gap-2";

// New Project Button
const newProjectBtn = document.createElement("button");
newProjectBtn.className = "flex items-center justify-center size-10 rounded-full bg-gradient-to-r from-red-400 to-orange-300 text-white hover:scale-110 transition-all";
newProjectBtn.innerHTML = '<i class="ri-add-line text-xl font-bold"></i>';
newProjectBtn.title = "New Project";
newProjectBtn.onclick = () => togglePanel(true, projectPanel, nameInput, nameError);

// Mode Switcher Pill
const modeSwitcherPill = document.createElement("div");
modeSwitcherPill.className = "flex items-center bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-full gap-1 border border-black/10 dark:border-white/10";

const updateModeUI = () => {
    [lightModeBtn, darkModeBtn, systemModeBtn].forEach(btn => {
        btn.classList.remove("bg-white", "text-stone-950", "bg-black", "text-stone-50", "bg-gray-400/50", "text-white");
        btn.classList.add("text-gray-500", "dark:text-gray-400");
    });

    if (mode === 'light') {
        lightModeBtn.classList.add("bg-white", "text-stone-950");
        lightModeBtn.classList.remove("text-gray-500", "dark:text-gray-400");
    } else if (mode === 'dark') {
        darkModeBtn.classList.add("bg-black", "text-stone-50");
        darkModeBtn.classList.remove("text-gray-500", "dark:text-gray-400");
    } else {
        systemModeBtn.classList.add("bg-gray-400/50", "text-white");
        systemModeBtn.classList.remove("text-gray-500", "dark:text-gray-400");
    }
};

// Light Mode Button
const lightModeBtn = document.createElement("button");
lightModeBtn.className = "size-8 rounded-full flex items-center justify-center transition-all hover:scale-110";
lightModeBtn.innerHTML = '<i class="ri-sun-line text-sm"></i>';
lightModeBtn.onclick = () => {
    switchMode('light');
    updateModeUI();
};

// Dark Mode Button
const darkModeBtn = document.createElement("button");
darkModeBtn.className = "size-8 rounded-full flex items-center justify-center transition-all hover:scale-110";
darkModeBtn.innerHTML = '<i class="ri-moon-line text-sm"></i>';
darkModeBtn.onclick = () => {
    switchMode('dark');
    updateModeUI();
};

// System Mode Button
const systemModeBtn = document.createElement("button");
systemModeBtn.className = "size-8 rounded-full flex items-center justify-center transition-all hover:scale-110";
systemModeBtn.innerHTML = '<i class="ri-computer-line text-sm"></i>';
systemModeBtn.title = "System Mode";
systemModeBtn.onclick = () => {
    switchMode('system');
    updateModeUI();
};

updateModeUI();

modeSwitcherPill.append(lightModeBtn, darkModeBtn, systemModeBtn);
actionsDiv.append(newProjectBtn, modeSwitcherPill);

nav.append(logoDiv, actionsDiv);