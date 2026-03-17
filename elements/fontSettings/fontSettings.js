import {pageColorInput} from '../pageTools/pageTools.js';
import {changeFontColor} from './fontSettingsFunctions.js';
import {glass} from '../../global/globals.js';

export const fontSettings = document.createElement("div");
export const fontThicknessValueDisplay = document.createElement("span")
export const fontThickness = document.createElement("input");
export const fontOpacity = document.createElement("input");
export const fontOpacityValueDisplay = document.createElement("span");
export const fontColorInputDiv = document.createElement("div");
export const fontColorInput = document.createElement("input");
export const eraserFontDisplay = document.createElement("span");
export const erasingFontSlider = document.createElement("input");
export const erasingFontSliderDiv = document.createElement("div");

[fontThicknessValueDisplay,fontOpacityValueDisplay,eraserFontDisplay].forEach(display =>{
    display.className="text-black text-lg w-lg rotate-90";
});

[fontThickness,fontOpacity,erasingFontSlider].forEach(range =>{
    range.type = "range";
    range.min = "1";
    range.max = "100";
    range.value = "50";
    range.className = "w-[20vh] rounded-full m-0 p-0 appearance-none h-4 border border-black";
});

fontOpacity.value = "100";

erasingFontSlider.classList.remove("w-[20vh]");
erasingFontSlider.classList.add("w-[40vh]");


fontThicknessValueDisplay.innerText = fontThickness.value;
eraserFontDisplay.innerText = erasingFontSlider.value;
fontOpacityValueDisplay.innerText = fontOpacity.value;

fontColorInput.value = "#8a00ff";
fontColorInput.type = "color";
fontColorInput.className = "size-32 relative -top-2 -left-2";

fontColorInputDiv.className = `rounded-full overflow-hidden size-6 border border-black`;
fontColorInputDiv.append(fontColorInput);

fontOpacity.style.background = `linear-gradient(90deg,transparent, ${fontColorInput.value})`
fontThickness.style.background = fontColorInput.value;
erasingFontSlider.style.background = pageColorInput.value;

fontThickness.oninput = (e) =>{
    fontThicknessValueDisplay.innerText = e.target.value;
} ;

fontOpacity.oninput = (e) =>{
    fontOpacityValueDisplay.innerText = e.target.value;
}

fontColorInput.oninput = () => changeFontColor();

erasingFontSlider.oninput = (e) =>{
    eraserFontDisplay.innerText = e.target.value;
};

erasingFontSliderDiv.className = `${glass} py-1 px-2 rounded-full flex items-center justify-center gap-2 m-0 z-50 fixed left-7 top-3/4 -translate-y-1/2 -rotate-90 origin-left hidden`;

erasingFontSliderDiv.append(erasingFontSlider,eraserFontDisplay); // erasingFontSliderDiv is appended at the body

fontSettings.className = `${glass} py-1 px-2 rounded-full fixed left-7  top-3/4 -translate-y-3/5 -rotate-90 origin-left w-fit flex items-center justify-center gap-2 z-50`;
fontSettings.id = "fontSettings"

fontSettings.append(fontColorInputDiv,fontOpacity,fontOpacityValueDisplay,fontThickness,fontThicknessValueDisplay);