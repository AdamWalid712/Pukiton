/************************CANVAS*************************/
import {pages, setPagesContainerCursor} from "./editor_globals/global.js";
import {setElementsCursor} from "../../global/global.js";
import {mode} from "../../global/global.js";
import {Page} from './elements/pageObject&pagesContainer/pageObject.js';
import {pagesContainer} from './elements/pageObject&pagesContainer/pagesContainer.js';
import {pageToolsContainer} from "./elements/pageTools/pageTools.js";
import {addShapesPanel} from "./elements/addShapesPanel/addShapesPanel.js";
import {textInputPanel} from "./elements/textInputPanel/textInputPanel.js";

import {fontSettings, eraserSettingsBar, fontBgTypeWrapper} from "./elements/fontSettings/fontSettings.js";
import { bottomTools}from "./elements/bottomTools/bottomTools.js";
import {updateFontUI} from "./elements/fontSettings/fontSettingsFunctions.js";

const mainPage = new Page(1);

pages.push(mainPage);

pagesContainer.append(mainPage.pageContainer);

export const editorContainer = document.createElement("div");
editorContainer.id = "editorContainer";
editorContainer.className = "w-screen h-screen relative";

editorContainer.append(pagesContainer,pageToolsContainer,fontSettings,eraserSettingsBar,bottomTools,addShapesPanel,textInputPanel, fontBgTypeWrapper);

editorContainer.querySelectorAll("*").forEach(element =>{
    element.className += "  transition-all ease-in-out duration-200"
});
editorContainer.querySelectorAll("button,label").forEach(button => {
    button.className += ` rounded-full p-0 m-0 hover:[background:var(--active-font-color)] hover:scale-110`;
});

setPagesContainerCursor("navigation.svg", mode === "dark" ? "darkmode" : "lightmode", 0, 0);
setElementsCursor();
updateFontUI();
