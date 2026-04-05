import {glass,mode} from "../../../../global/global.js";
import {addCircle, addImage, addRectangle, addTriangle, addLine, openTextInputPanel} from "./addShapesFunctions.js";

// Make functions globally available for inline onclick handlers
window.addCircle = addCircle;
window.addImage = addImage;
window.addRectangle = addRectangle;
window.addTriangle = addTriangle;
window.addLine = addLine;
window.openTextInputPanel = openTextInputPanel;

export const addShapesPanel = document.createElement("div");
const exitBtn = document.createElement("button");
const fillShapesContainer = document.createElement("div");
const strokeShapesContainer = document.createElement("div");
const otherShapesContainer = document.createElement("div");

const btnClasses = "size-10 text-4xl flex items-center justify-center";

// Main Panel Setup
addShapesPanel.id = "addShapesPanel";
addShapesPanel.className = `${glass} panel rounded-3xl w-48 h-max px-2 py-0 m-0 fixed bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center divide-y-2 ${mode === "dark" ? "divide-white text-white" : "divide-black text-black"} hidden`;

// Exit Button Setup
exitBtn.className = "ri-close-line absolute top-2 right-2 size-8 flex items-center justify-center text-2xl";
exitBtn.onclick = () => addShapesPanel.classList.add("hidden");

// Fill Shapes Section
fillShapesContainer.className = "w-full flex flex-col items-start p-3 pb-3";
fillShapesContainer.innerHTML = `
    <h2 class="text-sm font-bold mb-1">fill shapes</h2>
    <div class="w-full flex justify-center gap-2">
        <button class="${btnClasses} ri-circle-fill" onclick="addCircle(true)" type="button"></button>
        <button class="${btnClasses} ri-triangle-fill" onclick="addTriangle(true)" type="button"></button>
        <button class="${btnClasses} ri-square-fill" onclick="addRectangle(true)" type="button"></button>
    </div>
`;

// Stroke Shapes Section
strokeShapesContainer.className = "w-full flex flex-col items-start p-3 pb-3";
strokeShapesContainer.innerHTML = `
    <h2 class="text-sm font-bold mb-1">stroke shapes</h2>
    <div class="w-full flex justify-center gap-2">
        <button class="${btnClasses} ri-circle-line" onclick="addCircle(false)" type="button"></button>
        <button class="${btnClasses} ri-triangle-line" onclick="addTriangle(false)" type="button"></button>
        <button class="${btnClasses} ri-square-line" onclick="addRectangle(false)" type="button"></button>
    </div>
`;

// Other Tools Section
otherShapesContainer.className = "w-full flex flex-col items-start p-3";
otherShapesContainer.innerHTML = `
    <h2 class="text-sm font-bold mb-1">other</h2>
    <div class="w-full flex justify-center gap-2 items-center">
        <button class="ri-text ${btnClasses}" onclick="openTextInputPanel()" type="button"></button>
        <div class="inline-block p-0 m-0">
            <input id="add-image-inp" name="add-image-inp" type="file" accept="image/*" class="hidden" oninput="addImage(event)">
            <label for="add-image-inp" class="${btnClasses} ri-image-add-fill"></label>
        </div>
        <button class="size-10 text-2xl ri-subtract-line flex items-center justify-center" onclick="addLine()" type="button"></button>
    </div>
`;

addShapesPanel.append(exitBtn, fillShapesContainer, strokeShapesContainer, otherShapesContainer);
