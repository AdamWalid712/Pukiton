import {glass} from "../../global/globals.js";
import {
    validateTextInputPanel,
    handleTextInput,
    handleFontSizeInput,
    toggleFontDropdown,
    closeTextInputPanel,
    selectFont,
    handleTextColorInput
} from "./textInputPanelFunctions.js";
import {fontColorInput} from "../fontSettings/fontSettings.js";

// Declarations
export const textInputPanel = document.createElement("div");
textInputPanel.style.setProperty('--text-hover-color', fontColorInput.value);
textInputPanel.style.setProperty('--text-input-color', fontColorInput.value);

const textInput = document.createElement("input");
const fontSizeInput = document.createElement("input");
const textFontSettingsDiv = document.createElement("div");
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

const textColorInputDiv = document.createElement("div");
const textColorInput = document.createElement("input");
const textColorLabel = document.createElement("h2");
const textColorSection = document.createElement("div");

const textSizeSection = document.createElement("div");
const textSizeLabel = document.createElement("h2");

const strokeSection = document.createElement("div");
const strokeCheckbox = document.createElement("input");
const strokeLabel = document.createElement("h2");
const strokeCheckboxWrapper = document.createElement("div");

const textFonts = [
    "Arial", "Arial Black", "Arial Narrow", "Arial Rounded MT Bold",
    "Helvetica", "Helvetica Neue", "Verdana",
    "Tahoma", "Trebuchet MS", "Century Gothic", "Geneva", "Lucida Sans Unicode", "Lucida Grande",
    "Segoe UI", "Roboto", "San Francisco", "Calibri", "Candara", "Optima", "Futura", "Gill Sans"
];

// ClassNames
textInputPanel.className = `${glass} text-black rounded-xl fixed left-1/2 -translate-x-1/2 bottom-16 w-fit h-fit flex flex-col p-5 gap-2 hidden z-50`;
innerWrapper.className = "relative w-full h-full flex flex-col gap-2";
fontDropdownPanel.className = `${glass}  text-black absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 max-h-[55vh] overflow-y-auto p-4 flex flex-col gap-2 hidden z-60 rounded-xl backdrop-blur-2xl`;

exitButton.className = "ri-close-line text-black text-2xl absolute -top-4 -right-4 size-6 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 hover:bg-[var(--text-hover-color)] transition-all";

textInput.className = `${glass} rounded-full px-2 py-1 w-full min-h-10 h-fit max-h-24 focus:outline focus:outline-2 active:outline active:outline-2`;
textInput.style.color = "var(--text-input-color)";
textInput.style.outlineColor = "var(--text-input-color)";
fontSizeInput.className = `${glass} text-black rounded-full w-12 px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;

textInputError.className = "text-red-600 text-xs hidden";
fontSelectError.className = "text-red-600 text-xs hidden";
fontSizeError.className = "text-red-600 text-[10px] hidden";

fontSelectWrapper.className = "relative w-full";
fontSelectButton.className = `${glass} text-black rounded-full w-full px-2 py-1 text-left flex justify-between items-center hover:scale-105 hover:bg-[var(--text-hover-color)] transition-all`;
textFontSettingsDiv.className = "w-full flex items-center justify-between gap-2 relative";

textColorSection.className = "flex items-center gap-1 shrink-0";
textColorLabel.innerText = "color";
textColorLabel.className = "text-base text-black capitalize font-bold m-0";

textColorInputDiv.className = "size-6 rounded-full border-2 border-black border-solid overflow-hidden m-0 shrink-0";
// ... (rest of textColorInput settings)
textColorInput.type="color";
textColorInput.id = "text-color-inp"
textColorInput.value = fontColorInput.value;
textColorInput.oninput = handleTextColorInput;

textColorInput.className = "size-12 translate-y-[-40%] translate-x-[-50%] cursor-pointer";

textSizeSection.className = "flex items-center gap-1 flex-1 min-w-0";
textSizeLabel.innerText = "size";
textSizeLabel.className = "text-base text-black capitalize font-bold m-0 shrink-0";

strokeSection.className = "flex items-center gap-1 shrink-0";
strokeLabel.innerText = "stroke";
strokeLabel.className = "text-base text-black capitalize font-bold m-0";

strokeCheckbox.type = "checkbox";
strokeCheckbox.id = "text-stroke-checkbox";
strokeCheckbox.className = "size-4 cursor-pointer shrink-0";
strokeCheckbox.style.accentColor = "var(--text-hover-color)";

strokeCheckboxWrapper.className = "flex items-center";
strokeCheckboxWrapper.append(strokeCheckbox);

fontSizeWrapper.className = "flex flex-col gap-1 w-full min-w-0";

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

submitButton.className = `${glass} text-black rounded-full px-4 py-1 self-center hover:scale-110 hover:bg-[var(--text-hover-color)] transition-all`;
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
    label.className = `w-full text-black cursor-pointer font-[${font}]`;

    optionDiv.className = `w-full text-black flex items-center px-4 py-1 rounded-full hover:bg-[var(--text-hover-color)] hover:scale-105 transition-all`;
    
    optionDiv.onclick = () => selectFont(font, fontSelectButton);

    optionDiv.append(radioInput, label);
    fontDropdownPanel.append(optionDiv);
});

fontSelectWrapper.append(fontSelectButton, fontDropdownPanel);
textColorInputDiv.append(textColorInput);
textColorSection.append(textColorLabel, textColorInputDiv);
strokeSection.append(strokeLabel, strokeCheckboxWrapper);
fontSizeWrapper.append(fontSizeInput, fontSizeError);
textSizeSection.append(textSizeLabel, fontSizeWrapper);
textFontSettingsDiv.append(textColorSection, textSizeSection, strokeSection);
innerWrapper.append(exitButton, textInput, textInputError, fontSelectWrapper, fontSelectError, textFontSettingsDiv, submitButton);
textInputPanel.append(innerWrapper);
