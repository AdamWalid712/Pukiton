/************************CANVAS*************************/
import {pages, setElementsCursor, setPagesContainerCursor} from "../global/globals.js";
import {Page} from '../elements/pageObject&pagesContainer/pageObject.js';
import {pagesContainer} from '../elements/pageObject&pagesContainer/pagesContainer.js';
import {pageToolsContainer} from "../elements/pageTools/pageTools.js";
import {addShapesPanel} from "../elements/addShapesPanel/addShapesPanel.js";
import {formatDropDown} from "../elements/downloadFormatDropDown/formatDropDown.js";
import {textInputPanel} from "../elements/textInputPanel/textInputPanel.js";

import {fontSettings, erasingFontSliderDiv, fontColorInput}
    from "../elements/fontSettings/fontSettings.js";
import { bottomTools}from "../elements/bottomTools/bottomTools.js";

const mainPage = new Page(1);

pages.push(mainPage);

pagesContainer.append(mainPage.pageContainer);


document.body.append(pagesContainer,pageToolsContainer,fontSettings,erasingFontSliderDiv,bottomTools,addShapesPanel,formatDropDown,textInputPanel);

document.querySelectorAll("*").forEach(element =>{
    element.className += "  transition-all ease-in-out duration-200"
});

document.querySelectorAll("button,label").forEach(button => {
    button.className += ` rounded-full p-0 m-0 hover:bg-[var(--active-font-color)] hover:scale-110`;
});

const updateGlobalHoverColor = () => {
    document.documentElement.style.setProperty("--active-font-color", fontColorInput.value);
};

updateGlobalHoverColor();
fontColorInput.addEventListener("input", updateGlobalHoverColor);

setPagesContainerCursor("navigation.svg","lightmode",0,0);
setElementsCursor()