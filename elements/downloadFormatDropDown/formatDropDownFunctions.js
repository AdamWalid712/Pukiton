import {pageNumber} from "../pageTools/pageTools.js";
import {pages} from "../../global/globals.js";

export function downloadPage(event){
    const currentPageIndex = parseInt(pageNumber.innerText.split(" ")[1]) - 1;
    const currentPage = pages[currentPageIndex];
    const format = event.target.innerText.toLowerCase();

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = currentPage.getWidth - 2;
    tempCanvas.height = currentPage.getHeight;

    tempCtx.drawImage(currentPage.backgroundCanvas, 0, 0);
    tempCtx.drawImage(currentPage.drawwingCanvas, 0, 0);

     event.target.href = tempCanvas.toDataURL(`image/${format}`);
     event.target.download = currentPage.id +"."+format;
}
