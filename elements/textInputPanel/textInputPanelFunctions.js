import {fontColorInput} from "../fontSettings/fontSettings.js";
import {pages} from "../../global/globals.js";

function resetInputs() {
    const textInput = document.getElementById("text-input");
    const fontSizeInput = document.getElementById("font-size-input");
    const fontSelectButton = document.getElementById("font-select-btn");
    const fontSelectSpan = fontSelectButton.querySelector("span");
    const textColorInput = document.getElementById("text-color-inp");
    const strokeCheckbox = document.getElementById("text-stroke-checkbox");

    const textInputError = document.getElementById("textInputError");
    const fontSelectError = document.getElementById("fontSelectError");
    const fontSizeError = document.getElementById("fontSizeError");

    textInput.value = "";
    fontSizeInput.value = "18";
    fontSelectSpan.innerText = "Select Font";
    fontSelectButton.style.fontFamily = "";
    
    // Reset styles
    textInput.style.fontFamily = "";
    textInput.style.fontSize = "18px";
    
    if(strokeCheckbox) strokeCheckbox.checked = false;

    if (textColorInput && fontColorInput) {
        textColorInput.value = fontColorInput.value;
        const textInputPanel = document.getElementById("textInputPanel");
        textInputPanel.style.setProperty('--text-hover-color', fontColorInput.value);
        textInputPanel.style.setProperty('--text-input-color', fontColorInput.value);
        if(strokeCheckbox) strokeCheckbox.style.accentColor = fontColorInput.value;
    }

    textInputError.classList.add("hidden");
    fontSelectError.classList.add("hidden");
    fontSizeError.classList.add("hidden");
}

export function validateTextInputPanel(event) {
    event.preventDefault();
    
    const textInput = document.getElementById("text-input");
    const fontSizeInput = document.getElementById("font-size-input");
    const fontSelectButton = document.querySelector("#font-select-btn span");
    const fontValue = fontSelectButton ? fontSelectButton.innerText : "";
    const strokeCheckbox = document.getElementById("text-stroke-checkbox");
    const color = document.getElementById("text-color-inp").value;

    const textInputError = document.getElementById("textInputError");
    const fontSelectError = document.getElementById("fontSelectError");
    const fontSizeError = document.getElementById("fontSizeError");

    // Reset errors
    textInputError.classList.add("hidden");
    fontSelectError.classList.add("hidden");
    fontSizeError.classList.add("hidden");

    let isValid = true;

    if (!textInput.value.trim()) {
        textInputError.innerText = "Please enter your text.";
        textInputError.classList.remove("hidden");
        isValid = false;
    }

    if (!fontSizeInput.value || fontSizeInput.value < 10 || fontSizeInput.value > 96) {
        fontSizeError.innerText = "min 10 max 96";
        fontSizeError.classList.remove("hidden");
        isValid = false;
    }

    if (fontValue === "Select Font") {
        fontSelectError.innerText = "Please select a font.";
        fontSelectError.classList.remove("hidden");
        isValid = false;
    }

    if (!isValid) return false;

    // Gather data before resetting
    const textData = {
        text: textInput.value,
        font: fontValue,
        size: fontSizeInput.value,
        isStroke: strokeCheckbox.checked,
        color: color
    };
    
    resetInputs();
    closeTextInputPanel();
    
    drawText(textData.text, textData.font, textData.size, textData.isStroke, textData.color);
    return true;
}

export function handleTextInput() {
    const textInput = document.getElementById("text-input");
    const textInputError = document.getElementById("textInputError");
    if (!textInput.value.trim()) {
        textInputError.innerText = "Please enter your text.";
        textInputError.classList.remove("hidden");
    } else {
        textInputError.classList.add("hidden");
    }
}

export function handleFontSizeInput() {
    const fontSizeInput = document.getElementById("font-size-input");
    const textInput = document.getElementById("text-input");
    const fontSizeError = document.getElementById("fontSizeError");
    const val = Number(fontSizeInput.value);
    if (!fontSizeInput.value || val < 10 || val > 96) {
        fontSizeError.innerText = "min 10 max 96";
        fontSizeError.classList.remove("hidden");
    } else {
        fontSizeError.classList.add("hidden");
        if(textInput) textInput.style.fontSize = val + "px";
    }
}

export function toggleFontDropdown() {
    const fontDropdownPanel = document.getElementById("fontDropdownPanel");
    fontDropdownPanel.classList.toggle("hidden");
}

export function closeTextInputPanel() {
    const textInputPanel = document.getElementById("textInputPanel");
    textInputPanel.classList.add("hidden");
    resetInputs();
}

export function selectFont(font, fontSelectButton) {
    const fontSelectError = document.getElementById("fontSelectError");
    const fontDropdownPanel = document.getElementById("fontDropdownPanel");
    const textInput = document.getElementById("text-input");
    
    fontSelectButton.querySelector("span").innerText = font;
    fontSelectButton.style.fontFamily = font;
    if(textInput) textInput.style.fontFamily = font;
    
    fontDropdownPanel.classList.add("hidden");
    if (!fontSelectError.classList.contains("hidden")) fontSelectError.classList.add("hidden");
}

export function handleTextColorInput() {
    const textColorInput = document.getElementById("text-color-inp");
    const textInputPanel = document.getElementById("textInputPanel");
    const strokeCheckbox = document.getElementById("text-stroke-checkbox");
    
    textInputPanel.style.setProperty('--text-hover-color', textColorInput.value);
    textInputPanel.style.setProperty('--text-input-color', textColorInput.value);
    if(strokeCheckbox) strokeCheckbox.style.accentColor = textColorInput.value;
}
function drawText(text,fontFamily,fontSize,fill,color){
    pages.forEach(page => {
        page.attachEventListenersForText(text,fontFamily,fontSize,fill,color);
    })
}