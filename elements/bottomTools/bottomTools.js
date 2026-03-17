import {toggleFontType, erase, switchMode, toggleFormatDropDown} from "./bottomToolsFunctions.js";
import {glass} from "../../global/globals.js";
import {addShapesPanel} from "../addShapesPanel/addShapesPanel.js";

export const bottomTools = document.createElement("div");
export const addShapesBtn =document.createElement("button");
export const pencilFont = document.createElement("button");
export const markerFont = document.createElement("button");
export const eraser = document.createElement("button");
export const downloadBtn = document.createElement("button");
export const switchBtn = document.createElement("button");
export const bottomToolsButtonsClasses = "text-2xl size-8 text-black";

addShapesBtn.className = `ri-shapes-fill ${bottomToolsButtonsClasses}`;
eraser.className = `ri-eraser-line ${bottomToolsButtonsClasses} bg-transparent`;
downloadBtn.className = `ri-download-line ${bottomToolsButtonsClasses}`;
switchBtn.className = `ri-moon-fill ${bottomToolsButtonsClasses}`;
pencilFont.className = `ri-pencil-fill ${bottomToolsButtonsClasses}`;
markerFont.className = `ri-mark-pen-fill ${bottomToolsButtonsClasses} `;

addShapesBtn.onclick = () => addShapesPanel.classList.toggle("hidden");
pencilFont.onclick = () => {
    toggleFontType("pencil");
};
markerFont.onclick = () => {
    toggleFontType("marker");
}
eraser.onclick = (e) =>{
     erase(e);
}
downloadBtn.onclick = () =>toggleFormatDropDown();
switchBtn.onclick = (event)=>switchMode(event);

bottomTools.className = bottomTools.className = `${glass} py-0 px-1 h-10 rounded-full fixed left-[50%] translate-x-[-50%] bottom-3 flex items-center gap-1 `;
bottomTools.id = "bottomTools";

bottomTools.append(addShapesBtn,pencilFont,markerFont,eraser,downloadBtn,switchBtn);