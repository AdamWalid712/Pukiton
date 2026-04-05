export function validateTextInputPanel() {
    const textInput = document.getElementById("text-input");
    const fontSizeInput = document.getElementById("font-size-input");
    const fontSelectBtn = document.getElementById("font-select-btn");
    const strokeCheckbox = document.getElementById("text-stroke-checkbox");
    
    const text = textInput.value;
    const fontSize = fontSizeInput.value;
    const fontFamily = fontSelectBtn.querySelector("span").innerText;
    
    const textError = document.getElementById("textInputError");
    const fontError = document.getElementById("fontSelectError");
    
    let isValid = true;
    if (!text) {
        textError.classList.remove("hidden");
        isValid = false;
    } else {
        textError.classList.add("hidden");
    }
    
    if (fontFamily === "Select Font") {
        fontError.classList.remove("hidden");
        isValid = false;
    } else {
        fontError.classList.add("hidden");
    }
    
    if (!isValid) return;

    const alignActive = ["left", "center", "right"].find(a => 
        document.getElementById(`align-${a}-btn`).classList.contains("[background:var(--text-hover-color)]")
    );
    const dirActive = ["ltr", "rtl"].find(d => 
        document.getElementById(`dir-${d}-btn`).classList.contains("[background:var(--text-hover-color)]")
    );

    const color = document.getElementById("text-color-inp").value;
    const isStroke = strokeCheckbox.checked;

    const pageIndex = parseInt(pageNumber.innerText.split(" ")[1]) - 1;
    const currentPage = pages[pageIndex];
    
    currentPage.attachEventListenersForText(text, fontFamily, fontSize, !isStroke, color, alignActive, dirActive);
    
    closeTextInputPanel();
}

export function handleTextInput(e) {
    if (e.target.value) {
        document.getElementById("textInputError").classList.add("hidden");
    }
}

export function handleFontSizeInput(e) {
    // Validation logic can be added here if needed
}

export function toggleFontDropdown() {
    const fontDropdownPanel = document.getElementById("fontDropdownPanel");
    fontDropdownPanel.classList.toggle("hidden");
}

export function closeTextInputPanel() {
    textInputPanel.classList.add("hidden");
}

export function selectFont(font, button) {
    button.querySelector("span").innerText = font;
    document.getElementById("fontSelectError").classList.add("hidden");
    toggleFontDropdown();
}

export function updateTextUI() {
    const isGradient = textColorInputDiv.classList.contains("hidden");
    
    if (!isGradient) {
        const color = document.getElementById("text-color-inp").value;
        textInputPanel.style.setProperty('--text-hover-color', color);
        textInputPanel.style.setProperty('--text-input-color', color);
    } else {
        const c1 = textGradientColor1Input.value;
        const c2 = textGradientColor2Input.value;
        const angle = textGradientWheel.dataset.angle || "0";
        
        const gradientStr = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
        textInputPanel.style.setProperty('--text-hover-color', gradientStr);
        // We might keep the input text solid for readability, using the first color
        textInputPanel.style.setProperty('--text-input-color', c1);
    }
}

export function handleTextColorInput(e) {
    updateTextUI();
}

export function handleAlignmentChange(alignment) {
    const leftBtn = document.getElementById("align-left-btn");
    const centerBtn = document.getElementById("align-center-btn");
    const rightBtn = document.getElementById("align-right-btn");
    
    [leftBtn, centerBtn, rightBtn].forEach(btn => btn.classList.remove("[background:var(--text-hover-color)]", "text-white"));
    
    const activeBtn = document.getElementById(`align-${alignment}-btn`);
    if (activeBtn) activeBtn.classList.add("[background:var(--text-hover-color)]", "text-white");
}

export function handleDirectionChange(direction) {
    const ltrBtn = document.getElementById("dir-ltr-btn");
    const rtlBtn = document.getElementById("dir-rtl-btn");
    
    [ltrBtn, rtlBtn].forEach(btn => btn.classList.remove("[background:var(--text-hover-color)]", "text-white"));
    
    const activeBtn = document.getElementById(`dir-${direction}-btn`);
    if (activeBtn) activeBtn.classList.add("[background:var(--text-hover-color)]", "text-white");
}

// New Background Type functions
export function toggleTextBgTypeMenu() {
    textBgTypeMenu.classList.toggle("hidden");
}

export function handleTextBgTypeChange(type) {
    textColorInputDiv.classList.toggle("hidden", type !== "color");
    textGradientContainer.classList.toggle("hidden", type !== "gradient");
    
    if (type === "gradient") {
        textGradientContainer.classList.add("flex");
        textInputPanel.classList.remove("w-80");
        textInputPanel.classList.add("w-[24rem]");
    } else {
        textGradientContainer.classList.remove("flex");
        textInputPanel.classList.remove("w-[24rem]");
        textInputPanel.classList.add("w-80");
    }
    updateTextUI();
}

export function changeTextBackgroundGradient() {
    updateTextUI();
}

export function rotateTextWheel(event) {
    const wheel = textGradientWheel;
    const rect = wheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    function doRotate(e) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        
        let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        angle = (angle + 90 + 360) % 360; 

        wheel.style.transform = `rotate(${angle}deg)`;
        wheel.dataset.angle = angle.toString();
        changeTextBackgroundGradient();
    }

    function stopRotate() {
        window.removeEventListener("mousemove", doRotate);
        window.removeEventListener("mouseup", stopRotate);
        window.removeEventListener("touchmove", doRotate);
        window.removeEventListener("touchend", stopRotate);
    }

    window.addEventListener("mousemove", doRotate);
    window.addEventListener("mouseup", stopRotate);
    window.addEventListener("touchmove", doRotate);
    window.addEventListener("touchend", stopRotate);
    
    doRotate(event);
}
