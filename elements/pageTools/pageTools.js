import {changePageBackgroundColor,changeBackgroundImage,createNewPage} from "./pageToolsFunctions.js";
import {glass} from "../../global/globals.js";

export const pageToolsContainer = document.createElement("div");
export const newPageBtn = document.createElement("button");
export const pageNumber = document.createElement("p");
export const pageColorInputDiv = document.createElement("div");
export const pageColorInput = document.createElement("input");
export const pageBackImageDiv = document.createElement("div");
export const pageBackImageInp = document.createElement("input");
export const pageBackImageLabel = document.createElement("label");

pageNumber.innerText = "Page 1";
pageNumber.className = " m-0 p-0 text-2xl w-max ";

pageColorInputDiv.className = "size-6 rounded-full border-2 border-black border-solid overflow-hidden m-0";
pageColorInput.type="color"
pageColorInput.value = "#ffffff";
pageColorInput.className = "size-12  translate-y-[-40%] translate-x-[-50%] ";

pageBackImageInp.type = "file";
pageBackImageInp.accept = "image/*";
pageBackImageInp.className = "hidden";
pageBackImageInp.id = "back-image-inp";
pageBackImageInp.name = pageBackImageInp.id;

pageBackImageDiv.className=" size-8 h-full  p-0 m-0 flex justify-center items-center rounded-full";
pageBackImageLabel.className = " ri-image-add-fill text-2xl h-full w-full flex justify-center items-center";
pageBackImageLabel.htmlFor = pageBackImageInp.id;

newPageBtn.className = "ri-add-large-line size-8 text-2xl p-0 m-0";

pageToolsContainer.className = `${glass} h-fit pr-2 pl-4 rounded-full flex justify-center items-center w-max text-black fixed top-[15px] left-[50%] translate-x-[-50%] flex gap-2 `;
pageToolsContainer.id = "pageTools";

pageColorInput.oninput = () => changePageBackgroundColor()

pageBackImageInp.oninput =() => changeBackgroundImage();

newPageBtn.onclick = () => createNewPage()


pageColorInputDiv.append(pageColorInput);
pageBackImageDiv.append(pageBackImageInp,pageBackImageLabel);
pageToolsContainer.append(pageNumber,pageColorInputDiv,pageBackImageDiv,newPageBtn);