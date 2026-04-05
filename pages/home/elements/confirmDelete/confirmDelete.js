import { hideConfirm, handleConfirmDelete } from "./confirmDeleteFunctions.js";
import { glass } from "../../../../global/global.js";

export const confirmOverlay = document.createElement("div");
confirmOverlay.id = "confirm-overlay";
confirmOverlay.className = "fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300";

const confirmPanel = document.createElement("div");
confirmPanel.id = "confirm-panel";
confirmPanel.className = `p-8 rounded-[2.5rem] border border-black/10 dark:border-white/10 flex flex-col items-center gap-6 max-w-sm w-11/12 transform scale-95 transition-transform duration-300 ${glass}`;
confirmPanel.classList.add("text-black");

confirmPanel.innerHTML = `
    <div class="size-20 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-black">
        <i class="ri-delete-bin-7-line text-4xl"></i>
    </div>
    <div class="text-center text-black">
        <h2 class="text-2xl font-bold text-black">Delete Project?</h2>
        <p class="text-black/60 dark:text-white/60 mt-2 text-black">This action is permanent and cannot be undone.</p>
    </div>
    <div class="flex gap-4 w-full text-black">
        <button id="cancel-delete" class="flex-1 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-all">Cancel</button>
        <button id="confirm-delete" class="flex-1 py-4 rounded-full bg-red-500 text-white font-bold hover:shadow-lg hover:shadow-red-500/40 hover:scale-105 transition-all">Delete</button>
    </div>
`;

confirmOverlay.append(confirmPanel);

confirmPanel.querySelector("#cancel-delete").onclick = hideConfirm;
confirmPanel.querySelector("#confirm-delete").onclick = handleConfirmDelete;
