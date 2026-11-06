import {
    RiAddLine,
    RiAlignCenter,
    RiAlignLeft,
    RiAlignRight,
    RiBold,
    RiEraserLine,
    RiFontSansSerif,
    RiFriendicaFill,
    RiImageFill,
    RiItalic,
    RiMarkPenFill,
    RiMoonClearFill,
    RiPaintBrushFill,
    RiPaintFill,
    RiPencilFill,
    RiSeparator,
    RiShapesFill,
    RiText
} from "@remixicon/react";

import { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setBrushMode } from "../../ReduxTk/EditorSlices/BrushsSlice";
import { setBackgroundMode, setBackgroundValue } from "../../ReduxTk/EditorSlices/BackgroundSlice";
import BrushSettings from "../BrushSettings/BrushSettings";
import type { brushes } from "../../types/brushes";
import type { visibility } from "../../types/visibility";
type changBackgroundParams = {
    mode: "color" | "gradient" | "image",
    value: string | [string, string]
}

export default function Toolbar() {
    const [textAlignment, setTextAlignment] = useState<"left" | "center" | "right">("left");
    const [pencilSettingsVisi,setPencilSettingsVisi] = useState<visibility>("hidden");
    const dispatch = useAppDispatch();


    const changeBrushMode = (mode: brushes): void => {
        dispatch(setBrushMode(mode))
    }

    const togglePencilSettingsVisi = () =>{
        if(pencilSettingsVisi === "hidden"){
            setPencilSettingsVisi("visible")
        } else {
            setPencilSettingsVisi("hidden")
        }
    }

    const changeBackground = ({ mode, value }: changBackgroundParams): void => {
        dispatch(setBackgroundMode(mode))
        dispatch(setBackgroundValue(value))
    }

    const toggleTextAlignment = (): void => {
        if (textAlignment === "left") {
            setTextAlignment("center")
        } else if (textAlignment === "center") {
            setTextAlignment("right")
        } else {
            setTextAlignment("left")
        }
    }
    return (
        <div className="absolute h-screen flex flex-row-reverse gap-2 items-center pl-2 justify-center  z-10">
            <div className="flex flex-col justify-start h-full py-3">
                <BrushSettings 
                    targetedBrush="pencil" 
                    visibility={pencilSettingsVisi} visibilityFn={togglePencilSettingsVisi}
                />
            </div>
            <div className="w-11 flex flex-col justify-between h-[98vh] scrollbar-none overflow-scroll rounded-xl  p-2 py-3 bg-orange-200 ring-2 ring-black shadow-aggressive shadow-gray-900">
                <div className="flex flex-col items-center *:flex *:flex-col *:gap-1.5 *:mb-1">
                    <div className="*:cursor-pointer">
                        <RiPencilFill onClick={() => changeBrushMode("pencil")} onDoubleClick={togglePencilSettingsVisi}/>
                        <RiMarkPenFill onClick={() => changeBrushMode("marker")} />
                        <RiEraserLine onClick={() => changeBrushMode("eraser")} />
                        <RiShapesFill />
                    </div>

                    <div>
                        <RiSeparator />
                    </div>

                    <div className="*:cursor-pointer">
                        <RiText />
                        <RiPaintBrushFill />
                        <RiFontSansSerif />
                        <RiBold />
                        <RiItalic />
                        {
                            textAlignment === "right" ? <RiAlignRight onClick={toggleTextAlignment} />
                                : textAlignment === "center" ? <RiAlignCenter onClick={toggleTextAlignment} />
                                    : <RiAlignLeft onClick={toggleTextAlignment} />
                        }
                    </div>

                    <div>
                        <RiSeparator />
                    </div>

                    <div className="**:cursor-pointer">
                        <div className="flex w-6 h-6">
                            <label htmlFor="bg-color"><RiPaintFill /></label>
                            <input
                                type="color"
                                name="bg-color"
                                id="bg-color" className=" w-0 h-0"
                                onChange={(e) => changeBackground({ mode: "color", value: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="bg-image"><RiImageFill /></label>
                            <input
                                type="file"
                                className="hidden"
                                id="bg-image"
                                name="bg-image"
                            />
                        </div>
                        <RiFriendicaFill />
                    </div>
                    <div>
                        <RiSeparator />
                    </div>
                    <div className="*:cursor-pointer">
                        <RiAddLine size={27} />
                        <RiMoonClearFill />
                    </div>
                </div>
            </div>
        </div>
    )
}