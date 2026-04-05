class Storage {
    constructor(storage) {
        this.storage = storage;
    }

    createProject(name,data){
        const project = {
            "name":name,
            "data":data,
            "screenshot": null
        };
        this.storage.setItem(`${project.name}`,JSON.stringify(project));
    }

    deleteProject(name){
        this.storage.removeItem(`${name}`);
    }

    updateProject(name, newData){
        this.storage.removeItem(`${name.trim}`);
        this.storage.setItem(`${name}`,JSON.stringify(newData));
    }

    getProject(name){
        return JSON.parse(this.storage.getItem(`${name}`));
    }

    setTheme(theme) {
        this.storage.setItem("theme", theme);
    }

    getTheme() {
        return this.storage.getItem("theme");
    }

    getAllProjects() {
        if (this.storage.length === 0) return {}

        const allProjects = {};
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            const project = JSON.parse(this.storage.getItem(key));
            allProjects[key] = project;
        }

        console.log(allProjects);

        return allProjects;
    }
}

export const storage = new Storage(localStorage);
// storage.storage.clear()
