import {glass,mode} from "../../../../global/global.js";
import {
    validateTextInputPanel,
    handleTextInput,
    handleFontSizeInput,
    toggleFontDropdown,
    closeTextInputPanel,
    selectFont,
    handleTextColorInput,
    handleAlignmentChange,
    handleDirectionChange,
    toggleTextBgTypeMenu,
    handleTextBgTypeChange,
    changeTextBackgroundGradient,
    rotateTextWheel
} from "./textInputPanelFunctions.js";

// Declarations
export const textInputPanel = document.createElement("div");
textInputPanel.style.setProperty('--text-hover-color', "#8a00ff");
textInputPanel.style.setProperty('--text-input-color', "#8a00ff");

const textInput = document.createElement("input");
const fontSizeInput = document.createElement("input");
const textFontSettingsDiv = document.createElement("div");
const textLayoutSettingsDiv = document.createElement("div");
const fontSelectWrapper = document.createElement("div");
const fontSelectButton = document.createElement("button");
const innerWrapper = document.createElement("div");
const exitButton = document.createElement("button");
const fontDropdownPanel = document.createElement("div");
const submitButton = document.createElement("button");

const textInputError = document.createElement("span");
const fontSelectError = document.createElement("span");
const fontSizeError = document.createElement("span");
const fontSizeWrapper = document.createElement("div");

const textColorSection = document.createElement("div");
const textColorLabel = document.createElement("h2");

// Background Type Dropdown for Text
export const textBgTypeWrapper = document.createElement("div");
export const textBgTypeBtn = document.createElement("button");
export const textBgTypeMenu = document.createElement("div");

// Solid Color Elements for Text
export const textColorInputDiv = document.createElement("div");
export const textColorInput = document.createElement("input");

// Gradient Elements for Text
export const textGradientContainer = document.createElement("div");
export const textGradientColor1Input = document.createElement("input");
export const textGradientColor2Input = document.createElement("input");
export const textGradientWheel = document.createElement("div");
const textGradientWheelArrow = document.createElement("i");


const textSizeSection = document.createElement("div");
const textSizeLabel = document.createElement("h2");

const strokeSection = document.createElement("div");
const strokeCheckbox = document.createElement("input");
const strokeLabel = document.createElement("h2");
const strokeCheckboxWrapper = document.createElement("div");

// Alignment Declarations
const alignmentSection = document.createElement("div");
const alignmentLabel = document.createElement("h2");
const alignmentWrapper = document.createElement("div");
const alignLeftBtn = document.createElement("button");
const alignCenterBtn = document.createElement("button");
const alignRightBtn = document.createElement("button");

// Direction Declarations
const directionSection = document.createElement("div");
const directionLabel = document.createElement("h2");
const directionWrapper = document.createElement("div");
const dirLtrBtn = document.createElement("button");
const dirRtlBtn = document.createElement("button");

const textFonts = [
    "Arial", "Arial Black", "Arial Narrow", "Arial Rounded MT Bold",
    "Helvetica", "Helvetica Neue", "Verdana",
    "Tahoma", "Trebuchet MS", "Century Gothic", "Geneva", "Lucida Sans Unicode", "Lucida Grande",
    "Segoe UI", "Roboto", "San Francisco", "Calibri", "Candara", "Optima", "Futura", "Gill Sans"
];

// ClassNames
textInputPanel.className = `${glass} panel ${mode === "dark" ? "text-white" : "text-black"} rounded-xl fixed left-1/2 -translate-x-1/2 bottom-16 w-80 h-fit flex flex-col p-5 gap-2 hidden z-50`;
innerWrapper.className = "relative w-full h-full flex flex-col gap-2";
fontDropdownPanel.className = `${glass} dropDown absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 max-h-[55vh] overflow-y-auto p-4 flex flex-col gap-2 hidden z-60 rounded-xl backdrop-blur-2xl ${mode === "dark" ? "bg-black" : "bg-white"}`;

exitButton.className = "ri-close-line text-2xl absolute -top-4 -right-4 size-6 flex items-center justify-center rounded-full hover:scale-110 hover:[background:var(--text-hover-color)] hover:text-white transition-all";

