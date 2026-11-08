// import type { RefObject } from "react"
import { RiCloseLine } from "@remixicon/react"
import type { brushes } from "../../types/brushes"
import type { visibility } from "../../types/visibility"
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setBrushColor, setBrushSize } from "../../ReduxTk/EditorSlices/BrushsSlice";
import useBrushSettings from "../../hooks/Editor/useBrushSettings";
type props = {
    visibility: visibility,
    targetedBrush: brushes,
    visibilityFn(): void
}
export default function BrushSettings({ visibility, targetedBrush, visibilityFn }: props) {
    const {brushSize} = useBrushSettings()
    const dispatch = useAppDispatch();

    const dispatchBrushColor = (color : string) => {
        dispatch(setBrushColor(color))
    }
    const dispatchBrushSize = (size :number) => {
        dispatch(setBrushSize(size))
    }
    return (
        <div
            id={`${targetedBrush}-settings-popup`}
            className={`${visibility === "visible" ? "flex" : "hidden"} flex-col py-1.5 px-2 bg-orange-200 shadow-aggressive border-2 shadow-black border-black rounded-2xl`}
        >
            <p className="text-black font-bold capitalize text-center text-xl select-none"
                onSelect={e => e.stopPropagation}
            >
                {targetedBrush}
            </p>
            <input
                min={1}
                max={targetedBrush === "eraser" ? 200 : 100}
                defaultValue={50}
                type="range"
                name={`${targetedBrush}-brush-thickness`}
                id={`${targetedBrush}-brush-thickness`}
                onChange={(e) => dispatchBrushSize(parseInt(e.target.value))}
            />
            <div className="flex justify-between items-center mt-1.5">
                <button
                    onClick={visibilityFn}
                    className="m-0 p-0 size-9 flex justify-center items-center bg-orange-50 rounded-full border border-black"
                >
                    <RiCloseLine size={25} />
                </button>
                <p className="text-black font-bold select-none">{brushSize}px</p>
                {targetedBrush === "eraser" ? "" : (
                    <div className="size-8 flex justify-center items-center rounded-full overflow-hidden ring-black ring-2">
                        <input 
                            type="color" 
                            className="scale-120 h-15" 
                            onChange={(e) => dispatchBrushColor(e.target.value)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}