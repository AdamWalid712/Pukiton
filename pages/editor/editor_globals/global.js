import { mode } from "../../../global/global.js";

export let activeFont = null;
export let pages = [];
export let currentCursor = ["navigation.svg", mode === "dark" ? "darkmode" : "lightmode"];

export function setPagesContainerCursor(cursor, mode, offX, offY) {
    const directory = `../../../global/cursors/${mode}/${cursor}`
    currentCursor[0] = cursor;
    currentCursor[1] = mode;
    document.body.style.cursor = `url(${directory}) ${offX} ${offY} ,auto`;
}

export function setActiveFont(font) {
    activeFont = font;
}
