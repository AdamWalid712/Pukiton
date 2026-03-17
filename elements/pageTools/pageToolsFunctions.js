import {Page} from "../pageObject&pagesContainer/pageObject.js";
import {pagesContainer} from "../pageObject&pagesContainer/pagesContainer.js";
import {pages,activeFont} from "../../global/globals.js";
import {pageNumber,pageColorInput,pageBackImageInp} from "./pageTools.js";
import {erasingFontSlider} from "../fontSettings/fontSettings.js";
import {setAllPagesDrawingMode,setAllPagesErasingMode} from "../bottomTools/bottomToolsFunctions.js";
import {eraser} from "../bottomTools/bottomTools.js";

export function changePageBackgroundColor(){
    const currentPage = pages[parseInt(pageNumber.innerText.split(" ")[1]) -1];
    currentPage.changeBackgroundColor(pageColorInput.value);
    currentPage.background = "color"
    erasingFontSlider.style.background = pageColorInput.value;
}

export function changeBackgroundImage(){
    const imageUrl = URL.createObjectURL( pageBackImageInp.files[0]);
    const currentPage = pages[parseInt(pageNumber.innerText.split(" ")[1]) -1];
    const bgImage = new Image(currentPage.width,currentPage.height);
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
            const pageColorGetterById =parseInt(element.target.id.split(" ")[1]) - 1
            pageColorInput.value = pages[pageColorGetterById].pageBackgroundColor;
            erasingFontSlider.style.background = pages[pageColorGetterById].pageBackgroundColor;
        }
    })
},{threshold: 0.7});

function observeAllPages(){
    pages.forEach(page =>{
        observer.observe(page.pageContainer)
    })
}