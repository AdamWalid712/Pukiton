export let glass = `glass-shadow backdrop-blur-sm backdrop-brightness-150 backdrop-contrast-55 border-y-2 border-y-black`;
export let activeFont = null;
export let pages = [];
export let mode = "light";
export let currentCursor = ["navigation.svg","lightmode"];

export function setPagesContainerCursor(cursor,mode,offX,offY){
    const directory = `../cursors/${mode}/${cursor}`
    currentCursor[0] = cursor;
    currentCursor[1] = mode;

    document.getElementById("pagesContainer").style.cursor = `url(${directory}) ${offX} ${offY} ,auto`;
}

export function setElementsCursor(){
    ["pageTools","fontSettings","bottomTools","addShapesPanel","formatDropDown","textInputPanel"].forEach(id =>{
        const element = document.getElementById(id);

        let cursorFolder;
        if (mode === "light")
            cursorFolder = "lightmode";
        else
            cursorFolder = "darkmode";

        element.style.cursor = `url(../cursors/${cursorFolder}/navigation.svg) 0 0 ,auto`;
        element.querySelectorAll("*").forEach(child =>{
            child.style.cursor = `url(../cursors/${cursorFolder}/navigation.svg) 0 0 ,auto`;
        });
    })
}

export function setActiveFont(font){
    activeFont = font;
}

export function setMode(newMode){
    if (newMode !== "light" && newMode !== "dark") {
        throw new Error('invalid mode mode must be "light" or "dark"')
    }
    mode = newMode;
}

