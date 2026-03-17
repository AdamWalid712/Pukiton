import {addShapesPanel} from "./addShapesPanel.js";
import {pages,mode,setPagesContainerCursor} from '../../global/globals.js'
import {fontColorInput} from "../fontSettings/fontSettings.js";

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
    setCursor();
    pages.forEach(page =>{
        page.attachEventListenersForShape("rectangle",fill)
    });
}

export function addCircle(fill){
    validateInput(fill);
    hidePanel();
    setCursor();
    pages.forEach(page =>{
        page.attachEventListenersForShape("circle",fill)
    });
}

export function addTriangle(fill){
    validateInput(fill);
    hidePanel();
    setCursor();
    pages.forEach(page =>{
        page.attachEventListenersForShape("triangle",fill);
    });
}

export function addImage(event){
    hidePanel();
    setCursor();
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
    setCursor();
    pages.forEach(page =>{
        page.attachEventListenersForShape("line",null)
    });
}

export function openTextInputPanel(){
    hidePanel();
    const textPanel = document.getElementById("textInputPanel");

    textPanel.classList.remove("hidden");

    textPanel.querySelector("#text-color-inp").value = fontColorInput.value;
}