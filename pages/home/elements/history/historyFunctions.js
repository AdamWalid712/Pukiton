import { storage } from "../../../../storage/storage.js";
import ProjectCard from "../projectCard/projectCard.js";

export function renderHistory(history) {
    history.innerHTML = "";
    const allProjects = storage.getAllProjects();

    if (Object.keys(allProjects).length === 0) {
        noProjects(history);
    } else {
        history.className = "w-11/12 gap-4 mt-28 mb-10 mx-auto relative min-h-[calc(100vh-10rem)] text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
        viewAllProjects(allProjects, history);
    }
}

function noProjects(history) {
    history.className = "w-11/12 mt-28 mb-10 mx-auto relative min-h-[calc(100vh-10rem)] text-black flex items-center justify-center";
    const noProjects = document.createElement("p");
    noProjects.innerText = "No projects yet";
    noProjects.className = "text-black text-xl opacity-50";
    history.append(noProjects);
}

function viewAllProjects(allProjects, history) {
    Object.values(allProjects).forEach(project => {
        const projectCard = new ProjectCard(project);
        history.append(projectCard.card);
    });
}
