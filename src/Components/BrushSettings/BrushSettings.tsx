// import type { RefObject } from "react"
import { RiCloseLine } from "@remixicon/react"
import type { brushes } from "../../types/brushes"
import type { visibility } from "../../types/visibility"
import { useState} from "react";
type props = {
    visibility : visibility,
    targetedBrush : brushes,
    visibilityFn():void
}
export default function BrushSettings({visibility,targetedBrush,visibilityFn}:props){
    const [fontThickness,setFontThickness] = useState<number>(10);
    return(
        <div 
            id={`${targetedBrush}-settings-popup`}
            className={`${visibility === "visible" ? "flex" : "hidden"} flex-col py-1.5 px-2 bg-orange-200 shadow-aggressive border-2 shadow-black border-black rounded-2xl`}
        >
            <p className="text-black font-bold capitalize text-center text-xl">{targetedBrush}</p>
            <input 
                min={1}
                max={100}
                defaultValue={fontThickness}
                type="range" 
                name={`${targetedBrush}-brush-thickness`} 
                id={`${targetedBrush}-brush-thickness`}  
                onChange={(e) => setFontThickness(parseInt(e.target.value))}
            />
            <div className="flex justify-between items-center mt-1.5">
                <button 
                    onClick={visibilityFn}
                    className="m-0 p-0 size-9 flex justify-center items-center bg-orange-50 rounded-full border border-black"
                >
                    <RiCloseLine size={25}/>
                </button>
                <p className="text-black font-bold">{fontThickness}px</p>
                <div className="size-8 flex justify-center items-center rounded-full overflow-hidden ring-black ring-2">
                    <input type="color" className="scale-120 h-15"/>
                </div>
            </div>
        </div>
    )
}