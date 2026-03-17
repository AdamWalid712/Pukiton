import {glass} from "../../global/globals.js";
import {downloadPage} from "./formatDropDownFunctions.js";

export const formatDropDown = document.createElement("div");
const dropDownHeading = document.createElement("h2");
export const JPGBtn = document.createElement("a");
export const PNGBtn = document.createElement("a");
export const WEBPBtn = document.createElement("a");
const btnsDiv = document.createElement("div");

btnsDiv.className = " flex gap-3";
dropDownHeading.className = "text-lg font-bold text-black";

[PNGBtn,JPGBtn,WEBPBtn].forEach(btn => {
    btn.className = ` text-lg font-bold text-black rounded-full py-1 px-2 cursor-pointer`;
});

dropDownHeading.innerText = "Download In Format";
PNGBtn.innerText = "PNG";
JPGBtn.innerText = "JPG";
WEBPBtn.innerText = "WEBP";

PNGBtn.onclick = (e) => downloadPage(e);
JPGBtn.onclick = (e) => downloadPage(e);
WEBPBtn.onclick = (e) => downloadPage(e);

formatDropDown.className = `${glass} flex flex-col items-center justify-self-center gap-3 fixed bottom-16 p-2 m-0 rounded-3xl hidden`;
formatDropDown.id = "formatDropDown";
btnsDiv.append(JPGBtn,PNGBtn,WEBPBtn)
formatDropDown.append(dropDownHeading,btnsDiv);