import { storage } from "../storage/storage.js";

const getSystemTheme = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

export let mode = storage.getTheme() || "system";
let activeMode = mode === "system" ? getSystemTheme() : mode;

export let glass = `glass-shadow backdrop-blur-sm backdrop-brightness-150 backdrop-contrast-55 border-y-2 ${activeMode === "dark" ? "border-white" : "border-black"}`;

export function setMode(newMode){
    if (newMode !== "light" && newMode !== "dark" && newMode !== "system") {
        throw new Error('invalid mode mode must be "light", "dark", or "system"')
    }
    mode = newMode;
    let actualMode = mode === "system" ? getSystemTheme() : mode;
    glass = `glass-shadow bg-transparent backdrop-blur-sm backdrop-brightness-150 backdrop-contrast-55 border-y-2 ${actualMode === "dark" ? "border-y-white" : "border-y-black"}`;
    storage.setTheme(mode);
}

export function setElementsCursor() {
    let actualMode = mode === "system" ? getSystemTheme() : mode;
    let cursorFolder = actualMode === "light" ? "lightmode" : "darkmode";

    document.querySelectorAll("*").forEach(element => {
        if (!element)  return;

        element.style.cursor = `url(../global/cursors/${cursorFolder}/navigation.svg) 0 0 ,auto`;
    })
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (mode === "system") {
        switchMode("system");
    }
});

export function switchMode(newMode){
    if (newMode) setMode(newMode);
    
    let actualMode = mode === "system" ? getSystemTheme() : mode;
    
    let textElements;
    let YBorderedElements;
    let XBorderedElements;
    let allSidesBorderElements;
    let placeholderElements;

    if(actualMode === "light"){
        textElements = document.querySelectorAll(".text-white");
        YBorderedElements = document.querySelectorAll(".border-y-white");
        XBorderedElements = document.querySelectorAll(".border-x-white");
        allSidesBorderElements = document.querySelectorAll(".border-white");
        placeholderElements = document.querySelectorAll(".placeholder-white");
        document.body.style.background = "#fff" ;
        document.body.style.cursor = `url(../global/cursors/lightmode/navigation.svg) 0  0 ,auto`;
        document.documentElement.classList.remove('dark');
    }
    else {
        textElements = document.querySelectorAll(".text-black");
        YBorderedElements = document.querySelectorAll(".border-y-black");
        XBorderedElements = document.querySelectorAll(".border-x-black");
        allSidesBorderElements = document.querySelectorAll(".border-black");
        placeholderElements = document.querySelectorAll(".placeholder-black");
        document.body.style.background = "#000" ;
        document.body.style.cursor = `url(../global/cursors/darkmode/navigation.svg) 0 0 ,auto`;
        document.documentElement.classList.add('dark');
    }

    textElements.forEach(ele =>{
        ele.classList.toggle("text-white");
        ele.classList.toggle("text-black");
    });

    YBorderedElements.forEach(ele =>{
        ele.classList.toggle("border-y-black");
        ele.classList.toggle("border-y-white");
    });
    XBorderedElements.forEach(ele =>{
        ele.classList.toggle("border-x-black");
        ele.classList.toggle("border-x-white");
    });

    allSidesBorderElements.forEach(ele =>{
        ele.classList.toggle("border-black");
        ele.classList.toggle("border-white");
    });

    placeholderElements.forEach(ele => {
        ele.classList.toggle("placeholder-black");
        ele.classList.toggle("placeholder-white");
    });

    setElementsCursor();
}

// Initialize mode on load
// document.addEventListener('DOMContentLoaded', () => {
//     switchMode();
// });