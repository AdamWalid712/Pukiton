import { toEditor } from "../../../../switchPages/switchPages.js";
import { glass } from "../../../../global/global.js";
import { mode } from "../../../../global/global.js";
import { showConfirm } from "../confirmDelete/confirmDeleteFunctions.js";

export default class ProjectCard {
    card = document.createElement("div");
    #nameDiv = document.createElement("div");
    #imagePlaceHolder = document.createElement("div");
    #imageContainer = document.createElement("div");
    #projectImage = document.createElement("img");
    #projectName = document.createElement("h3");
    #deleteBtn =  document.createElement("button");
    #editBtn = document.createElement("button");
    #project = undefined;

    constructor(project) {
        this.#project = project;
        this.#initCard();
    }

    #initCard() {
        this.card.className = `project-card text-black p-4 rounded-2xl hover:bg-white/10 transition-all flex flex-col items-stretch aspect-square overflow-hidden ${glass}`;
        this.card.id = this.#project.name;
        this.card.onclick = () => toEditor(this.#project.name);

        this.#initNameDiv();
        this.#initEditBtn();
        this.#initDeleteBtn();

        if(this.#project.screenshot) {
            this.#initImage()
            this.card.append(this.#imageContainer)
        }
        else {
            this.#initImagePlaceHolder()
            this.card.append(this.#imagePlaceHolder)
        }

        this.#nameDiv.append(this.#projectName, this.#editBtn, this.#deleteBtn);
        this.card.append(this.#nameDiv);
    }
    #initNameDiv(){
        this.#nameDiv.className = "w-full h-12 flex items-center mt-2 flex-shrink-0 gap-2";
        this.#projectName.innerText = this.#project.name;
        this.#projectName.setAttribute("dir", "auto");
        this.#projectName.className = `${mode === "dark" ? "text-white" : "text-black"} text-lg font-semibold flex-grow truncate text-start`;
    }
    #initDeleteBtn(){
        this.#editBtn.className = "text-blue-500 size-9 p-2 rounded-full hover:bg-blue-500/20 hover:text-blue-500 transition-all flex-shrink-0 flex items-center justify-center";
        this.#editBtn.innerHTML = '<i class="ri-edit-line text-xl"></i>';
        this.#editBtn.onclick = (e) => {
            e.stopPropagation();
            toEditor(this.#project.name);
        };
    }
    #initEditBtn(){
        this.#deleteBtn.className = `text-red-500 size-9 p-2 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all flex-shrink-0 flex items-center justify-center`;
        this.#deleteBtn.innerHTML = '<i class="ri-delete-bin-line text-xl"></i>';
        this.#deleteBtn.onclick = (e) => {
            e.stopPropagation();
            showConfirm(this.#project.name);
        };
    }
    #initImage(){
        this.#imageContainer.className = "flex-grow w-full overflow-hidden rounded-xl bg-blue-500/20";
        this.#projectImage.className = "w-full h-full block pointer-events-none object-cover";
        this.#projectImage.src = this.#project.screenshot;
        this.#imageContainer.append(this.#projectImage);
    }
    #initImagePlaceHolder() {
        this.#imagePlaceHolder.className = "flex-grow w-full overflow-hidden rounded-xl bg-blue-500/20";
    }
}
