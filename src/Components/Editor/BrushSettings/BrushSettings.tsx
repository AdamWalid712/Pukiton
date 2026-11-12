import { RiCloseLine } from "@remixicon/react";
import type { visibility } from "../../../types/visibility";
import useBrushSettings from "../../../hooks/Editor/useBrushSettings";
type props = {
    visibility: visibility,
    visibilityFn(): void
}
export default function BrushSettings({ visibility, visibilityFn }: props) {
    const targetedBrush = useBrushSettings("mode") 
    const currentBrushColor = useBrushSettings("currentBrushColor");
    const currentBrushSize = useBrushSettings("currentBrushSize");
    const {changeCurrentBrushColor,changeCurrentBrushSize} = useBrushSettings("functions");


    return targetedBrush !== "unset" ?(
        <div
            id={`${targetedBrush}-settings-popup`}
            className={`${visibility === "visible" ? "flex" : "hidden"} flex-col py-1.5 px-2 bg-orange-200 shadow-aggressive border-2 shadow-black border-black rounded-2xl`}
        >
            <p className="text-black font-bold capitalize text-center text-xl select-none">
                {targetedBrush}
            </p>
            <input
                min={1}
                max={targetedBrush === "eraser" ? 200 : 100}
                defaultValue={currentBrushSize}
                type="range"
                name="brush-thickness"
                id="brush-thickness"
                onChange={(e) => changeCurrentBrushSize(parseInt(e.target.value))}
            />
            <div className="flex justify-between items-center mt-1.5">
                <button
                    onClick={visibilityFn}
                    className="m-0 p-0 size-9 flex justify-center items-center bg-orange-50 rounded-full border border-black"
                >
                    <RiCloseLine size={25} />
                </button>
                <p className="text-black font-bold select-none">{currentBrushSize}px</p>
                {targetedBrush === "eraser" ? "" : (
                    <div className="size-8 flex justify-center items-center rounded-full overflow-hidden ring-black ring-2">
                        <input 
                            type="color" 
                            className="scale-120 h-15" 
                            onChange={(e) => changeCurrentBrushColor(e.target.value)}
                            value={currentBrushColor}
                        />
                    </div>
                )}
            </div>
        </div>
    ) : (<></>)
}