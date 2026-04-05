import {
    activeFont,
    pages,
    setActiveFont,
    setPagesContainerCursor,
    currentCursor,
} from "../../editor_globals/global.js";
import {
    mode, switchMode,
} from "../../../../global/global.js";
import {pencilFont,markerFont,eraser,addShapesBtn} from "./bottomTools.js";
import {pageNumber,pageColorInput} from "../pageTools/pageTools.js";
import {addShapesPanel} from "../addShapesPanel/addShapesPanel.js";
import {storage} from "../../../../storage/storage.js";

import {fontSettings,erasingFontSlider,eraserSettingsBar}
    from "../fontSettings/fontSettings.js";

let currentStuckFunction = null;
let currentIconClass = "ri-shapes-fill";

export function setStuckFunction(fn, iconClass) {
    currentStuckFunction = fn;
    // Remove old icon, add new one
    addShapesBtn.classList.remove(currentIconClass);
    addShapesBtn.classList.add(iconClass);
    currentIconClass = iconClass;
}

export function openAddShapesPanel() {
    const downloadPanel = document.getElementById("downloadPanel");
    const textInputPanel = document.getElementById("textInputPanel");
    if (downloadPanel) downloadPanel.classList.add("hidden");
    if (textInputPanel) textInputPanel.classList.add("hidden");
    
    addShapesPanel.classList.toggle("hidden");
}

export function handleShapesBtnClick() {
    // 1. If panel is open, close it (one click toggle)
    if (!addShapesPanel.classList.contains("hidden")) {
        addShapesPanel.classList.add("hidden");
        return;
    }

    // 2. If a tool is stuck
    if (currentStuckFunction) {
        // Toggle the tool itself
        if (addShapesBtn.style.background !== "") {
            // It's active, so deactivate
            addShapesBtn.style.background = "";
            setActiveFont(null);
            pages.forEach(page => {
                page.applyFontType(null);
                page.setDrawingMode();
            });
            setPagesContainerCursor("navigation.svg", mode === "light" ? "lightmode" : "darkmode", 0, 0);
        } else {
            // It's inactive, so activate
            currentStuckFunction();
        }
    } else {
        // No stuck function, just open panel
        openAddShapesPanel();
    }
}

export function handleShapesBtnDblClick() {
    openAddShapesPanel();
}

export function setAllPagesErasingMode() {
    pages.forEach(page => page.setErasingMode());
}

export function setAllPagesDrawingMode() {
    pages.forEach(page => page.setDrawingMode());
}
export function erase(e){
    if(e.target.classList.contains("bg-transparent")){
        // Don't null activeFont, just hide its UI
        pencilFont.style.background = "";
        markerFont.style.background = "";
        addShapesBtn.style.background = "";

        fontSettings.classList.add("hidden");
        eraserSettingsBar.classList.remove("hidden");
        e.target.classList.remove("bg-transparent")
        e.target.style.background = "var(--active-font-color)"
        setAllPagesErasingMode();
        if(mode  === "light"){
            setPagesContainerCursor("eraser.svg","lightmode",0,30)
        }else {
            setPagesContainerCursor("eraser.svg","darkmode",0,30)
        }
    }
    else {
        fontSettings.classList.remove("hidden");
        eraserSettingsBar.classList.add("hidden");
        e.target.classList.add("bg-transparent")
        e.target.style.background = ""
        setAllPagesDrawingMode();

        // Restore active font UI if one was selected
        if (activeFont) {
            if (activeFont === "pencil") {
                pencilFont.style.background = "var(--active-font-color)";
                setPagesContainerCursor("pencil.svg", mode === "light" ? "lightmode" : "darkmode", 0, 30);
            } else if (activeFont === "marker") {
                markerFont.style.background = "var(--active-font-color)";
                setPagesContainerCursor("marker.svg", mode === "light" ? "lightmode" : "darkmode", 0, 30);
            }
        } else {
            if(mode  === "light"){
                setPagesContainerCursor("navigation.svg","lightmode",0,30)
            }else{
                setPagesContainerCursor("navigation.svg","darkmode",0,30)
            }
        }
    }
}

