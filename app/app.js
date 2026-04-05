import {mode} from "../global/global.js";
import {toHome} from "../switchPages/switchPages.js";

toHome()
document.body.className += ` ${mode === "dark" ? "bg-black" : "bg-white"}`;