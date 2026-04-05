import {pageNumber} from "../pageTools/pageTools.js";
import {pages} from "../../editor_globals/global.js";
import {
    fontColorInput,
    fontThickness,
    fontOpacity,
    fontBgTypeWrapper,
    fontBgTypeBtn,
    fontBgTypeMenu,
    fontColorInputDiv,
    fontGradientContainer,
    fontGradientColor1Input,
    fontGradientColor2Input,
    fontGradientWheel
} from "./fontSettings.js";

// Font Settings Functions
export function updateFontUI() {
    const isGradient = fontColorInputDiv.classList.contains("hidden");
    
    if (!isGradient) {
        const color = fontColorInput.value;
        fontThickness.style.background = color;
        fontOpacity.style.background = `linear-gradient(90deg, transparent, ${color})`;
        document.documentElement.style.setProperty("--active-font-color", color);
    } else {
        const c1 = fontGradientColor1Input.value;
        const c2 = fontGradientColor2Input.value;
        const angle = fontGradientWheel.dataset.angle || "0";
        
        const gradientStr = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
        fontThickness.style.background = gradientStr;
        fontOpacity.style.background = `linear-gradient(90deg, transparent, ${c1})`;
        
        // Update global hover color variable
        document.documentElement.style.setProperty("--active-font-color", gradientStr);
    }
}

export function changeFontColor() {
    updateFontUI();
}

export function toggleFontBgTypeMenu() {
    if (fontBgTypeWrapper.classList.contains("hidden")) {
        const rect = fontBgTypeBtn.getBoundingClientRect();
        fontBgTypeWrapper.style.left = `${rect.right + 20}px`;
        fontBgTypeWrapper.style.top = `${rect.top + rect.height / 2}px`;
        fontBgTypeWrapper.style.transform = "translateY(-50%)";
    }
    fontBgTypeWrapper.classList.toggle("hidden");
}

export function handleFontBgTypeChange(type) {
    fontColorInputDiv.classList.toggle("hidden", type !== "color");
    fontGradientContainer.classList.toggle("hidden", type !== "gradient");
    
    if (type === "gradient") {
        fontGradientContainer.classList.add("flex");
    } else {
        fontGradientContainer.classList.remove("flex");
    }
    updateFontUI();
}

export function changeFontBackgroundGradient() {
    updateFontUI();
}

export function rotateFontWheel(event) {
    const wheel = fontGradientWheel;
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
        changeFontBackgroundGradient();
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
