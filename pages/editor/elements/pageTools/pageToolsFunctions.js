import {Page} from "../pageObject&pagesContainer/pageObject.js";
import {pagesContainer} from "../pageObject&pagesContainer/pagesContainer.js";
import {pages,activeFont} from "../../editor_globals/global.js";
import {
    pageNumber,
    pageColorInput,
    pageBackImageInp,
    gradientColor1Input,
    gradientColor2Input,
    gradientWheel,
    bgTypeMenu,
    pageColorInputDiv,
    pageBackImageDiv,
    gradientContainer
} from "./pageTools.js";
import {erasingFontSlider} from "../fontSettings/fontSettings.js";
import {setAllPagesDrawingMode,setAllPagesErasingMode} from "../bottomTools/bottomToolsFunctions.js";
import {eraser} from "../bottomTools/bottomTools.js";

export function toggleBgTypeMenu() {
    bgTypeMenu.classList.toggle("hidden");
}

export function handleBackgroundTypeChange(type) {
    const currentPage = pages[parseInt(pageNumber.innerText.split(" ")[1]) - 1];
    currentPage.backgroundType = type;

    // Toggle Visibility
    pageColorInputDiv.classList.toggle("hidden", type !== "color");
    pageBackImageDiv.classList.toggle("hidden", type !== "image");
    gradientContainer.classList.toggle("hidden", type !== "gradient");
    
    if (type === "gradient") {
        gradientContainer.classList.add("flex");
    } else {
        gradientContainer.classList.remove("flex");
    }
    currentPage.backgroundType = type;
}

export function changePageBackgroundColor(){
    const currentPage = pages[parseInt(pageNumber.innerText.split(" ")[1]) -1];
    currentPage.changeBackgroundColor(pageColorInput.value);
    erasingFontSlider.style.background = pageColorInput.value;
}

export function changePageBackgroundGradient(){
    const currentPage = pages[parseInt(pageNumber.innerText.split(" ")[1]) -1];
    const angle = parseInt(gradientWheel.dataset.angle);
    currentPage.changeBackgroundGradient(gradientColor1Input.value, gradientColor2Input.value, angle);
}

export function rotateWheel(event) {
    const wheel = gradientWheel;
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
        changePageBackgroundGradient();
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

export function changeBackgroundImage(){
    const imageUrl = URL.createObjectURL( pageBackImageInp.files[0]);
    const currentPage = pages[parseInt(pageNumber.innerText.split(" ")[1]) -1];
    const bgImage = new Image();
    bgImage.src = imageUrl;
    bgImage.onload = () => currentPage.changeBackgroundImage(bgImage);
}

export function createNewPage(){
    const newPageID = parseInt(pages[pages.length - 1].id.split(" ")[1]) + 1;
    const newPage = new Page(newPageID);

    if (activeFont) {
        newPage.applyFontType(activeFont);
    }

    pagesContainer.append(newPage.pageContainer);
    pages.push(newPage);

    if (!eraser.classList.contains("bg-transparent")) {
        setAllPagesErasingMode();
    } else {
        setAllPagesDrawingMode();
    }

    observeAllPages();
    const scrollToLeftValue =   newPage.width * (pages.length - 1)

    pagesContainer.scrollBy({
        left: scrollToLeftValue,
        behavior :"smooth"
    });
}

const observer = new IntersectionObserver((page) => {
    page.forEach(element =>{
        if(element.isIntersecting){
            pageNumber.innerText = element.target.id;
            const pageIndex = parseInt(element.target.id.split(" ")[1]) - 1;
            const currentPage = pages[pageIndex];
            
            // Sync UI with current page state
            handleBackgroundTypeChange(currentPage.backgroundType);
            
            pageColorInput.value = currentPage.pageBackgroundColor;
            erasingFontSlider.style.background = currentPage.pageBackgroundColor;
        }
    })
},{threshold: 0.7});

export function observeAllPages(){
    pages.forEach(page =>{
        observer.observe(page.pageContainer)
    })
}

export function saveProject() {
    console.log("Project save functionality to be implemented.");
}
