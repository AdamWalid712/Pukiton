import { renderHistory } from "./historyFunctions.js";
import { confirmOverlay } from "../confirmDelete/confirmDelete.js";

export const history = document.createElement("div");
history.id = "home-history";
history.className = "w-11/12 gap-4 mt-28 mb-10 mx-auto relative min-h-[calc(100vh-10rem)] text-black";

export { confirmOverlay };

// Initial render
renderHistory(history);