textInput.className = `${glass} bg-transparent placeholder-current rounded-full px-2 py-1 w-full min-h-10 h-fit max-h-24 focus:outline focus:outline-2 active:outline active:outline-2`;
textInput.style.color = "var(--text-input-color)";
textInput.style.outlineColor = "var(--text-input-color)";
fontSizeInput.className = `${glass} bg-transparent rounded-full w-12 px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;

textInputError.className = "text-red-600 text-xs hidden";
fontSelectError.className = "text-red-600 text-xs hidden";
fontSizeError.className = "text-red-600 text-[10px] hidden";

fontSelectWrapper.className = "relative w-full";
fontSelectButton.className = `${glass} rounded-full w-full px-2 py-1 text-left flex justify-between items-center hover:scale-105 hover:[background:var(--text-hover-color)] hover:text-white transition-all`;
textFontSettingsDiv.className = "w-full flex items-center justify-between gap-2 relative";
textLayoutSettingsDiv.className = "w-full flex items-center justify-between gap-4 relative";

// Dropdown Setup
textBgTypeWrapper.className = "relative flex items-center mx-1";
textBgTypeBtn.className = `ri-arrow-down-s-line text-lg size-4 flex items-center justify-center transition-all hover:scale-110`;
textBgTypeBtn.onclick = toggleTextBgTypeMenu;

textBgTypeMenu.className = `${glass} dropDown absolute top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col gap-2 p-2 rounded-2xl hidden z-[100] border ${mode === "dark" ? "border-white bg-black" : "border-black bg-white"}`;

["color", "gradient"].forEach(type => {
    const btn = document.createElement("button");
    btn.className = `px-3 py-1 rounded-full hover:[background:var(--text-hover-color)] hover:text-white transition-all capitalize font-bold text-sm whitespace-nowrap`;
    btn.innerText = type;
    btn.onclick = () => {
        handleTextBgTypeChange(type);
        toggleTextBgTypeMenu();
    };
    textBgTypeMenu.append(btn);
});
textBgTypeWrapper.append(textBgTypeBtn, textBgTypeMenu);

textColorSection.className = "flex items-center gap-1 shrink-0";
textColorLabel.innerText = "color";
textColorLabel.className = "text-base capitalize font-bold m-0";

textColorInputDiv.className = `size-6 rounded-full border-2 ${mode === "dark" ? "border-white" : "border-black"} border-solid overflow-hidden m-0 shrink-0`;
textColorInput.type="color";
textColorInput.id = "text-color-inp"
textColorInput.value = "#8a00ff";
textColorInput.oninput = handleTextColorInput;
textColorInput.className = "size-12 translate-y-[-40%] translate-x-[-50%]";
textColorInputDiv.append(textColorInput);

// Gradient Setup
textGradientContainer.className = "items-center gap-1 hidden shrink-0";
const gradInputClass = "size-6 rounded-full border-2 border-solid overflow-hidden m-0 p-0 appearance-none bg-transparent " + (mode === "dark" ? "border-white" : "border-black");

[textGradientColor1Input, textGradientColor2Input].forEach((input, index) => {
    input.type = "color";
    input.className = "size-12 translate-y-[-40%] translate-x-[-50%]";
    const div = document.createElement("div");
    div.className = gradInputClass;
    div.append(input);
    textGradientContainer.append(div);
    input.oninput = () => changeTextBackgroundGradient();
    input.value = index === 0 ? "#8a00ff" : "#00d4ff";
});

textGradientWheel.className = `size-8 rounded-full border-2 ${mode === "dark" ? "border-white" : "border-black"} flex items-center justify-center relative transition-none shrink-0`;
textGradientWheelArrow.className = "ri-arrow-up-line text-lg";
textGradientWheel.append(textGradientWheelArrow);
textGradientWheel.dataset.angle = "0";
textGradientWheel.onmousedown = (e) => rotateTextWheel(e);
textGradientWheel.ontouchstart = (e) => rotateTextWheel(e.touches[0]);
textGradientContainer.append(textGradientWheel);


textSizeSection.className = "flex  items-center justify-center gap-1 flex-1 min-w-0";
textSizeLabel.innerText = "size";
textSizeLabel.className = "text-base capitalize font-bold m-0 shrink-0";

strokeSection.className = "flex items-center gap-1 shrink-0";
strokeLabel.innerText = "stroke";
strokeLabel.className = "text-base capitalize font-bold m-0";

strokeCheckbox.type = "checkbox";
strokeCheckbox.id = "text-stroke-checkbox";
strokeCheckbox.className = "size-4  shrink-0";
strokeCheckbox.style.accentColor = "var(--text-hover-color)";

strokeCheckboxWrapper.className = "flex items-center";
strokeCheckboxWrapper.append(strokeCheckbox);

fontSizeWrapper.className = "flex flex-col gap-1 w-fit min-w-0 items-center";

// Alignment Styling
alignmentSection.className = "flex items-center gap-1 shrink-0";
alignmentLabel.innerText = "align";
alignmentLabel.className = "text-base capitalize font-bold m-0";
alignmentWrapper.className = `flex border ${mode === "dark" ? "border-white" : "border-black"} rounded-lg overflow-hidden`;

const alignBtnBaseClass = "p-1 size-8 flex items-center justify-center hover:[background:var(--text-hover-color)] hover:text-white transition-all text-lg";
alignLeftBtn.id = "align-left-btn";
alignLeftBtn.className = `${alignBtnBaseClass} ri-align-left [background:var(--text-hover-color)] text-white`;
alignLeftBtn.onclick = () => handleAlignmentChange('left');

alignCenterBtn.id = "align-center-btn";
alignCenterBtn.className = `${alignBtnBaseClass} ri-align-center border-x ${mode === "dark" ? "border-white" : "border-black"}`;
alignCenterBtn.onclick = () => handleAlignmentChange('center');

alignRightBtn.id = "align-right-btn";
alignRightBtn.className = `${alignBtnBaseClass} ri-align-right`;
alignRightBtn.onclick = () => handleAlignmentChange('right');

// Direction Styling
directionSection.className = "flex items-center gap-1 shrink-0";
directionLabel.innerText = "dir";
directionLabel.className = "text-base capitalize font-bold m-0";
directionWrapper.className = `flex border ${mode === "dark" ? "border-white" : "border-black"} rounded-lg overflow-hidden`;

const dirBtnBaseClass = "p-1 h-8 px-2 flex items-center justify-center hover:[background:var(--text-hover-color)] hover:text-white transition-all text-[10px] font-bold";
dirLtrBtn.id = "dir-ltr-btn";
dirLtrBtn.innerText = "LTR";
dirLtrBtn.className = `${dirBtnBaseClass} ri-text-direction-ltr [background:var(--text-hover-color)] text-white`;
dirLtrBtn.onclick = () => handleDirectionChange('ltr');

dirRtlBtn.id = "dir-rtl-btn";
dirRtlBtn.innerText = "RTL";
dirRtlBtn.className = `${dirBtnBaseClass} ri-text-direction-rtl border-l ${mode === "dark" ? "border-white" : "border-black"}`;
dirRtlBtn.onclick = () => handleDirectionChange('rtl');

// Events & Properties
textInputPanel.id = "textInputPanel";
fontDropdownPanel.id = "fontDropdownPanel";

textInputError.id = "textInputError";
fontSelectError.id = "fontSelectError";
fontSizeError.id = "fontSizeError";

textInput.type = "text";
textInput.name = "text-input";
textInput.id = "text-input";
textInput.placeholder = "Enter Your Text";
textInput.oninput = handleTextInput;

fontSizeInput.type = "number";
fontSizeInput.name = "font-size-input";
fontSizeInput.id = "font-size-input";
fontSizeInput.min = "10";
fontSizeInput.max = "96";
fontSizeInput.value = "18";
fontSizeInput.oninput = handleFontSizeInput;

fontSelectButton.innerHTML = `<span>Select Font</span> <i class="ri-arrow-up-s-line"></i>`;
fontSelectButton.id = "font-select-btn";
fontSelectButton.onclick = toggleFontDropdown;

exitButton.onclick = closeTextInputPanel;

submitButton.className = `${glass} rounded-full px-4 py-1 self-center hover:scale-110 hover:[background:var(--text-hover-color)] hover:text-white transition-all`;
submitButton.innerText = "Add Text";
submitButton.onclick = (e) => validateTextInputPanel(e);

// Appending & Option Creation
textFonts.forEach(font => {
    const optionDiv = document.createElement("div");
    const radioInput = document.createElement("input");
    const label = document.createElement("label");

    radioInput.type = "radio";
    radioInput.name = "text-font";
    radioInput.value = font;
    radioInput.id = `font-${font}`;
    radioInput.className = "hidden";

    label.htmlFor = `font-${font}`;
    label.innerText = font;
    label.className = `w-full  font-[${font}]`;

    optionDiv.className = `w-full flex items-center px-4 py-1 rounded-full hover:[background:var(--text-hover-color)] hover:text-white hover:scale-105 transition-all`;
    
    optionDiv.onclick = () => selectFont(font, fontSelectButton);

    optionDiv.append(radioInput, label);
    fontDropdownPanel.append(optionDiv);
});

fontSelectWrapper.append(fontSelectButton, fontDropdownPanel);
textColorSection.append(textColorLabel, textColorInputDiv, textGradientContainer, textBgTypeWrapper);
strokeSection.append(strokeLabel, strokeCheckboxWrapper);
fontSizeWrapper.append(fontSizeInput, fontSizeError);
textSizeSection.append(textSizeLabel, fontSizeWrapper);
textFontSettingsDiv.append(textColorSection, textSizeSection, strokeSection);

alignmentWrapper.append(alignLeftBtn, alignCenterBtn, alignRightBtn);
alignmentSection.append(alignmentLabel, alignmentWrapper);
directionWrapper.append(dirLtrBtn, dirRtlBtn);
directionSection.append(directionLabel, directionWrapper);
textLayoutSettingsDiv.append(alignmentSection, directionSection);

innerWrapper.append(exitButton, textInput, textInputError, fontSelectWrapper, fontSelectError, textFontSettingsDiv, textLayoutSettingsDiv, submitButton);
textInputPanel.append(innerWrapper);
