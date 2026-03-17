import {
    activeFont,
    pages,
    setActiveFont,
    mode,
    setMode,
    setPagesContainerCursor,
    currentCursor,
    setElementsCursor
} from "../../global/globals.js";
import {pencilFont,markerFont,eraser,switchBtn} from "./bottomTools.js";
import {pageNumber,pageColorInput} from "../pageTools/pageTools.js";
import {formatDropDown} from "../downloadFormatDropDown/formatDropDown.js";

import {fontSettings,fontColorInput,erasingFontSlider,erasingFontSliderDiv}
    from "../fontSettings/fontSettings.js";

export function setAllPagesErasingMode() {
    pages.forEach(page => page.setErasingMode());
}

export function setAllPagesDrawingMode() {
    pages.forEach(page => page.setDrawingMode());
}
export function erase(e){
    if(e.target.classList.contains("bg-transparent")){
        setActiveFont(null);
        pencilFont.style.background = "transparent";
        markerFont.style.background = "transparent";

        fontSettings.classList.add("hidden");
        erasingFontSliderDiv.classList.remove("hidden");
        e.target.classList.remove("bg-transparent")
        e.target.style.background = fontColorInput.value
        setAllPagesErasingMode();
        if(mode  === "light"){
            setPagesContainerCursor("eraser.svg","lightmode",0,30)
        }else {
            setPagesContainerCursor("eraser.svg","darkmode",0,30)
        }
    }
    else {
        fontSettings.classList.remove("hidden");
        erasingFontSliderDiv.classList.add("hidden");
        e.target.classList.add("bg-transparent")
        e.target.style.background = "transparent"
        setAllPagesDrawingMode();
        if(mode  === "light"){
            setPagesContainerCursor("navigation.svg","lightmode",0,30)
        }else{
            setPagesContainerCursor("navigation.svg","darkmode",0,30)
        }
    }
}

// const drawwingSound = document.createElement("audio");
// drawwingSound.src = "./DrawwingSound3.m4a";
// drawwingSound.volume = 0.2;
// drawwingSound.loop = true;

export function toggleFontType(fontType) {
    // Validate font type
    if (fontType !== "pencil" && fontType !== "marker") {
        throw new Error(`Invalid font type: "${fontType}". Must be either "pencil" or "marker".`);
    }


    // Deactivate eraser if active
    if (!eraser.classList.contains("bg-transparent")) {
        eraser.click();
    }

    // Toggle the font type
    if (activeFont === fontType) {
        setActiveFont(null);
        pencilFont.style.background = "transparent";
        markerFont.style.background = "transparent";
    } else {
        setActiveFont(fontType);
        pencilFont.style.background = fontType === "pencil" ? fontColorInput.value : "transparent";
        markerFont.style.background = fontType === "marker" ? fontColorInput.value : "transparent";
    }

    // Apply font type to all pages
    pages.forEach(page => {
        page.applyFontType(activeFont);
    });

    // Switch to drawing mode
    setAllPagesDrawingMode();
    if (mode === "light")
        setPagesContainerCursor(`${fontType}.svg`,"lightmode",0,30) ;
    else
        setPagesContainerCursor(`${fontType}.svg`,"darkmode",0,30) ;
}

export function toggleFormatDropDown(){
    formatDropDown.classList.toggle("hidden");
}

export function switchMode(e){
    const isLightMode = e.target.classList.contains("ri-moon-fill");
    let textElements;
    let YBorderedElements;
    let XBorderedElements;
    let allSidesBorderElements;

    if(isLightMode){
        textElements = document.querySelectorAll(".text-black");
        YBorderedElements = document.querySelectorAll(".border-y-black");
        XBorderedElements = document.querySelectorAll(".border-x-black");
        allSidesBorderElements = document.querySelectorAll(".border-black");
        document.body.style.background = "#000" ;
        setMode("dark");
        setElementsCursor()
        currentCursor[0] === "navigation.svg" ? setPagesContainerCursor(currentCursor[0],"darkmode",0,0)
            : setPagesContainerCursor(currentCursor[0],"darkmode",0,30);

    }
    else {
        textElements = document.querySelectorAll(".text-white");
        YBorderedElements = document.querySelectorAll(".border-y-white");
        XBorderedElements = document.querySelectorAll(".border-x-white");
        allSidesBorderElements = document.querySelectorAll(".border-white");
        document.body.style.background = "#fff" ;
        setMode("light");
        setElementsCursor()
        currentCursor[0] === "navigation.svg" ? setPagesContainerCursor(currentCursor[0],"lightmode",0,0)
            : setPagesContainerCursor(currentCursor[0],"lightmode",0,30);

    }

    textElements.forEach(ele =>{
        ele.classList.toggle("text-white");
        ele.classList.toggle("text-black");
    });

    YBorderedElements.forEach(ele =>{
        ele.classList.toggle("border-y-black");
        ele.classList.toggle("border-y-white");
    });
    XBorderedElements.forEach(ele =>{
        ele.classList.toggle("border-x-black");
        ele.classList.toggle("border-x-white");
    });

    allSidesBorderElements.forEach(ele =>{
        ele.classList.toggle("border-black");
        ele.classList.toggle("border-white");
    });

    pages.forEach(page => {
        if (!isLightMode && page.pageBackgroundColor === "#000000") {
            page.changeBackgroundColor("light");
        }

        else if (page.pageBackgroundColor === "#ffffff") {
            page.changeBackgroundColor("dark");
        }
    });

    // Update inputs based on the current page's new color
    const currentPageIndex = parseInt(pageNumber.innerText.split(" ")[1]) - 1;
    const currentPage = pages[currentPageIndex];
    pageColorInput.value = currentPage.pageBackgroundColor;
    erasingFontSlider.style.background = currentPage.pageBackgroundColor;

    switchBtn.classList.toggle("ri-moon-fill");
    switchBtn.classList.toggle("ri-sun-fill");
}
