import { nav } from "./elements/nav/nav.js";
import { projectPanel } from "./elements/newProjectPanel/newProjectPanel.js";
import {history,confirmOverlay} from "./elements/history/history.js";

// Home Elements main file
const home = document.createElement("div");
home.id = "homeContainer";
home.className = "min-w-screen min-h-screen relative";

home.append(nav, projectPanel, history,confirmOverlay);

export default home;