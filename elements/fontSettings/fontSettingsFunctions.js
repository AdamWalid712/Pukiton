import {activeFont} from "../../global/globals.js";
import {fontColorInput,fontThickness,fontOpacity} from "./fontSettings.js";
import {pencilFont,markerFont} from "../bottomTools/bottomTools.js";
import {setAllPagesDrawingMode} from "../bottomTools/bottomToolsFunctions.js"

export function changeFontColor() {
    fontThickness.style.backgroundColor = fontColorInput.value;
    fontOpacity.style.background = `linear-gradient(90deg,transparent, ${fontColorInput.value})`

    if(activeFont === null)
        return;
    else if (activeFont === "pencil")
        pencilFont.style.background = fontColorInput.value;
    else
        markerFont.style.background = fontColorInput.value;

    setAllPagesDrawingMode();
}