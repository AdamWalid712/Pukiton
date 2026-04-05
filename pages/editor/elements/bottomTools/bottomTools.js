import {
    toggleFontType,
    erase,
    toggleDownloadPanel,
    handleShapesBtnClick,
    handleShapesBtnDblClick,
    downloadPage,
    saveProject,
    printPage,
    switchEditorMode
} from "./bottomToolsFunctions.js";
import {glass, mode} from "../../../../global/global.js";
import {toHome} from "../../../../switchPages/switchPages.js";

export const bottomTools = document.createElement("div");
export const addShapesBtn =document.createElement("button");
export const pencilFont = document.createElement("button");
export const markerFont = document.createElement("button");
export const eraser = document.createElement("button");
export const switchBtn = document.createElement("button");

export const homeBtn = document.createElement("button");
const navGroup = document.createElement("div");

export const downloadBtn = document.createElement("button");
export const printBtn = document.createElement("button");
export const downloadPanel = document.createElement("div");

export const bottomToolsButtonsClasses = `text-2xl size-8 rounded-full p-0 m-0 flex items-center justify-center ${mode == "light" ? "text-black" : "text-white"}`;

addShapesBtn.className = `ri-shapes-fill ${bottomToolsButtonsClasses}`;
eraser.className = `ri-eraser-line ${bottomToolsButtonsClasses} bg-transparent`;
switchBtn.className = `${mode === "light" ? "ri-moon-fill" : "ri-sun-fill"} ${bottomToolsButtonsClasses}`;
pencilFont.className = `ri-pencil-fill ${bottomToolsButtonsClasses}`;
markerFont.className = `ri-mark-pen-fill ${bottomToolsButtonsClasses} `;

homeBtn.className = `ri-home-4-line ${bottomToolsButtonsClasses}`;
navGroup.className = `${glass} flex items-center gap-1 p-1 rounded-full pointer-events-auto ${mode === "dark" ? "text-white" : "text-black"}`;
navGroup.append(homeBtn, switchBtn);

downloadBtn.className = `ri-download-line ${bottomToolsButtonsClasses}`;
downloadBtn.title = "Download";
printBtn.className = `ri-printer-line ${bottomToolsButtonsClasses}`;
printBtn.title = "Print";

downloadPanel.className = `${glass} absolute bottom-full mb-2 p-2 rounded-2xl hidden pointer-events-auto flex flex-col items-center gap-2 border bg-transparent ${mode === "dark" ? "border-white" : "border-black"}`;
downloadPanel.id = "downloadPanel";

const panelHeading = document.createElement("h2");
panelHeading.className = "text-[10px] font-bold opacity-70 whitespace-nowrap " + (mode === "dark" ? "text-white" : "text-black");
panelHeading.innerText = "FORMAT";

const formatBtnsDiv = document.createElement("div");
formatBtnsDiv.className = "flex gap-1";

["PNG", "JPG", "WEBP"].forEach(format => {
    const btn = document.createElement("button");
    btn.innerText = format;
    btn.className = "text-xs font-bold px-2 py-1 rounded-full border border-black/10 dark:border-white/10" + (mode === "dark" ? "text-white" : "text-black");
    btn.onclick = (e) => {
        downloadPage(e);
        toggleDownloadPanel(downloadPanel);
    };
    formatBtnsDiv.append(btn);
});

downloadPanel.append(panelHeading, formatBtnsDiv);

addShapesBtn.onclick = handleShapesBtnClick;
addShapesBtn.ondblclick = handleShapesBtnDblClick;

pencilFont.onclick = () => {
    toggleFontType("pencil");
};
markerFont.onclick = () => {
    toggleFontType("marker");
}
eraser.onclick = (e) =>{
     erase(e);
}
switchBtn.onclick = (event)=>switchEditorMode(event);
homeBtn.onclick = () => {
    saveProject(`${document.getElementById("editorContainer").dataset.projectName}`)
    toHome();
}

downloadBtn.onclick = () => toggleDownloadPanel(downloadPanel);
printBtn.onclick = () => printPage();

bottomTools.className = "fixed bottom-3 w-screen flex justify-center items-center h-fit pointer-events-none z-50";
bottomTools.id = "bottomTools";

const toolsWrapper = document.createElement("div");
toolsWrapper.className = "flex items-center gap-2 pointer-events-none";

const drawingTools = document.createElement("div");
drawingTools.className = `${glass} flex items-center gap-1 py-1 px-2 rounded-full pointer-events-auto ${mode === "dark" ? "text-white" : "text-black"}`;

const outputTools = document.createElement("div");
outputTools.className = `${glass} flex items-center gap-1 py-1 px-2 rounded-full pointer-events-auto relative ${mode === "dark" ? "text-white" : "text-black"}`;

drawingTools.append(addShapesBtn, pencilFont, markerFont, eraser);
outputTools.append(printBtn, downloadBtn, downloadPanel);

toolsWrapper.append(navGroup, drawingTools, outputTools);
bottomTools.append(toolsWrapper);
