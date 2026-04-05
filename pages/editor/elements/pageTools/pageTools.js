import {changePageBackgroundColor,changeBackgroundImage,createNewPage,changePageBackgroundGradient,rotateWheel,handleBackgroundTypeChange,toggleBgTypeMenu,saveProject} from "./pageToolsFunctions.js";
import {glass,mode} from "../../../../global/global.js";

export const pageToolsContainer = document.createElement("div");
export const newPageBtn = document.createElement("button");
export const pageNumber = document.createElement("p");

// Custom Background Type Dropdown
export const bgTypeWrapper = document.createElement("div");
export const bgTypeBtn = document.createElement("button");
export const bgTypeMenu = document.createElement("div");

// Solid Color Elements
export const pageColorInputDiv = document.createElement("div");
export const pageColorInput = document.createElement("input");

// Image Elements
export const pageBackImageDiv = document.createElement("div");
export const pageBackImageInp = document.createElement("input");
export const pageBackImageLabel = document.createElement("label");

// Gradient Elements
export const gradientContainer = document.createElement("div");
export const gradientColor1Input = document.createElement("input");
export const gradientColor2Input = document.createElement("input");
export const gradientWheel = document.createElement("div");
const gradientWheelArrow = document.createElement("i");

pageNumber.innerText = "Page 1";
pageNumber.className = " m-0 p-0 text-2xl w-max ";

// Custom Dropdown Setup
bgTypeWrapper.className = "relative flex items-center";
bgTypeBtn.className = `ri-arrow-down-s-line text-lg size-4 flex items-center justify-center transition-all hover:scale-110`;
bgTypeBtn.onclick = toggleBgTypeMenu;

bgTypeMenu.className = `${glass} ${mode === "dark" ? "text-white" : "text-black"} dropDown absolute top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col gap-2 p-2 rounded-2xl hidden z-[100] border `;

["color", "gradient", "image"].forEach(type => {
    const btn = document.createElement("button");
    btn.className = "px-3 py-1 rounded-full hover:bg-[var(--active-font-color)] transition-all capitalize font-bold text-sm whitespace-nowrap";
    btn.innerText = "bg-" + type;
    btn.onclick = () => {
        handleBackgroundTypeChange(type);
        toggleBgTypeMenu();
    };
    bgTypeMenu.append(btn);
});
bgTypeWrapper.append(bgTypeBtn, bgTypeMenu);

// Solid Color Setup
pageColorInputDiv.className = `size-6 rounded-full border-2 ${mode === "dark" ? "border-white" : "border-black"} border-solid overflow-hidden m-0`;
pageColorInput.type="color"
pageColorInput.value = mode === "dark" ? "#000000" : "#ffffff";
pageColorInput.className = "size-12 translate-y-[-40%] translate-x-[-50%]";
pageColorInputDiv.append(pageColorInput);

// Image Setup
pageBackImageInp.type = "file";
pageBackImageInp.accept = "image/*";
pageBackImageInp.className = "hidden";
pageBackImageInp.id = "back-image-inp";
pageBackImageInp.name = pageBackImageInp.id;

pageBackImageDiv.className=" size-8 h-full p-0 m-0 flex justify-center items-center rounded-full hidden";
pageBackImageLabel.className = " ri-image-add-fill text-2xl h-full w-full flex justify-center items-center";
pageBackImageLabel.htmlFor = pageBackImageInp.id;
pageBackImageDiv.append(pageBackImageInp,pageBackImageLabel);

// Gradient Setup (No H2 labels, just inputs and wheel)
gradientContainer.className = "items-center gap-1 px-1 mx-1 hidden";
const gradInputClass = "size-6 rounded-full border-2 " + (mode === "dark" ? "border-white" : "border-black") + " border-solid overflow-hidden m-0 p-0 appearance-none bg-transparent";
[gradientColor1Input, gradientColor2Input].forEach((input, index) => {
    input.type = "color";
    input.className = "size-12 translate-y-[-40%] translate-x-[-50%]";
    const div = document.createElement("div");
    div.className = gradInputClass;
    div.append(input);
    gradientContainer.append(div);
    input.oninput = () => changePageBackgroundGradient();
    input.value = index === 0 ? "#ff0000" : "#0000ff";
});

gradientWheel.className = `size-8 rounded-full border-2 ${mode === "dark" ? "border-white" : "border-black"} flex items-center justify-center relative transition-none`;
gradientWheelArrow.className = "ri-arrow-up-line text-lg";
gradientWheel.append(gradientWheelArrow);
gradientWheel.dataset.angle = "0";
gradientWheel.onmousedown = (e) => rotateWheel(e);
gradientWheel.ontouchstart = (e) => rotateWheel(e.touches[0]);
gradientContainer.append(gradientWheel);

newPageBtn.className = "ri-add-large-line size-8 text-2xl p-0 m-0";

pageToolsContainer.className = `${glass} fixed top-3 left-1/2 -translate-x-1/2 container h-fit px-4 rounded-full flex justify-center items-center w-max ${mode === "dark" ? "text-white" : "text-black"} flex gap-2 `;
pageToolsContainer.id = "pageTools";

pageColorInput.oninput = () => changePageBackgroundColor()
pageBackImageInp.oninput =() => changeBackgroundImage();
newPageBtn.onclick = () => createNewPage()

pageToolsContainer.append(pageNumber, bgTypeWrapper, pageColorInputDiv, pageBackImageDiv, gradientContainer, newPageBtn);