export function setShapesDrawingUI() {
    // Reset other tools
    setActiveFont(null);
    pencilFont.style.background = "";
    markerFont.style.background = "";
    
    // Deactivate eraser if active
    if (!eraser.classList.contains("bg-transparent")) {
        fontSettings.classList.remove("hidden");
        eraserSettingsBar.classList.add("hidden");
        eraser.classList.add("bg-transparent");
        eraser.style.background = "";
    }

    // Set shapes button background (Removed as per request)
}

export function toggleFontType(fontType) {
    // Validate font type
    if (fontType !== "pencil" && fontType !== "marker") {
        throw new Error(`Invalid font type: "${fontType}". Must be either "pencil" or "marker".`);
    }

    // Deactivate eraser if active
    if (!eraser.classList.contains("bg-transparent")) {
        eraser.click();
    }

    // Reset shapes button
    addShapesBtn.style.background = "";

    // Toggle the font type
    if (activeFont === fontType) {
        setActiveFont(null);
        pencilFont.style.background = "";
        markerFont.style.background = "";
    } else {
        setActiveFont(fontType);
        pencilFont.style.background = fontType === "pencil" ? "var(--active-font-color)" : "";
        markerFont.style.background = fontType === "marker" ? "var(--active-font-color)" : "";
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

export function switchEditorMode(e = null){
    switchMode(mode === "light" ? "dark" : "light")
    currentCursor[0] === "navigation.svg" ? setPagesContainerCursor(currentCursor[0],mode === "dark" ? "lightmode":"darkmode",0,0)
        : setPagesContainerCursor(currentCursor[0],mode === "dark" ? "lightmode":"darkmode",0,30);
    pages.forEach(page => {
        if (page.backgroundType === "image" || page.backgroundType === "gradient"){
            return;
        }
        else if (mode == "light" && page.pageBackgroundColor === "#000000") {
            page.changeBackgroundColor("light");
        }
        else if (mode == "dark" && page.pageBackgroundColor === "#ffffff") {
            page.changeBackgroundColor("dark");
        }
    });

    // Update inputs based on the current page's new color
    const currentPageIndex = parseInt(pageNumber.innerText.split(" ")[1]) - 1;
    const currentPage = pages[currentPageIndex];
    pageColorInput.value = currentPage.pageBackgroundColor;
    erasingFontSlider.style.background = currentPage.pageBackgroundColor;

    if (e){
        e.target.classList.toggle("ri-moon-fill");
        e.target.classList.toggle("ri-sun-fill");
    }
}

// Download / Print / Save Functions
export function downloadPage(event){
    const currentPageIndex = parseInt(pageNumber.innerText.split(" ")[1]) - 1;
    const currentPage = pages[currentPageIndex];
    const format = event.target.innerText.toLowerCase();

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = currentPage.width;
    tempCanvas.height = currentPage.height;

    tempCtx.drawImage(currentPage.backgroundCanvas, 0, 0);
    tempCtx.drawImage(currentPage.drawwingCanvas, 0, 0);

    const link = document.createElement('a');
    link.href = tempCanvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`);
    link.download = currentPage.id + "." + format;
    link.click();
}

export function saveProject(name) {
    const pagesData = {};
    pages.forEach(page => {
        pagesData[`${page.id}`] = page.data();
    });

    // Capture screenshot of the first page
    const firstPage = pages[0];
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = firstPage.width;
    tempCanvas.height = firstPage.height;
    tempCtx.drawImage(firstPage.backgroundCanvas, 0, 0);
    tempCtx.drawImage(firstPage.drawwingCanvas, 0, 0);
    const screenshot = tempCanvas.toDataURL('image/webp');

    storage.updateProject(name, {
        name: name,
        data: pagesData,
        screenshot: screenshot
    });
}

export function printPage() {
    const currentPageIndex = parseInt(pageNumber.innerText.split(" ")[1]) - 1;
    const currentPage = pages[currentPageIndex];

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = currentPage.width;
    tempCanvas.height = currentPage.height;

    tempCtx.drawImage(currentPage.backgroundCanvas, 0, 0);
    tempCtx.drawImage(currentPage.drawwingCanvas, 0, 0);

    const dataUrl = tempCanvas.toDataURL('image/png');
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print Image</title></head><body>');
    printWindow.document.write('<img src="' + dataUrl + '" style="width:100%;">');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}

export function toggleDownloadPanel(panel) {
    panel.classList.toggle("hidden");
}
