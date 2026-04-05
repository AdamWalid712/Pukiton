import {addShapesPanel} from "./addShapesPanel.js";
import {pages,setPagesContainerCursor} from "../../editor_globals/global.js";
import {mode} from '../../../../global/global.js'
import {fontColorInput} from "../fontSettings/fontSettings.js";
import {setShapesDrawingUI, setStuckFunction} from "../bottomTools/bottomToolsFunctions.js";
import {addShapesBtn} from "../bottomTools/bottomTools.js";
import {updateTextUI} from "../textInputPanel/textInputPanelFunctions.js";

function hidePanel(){
    addShapesPanel.classList.add("hidden")
}

function validateInput(fill){
    if (fill !== false && fill !== true){
        throw new Error("fill must be boolean")
    }
}

export function setCursor(){
    if(mode  === "light")
        setPagesContainerCursor("drawwingShape.svg","lightmode",15,15);
    else
        setPagesContainerCursor("drawwingShape.svg","darkmode",15,15);
}

export function addRectangle (fill){
    validateInput(fill);
    hidePanel();
    setShapesDrawingUI();
    setCursor();
    pages.forEach(page =>{
        page.attachEventListenersForShape("rectangle",fill)
    });
    
    const iconClass = fill ? "ri-square-fill" : "ri-square-line";
    setStuckFunction(() => addRectangle(fill), iconClass);
    addShapesBtn.style.background = "var(--active-font-color)";
}

export function addCircle(fill){
    validateInput(fill);
    hidePanel();
    setShapesDrawingUI();
    setCursor();
    pages.forEach(page =>{
        page.attachEventListenersForShape("circle",fill)
    });

    const iconClass = fill ? "ri-circle-fill" : "ri-circle-line";
    setStuckFunction(() => addCircle(fill), iconClass);
    addShapesBtn.style.background = "var(--active-font-color)";
}

export function addTriangle(fill){
    validateInput(fill);
    hidePanel();
    setShapesDrawingUI();
    setCursor();
    pages.forEach(page =>{
        page.attachEventListenersForShape("triangle",fill);
    });

    const iconClass = fill ? "ri-triangle-fill" : "ri-triangle-line";
    setStuckFunction(() => addTriangle(fill), iconClass);
    addShapesBtn.style.background = "var(--active-font-color)";
}

export function addImage(event){
    hidePanel();
    setShapesDrawingUI();
    setCursor();
    
    const iconClass = "ri-image-add-fill";
    // For images, we need to handle the input change again if clicked from stuck button?
    // Actually, clicking the stuck button for image should probably trigger the file input.
    setStuckFunction(() => document.getElementById("add-image-inp").click(), iconClass);
    addShapesBtn.style.background = "var(--active-font-color)";

    const imageFile = URL.createObjectURL(event.target.files[0]);
    const image = new Image();
    image.src = imageFile;
    image.onload = () => {
         pages.forEach(page =>{
             page.attachEventListenersForImage(image)
         });
    }
}

export function addLine(){
    hidePanel();
    setShapesDrawingUI();
    setCursor();
    pages.forEach(page =>{
        page.attachEventListenersForShape("line",null)
    });

    const iconClass = "ri-subtract-line";
    setStuckFunction(() => addLine(), iconClass);
    addShapesBtn.style.background = "var(--active-font-color)";
}

export function openTextInputPanel(){
    hidePanel();
    const textPanel = document.getElementById("textInputPanel");
    const downloadPanel = document.getElementById("downloadPanel");
    if (downloadPanel) downloadPanel.classList.add("hidden");

    textPanel.classList.remove("hidden");

    const textColorInp = textPanel.querySelector("#text-color-inp");
    textColorInp.value = fontColorInput.value;
    updateTextUI();
    
    // Set text icon as stuck function
    setStuckFunction(() => openTextInputPanel(), "ri-text");
    addShapesBtn.style.background = "var(--active-font-color)";
}
