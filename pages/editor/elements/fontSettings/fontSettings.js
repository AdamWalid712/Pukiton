import {pageColorInput} from '../pageTools/pageTools.js';
import {
    changeFontColor, 
    toggleFontBgTypeMenu, 
    handleFontBgTypeChange, 
    changeFontBackgroundGradient, 
    rotateFontWheel
} from './fontSettingsFunctions.js';
import {glass, mode} from '../../../../global/global.js';

// --- FONT SETTINGS ---
export const fontSettings = document.createElement("div");
export const fontThicknessValueDisplay = document.createElement("span")
export const fontThickness = document.createElement("input");
export const fontOpacity = document.createElement("input");
export const fontOpacityValueDisplay = document.createElement("span");

// Font Background Type Dropdown
export const fontBgTypeWrapper = document.createElement("div");
export const fontBgTypeBtn = document.createElement("button");
export const fontBgTypeMenu = document.createElement("div");

// Solid Color Elements
export const fontColorInputDiv = document.createElement("div");
export const fontColorInput = document.createElement("input");

// Gradient Elements
export const fontGradientContainer = document.createElement("div");
export const fontGradientColor1Input = document.createElement("input");
export const fontGradientColor2Input = document.createElement("input");
export const fontGradientWheel = document.createElement("div");
const fontGradientWheelArrow = document.createElement("i");

export const eraserFontDisplay = document.createElement("span");
export const erasingFontSlider = document.createElement("input");
export const eraserSettingsBar = document.createElement("div");

[fontThicknessValueDisplay,fontOpacityValueDisplay,eraserFontDisplay].forEach(display =>{
    display.className=`text-lg ${mode === "dark" ? "text-white" : "text-black"} w-lg rotate-90`;
});

[fontThickness,fontOpacity,erasingFontSlider].forEach(range =>{
    range.type = "range";
    range.min = "1";
    range.max = "100";
    range.value = "50";
    range.className = `w-[20vh] rounded-full m-0 p-0 appearance-none h-4 border ${mode === "dark" ? "border-white" : "border-black"}`;
});

fontOpacity.value = "100";
erasingFontSlider.classList.remove("w-[20vh]");
erasingFontSlider.classList.add("w-[40vh]");

fontThicknessValueDisplay.innerText = fontThickness.value;
eraserFontDisplay.innerText = erasingFontSlider.value;
fontOpacityValueDisplay.innerText = fontOpacity.value;

fontBgTypeWrapper.className = "fixed hidden z-[100] rotate-0";
fontBgTypeBtn.className = `${mode === "dark" ? "text-white" : "text-black"} ri-arrow-down-s-line text-lg size-4 flex items-center justify-center transition-all hover:scale-110`;
fontBgTypeBtn.onclick = toggleFontBgTypeMenu;

fontBgTypeMenu.className = `${glass} dropDown flex flex-col gap-2 p-2 rounded-2xl`;

["color", "gradient"].forEach(type => {
    const btn = document.createElement("button");
    btn.className = `px-3 py-1 rounded-full hover:bg-[var(--active-font-color)] transition-all capitalize font-bold text-sm whitespace-nowrap ${mode === "dark" ? "text-white" : "text-black"}`;
    btn.innerText = type;
    btn.onclick = () => {
        handleFontBgTypeChange(type);
        toggleFontBgTypeMenu();
    };
    fontBgTypeMenu.append(btn);
});
fontBgTypeWrapper.append(fontBgTypeMenu);

fontColorInput.value = "#8a00ff";
fontColorInput.type = "color";
fontColorInput.className = "size-32 relative -top-2 -left-2";

fontColorInputDiv.id = "fontColorInputDiv";
fontColorInputDiv.className = `rounded-full overflow-hidden size-6 border ${mode === "dark" ? "border-white" : "border-black"} shrink-0`;
fontColorInputDiv.append(fontColorInput);

fontGradientContainer.className = "items-center gap-1 hidden shrink-0";
const gradInputClass = "size-6 rounded-full border border-solid overflow-hidden m-0 p-0 appearance-none bg-transparent" + (mode === "dark" ? "border-white" : "border-black");

[fontGradientColor1Input, fontGradientColor2Input].forEach((input, index) => {
    input.type = "color";
    input.className = "size-12 translate-y-[-40%] translate-x-[-50%] ";
    const div = document.createElement("div");
    div.className = gradInputClass;
    div.append(input);
    fontGradientContainer.append(div);
    input.oninput = () => changeFontBackgroundGradient();
    input.value = index === 0 ? "#8a00ff" : "#00d4ff";
});

fontGradientWheel.className = `size-8 rounded-full border ${mode === "dark" ? "border-white" : "border-black"} flex items-center justify-center relative transition-none shrink-0`;
fontGradientWheelArrow.className = "ri-arrow-up-line text-lg";
fontGradientWheel.append(fontGradientWheelArrow);
fontGradientWheel.dataset.angle = "0";
fontGradientWheel.onmousedown = (e) => rotateFontWheel(e);
fontGradientWheel.ontouchstart = (e) => rotateFontWheel(e.touches[0]);
fontGradientContainer.append(fontGradientWheel);

fontOpacity.style.background = `linear-gradient(90deg,transparent, ${fontColorInput.value})`
fontThickness.style.background = fontColorInput.value;
erasingFontSlider.style.background = pageColorInput.value;

fontThickness.oninput = (e) =>{ fontThicknessValueDisplay.innerText = e.target.value; } ;
fontOpacity.oninput = (e) =>{ fontOpacityValueDisplay.innerText = e.target.value; }
fontColorInput.oninput = () => changeFontColor();
erasingFontSlider.oninput = (e) =>{ eraserFontDisplay.innerText = e.target.value; };

eraserSettingsBar.className = `${glass} panel py-1 px-2 rounded-full flex items-center justify-center gap-2 m-0 -rotate-90 fixed top-1/2 left-[-15vh] origin-center pointer-events-auto hidden z-50 ${mode === "dark" ? "text-white" : "text-black"}`;
eraserSettingsBar.id = "eraserSettings";
eraserSettingsBar.append(erasingFontSlider,eraserFontDisplay);

fontSettings.className = `${glass} fixed top-[10vh] left-7 panel py-1 px-2 rounded-full rotate-90 origin-left flex items-center justify-center gap-2 pointer-events-auto z-50 border-y-0 border-x-2 ${mode === "dark " ? "text-white border-x-white" : "text-black border-x-black"}`;
fontSettings.id = "fontSettings";

const fontSettingsInner = document.createElement("div");
fontSettingsInner.className = "flex items-center justify-center gap-2 rotate-180 text-black";
fontSettingsInner.append(fontColorInputDiv, fontGradientContainer, fontBgTypeBtn, fontOpacity, fontOpacityValueDisplay, fontThickness, fontThicknessValueDisplay);

fontSettings.append(fontSettingsInner);
