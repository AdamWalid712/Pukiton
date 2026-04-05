import home from "../pages/home/home.js";
import {editorContainer} from "../pages/editor/editor.js";
import {renderHistory} from "../pages/home/elements/history/historyFunctions.js";
import {setElementsCursor,switchMode,mode} from "../global/global.js";
import {switchEditorMode} from "../pages/editor/elements/bottomTools/bottomToolsFunctions.js"

export function toHome() {
    if (document.getElementById("editorContainer"))
          document.body.removeChild(editorContainer);

    document.body.appendChild(home);
    renderHistory(home.querySelector("#home-history"))
    setElementsCursor()
    switchMode(mode)
}

export function toEditor(projectName) {
    if(document.getElementById("homeContainer"));
          document.body.removeChild(home);

    editorContainer.dataset.projectName = projectName;
    document.body.appendChild(editorContainer);
    setElementsCursor();
    switchEditorMode(mode)
}