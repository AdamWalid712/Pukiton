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
import useBrushSettings from "../../hooks/Editor/useBrushSettings";

type changBackgroundParams = {
    mode: "color" | "gradient" | "image",
    value: string | [string, string]
}

export default function Toolbar() {
    const dispatch = useAppDispatch()
    const { brushMode, brushColor } = useBrushSettings();
    /*================POP UPS================*/
    const [pencilSettingsV, setPencilSettingsV] = useState<visibility>("hidden");
    const [markerSettingsV, setMarkerSettingsV] = useState<visibility>("hidden");
    const [eraserSettingsV, setEraserSettingsV] = useState<visibility>("hidden");

    const hideActivePopups = () => {
        if (eraserSettingsV === "visible") {
            setEraserSettingsV("hidden");
        } else if (markerSettingsV === "visible") {
            setMarkerSettingsV("hidden");
        } else {
            setPencilSettingsV("hidden");
        }
    }

    const togglePencilSettingsPopupV = () => {
        window.getSelection()?.removeAllRanges();
        if (markerSettingsV === "visible") setMarkerSettingsV("hidden");
        if (eraserSettingsV === "visible") setEraserSettingsV("hidden");

        if (pencilSettingsV === "hidden") {
            setPencilSettingsV("visible")
        } else {
            setPencilSettingsV("hidden")
        }
    }

    const toggleMarkerSettingsPopupV = () => {
        window.getSelection()?.removeAllRanges();
        if (pencilSettingsV === "visible") setPencilSettingsV("hidden");
        if (eraserSettingsV === "visible") setEraserSettingsV("hidden");

        if (markerSettingsV === "hidden") {
            setMarkerSettingsV("visible")
        } else {
            setMarkerSettingsV("hidden")
        }
    }

    const toggleEraserSettingsPopupV = () => {
        window.getSelection()?.removeAllRanges();
        if (markerSettingsV === "visible") setMarkerSettingsV("hidden");
        if (pencilSettingsV === "visible") setEraserSettingsV("hidden");

        if (eraserSettingsV === "hidden") {
            setEraserSettingsV("visible")
        } else {
            setEraserSettingsV("hidden")
        }
    }


    const [textAlignment, setTextAlignment] = useState<"left" | "center" | "right">("left");

    const toggleTextAlignment = (): void => {
        if (textAlignment === "left") {
            setTextAlignment("center")
        } else if (textAlignment === "center") {
            setTextAlignment("right")
        } else {
            setTextAlignment("left")
        }
    }

    // other functions

    const changeBrushMode = (mode: brushes): void => {
        hideActivePopups()
        dispatch(setBrushMode(mode))
    }

    const changeBackground = ({ mode, value }: changBackgroundParams): void => {
        dispatch(setBackgroundMode(mode))
        dispatch(setBackgroundValue(value))
    }


    return (
        <div className="absolute h-screen flex flex-row-reverse gap-2 items-center pl-2 justify-center  z-10">
            <div className="flex flex-col justify-start h-full py-3">
                <BrushSettings
                    targetedBrush="pencil"
                    visibility={pencilSettingsV}
                    visibilityFn={togglePencilSettingsPopupV}
                />

                <BrushSettings
                    targetedBrush="marker"
                    visibility={markerSettingsV}
                    visibilityFn={toggleMarkerSettingsPopupV}
                />

                <BrushSettings
                    targetedBrush="eraser"
                    visibility={eraserSettingsV}
                    visibilityFn={toggleEraserSettingsPopupV}
                />
            </div>
            <div className="w-11 flex flex-col justify-between h-[98vh] scrollbar-none overflow-scroll rounded-xl  p-2 py-3 bg-orange-200 ring-2 ring-black shadow-aggressive shadow-gray-900">
                <div className="flex flex-col items-center *:flex *:flex-col *:gap-1.5 *:mb-1">
                    <div className="*:cursor-pointer *:rounded-full *:p-1">
                        <div style={{
                            background: brushMode === "pencil" ? brushColor : "",
                            color: brushMode === "pencil" && brushColor === "#000000" ? "white" : ""
                        }}>
                            <RiPencilFill
                                onClick={() => changeBrushMode("pencil")}
                                onDoubleClick={togglePencilSettingsPopupV}
                            />
                        </div>

                        <div style={{
                            background: brushMode === "marker" ? brushColor : "",
                            color: brushMode === "marker" && brushColor === "#000000" ? "white" : ""
                        }}>
                            <RiMarkPenFill
                                onClick={() => changeBrushMode("marker")}
                                onDoubleClick={toggleMarkerSettingsPopupV}
                            />
                        </div>

                        <div className={brushMode === "eraser" ? "bg-orange-50" : ""}>
                            <RiEraserLine
                                onClick={() => changeBrushMode("eraser")}
                                onDoubleClick={toggleEraserSettingsPopupV}
                            />
                        </div>
                        <div>
                            <RiShapesFill />
                        </div>
                    </div>

                    <div>
                        <RiSeparator />
                    </div>

                    <div className="*:cursor-pointer *:rounded-full *:p-1">
                        <div><RiText /></div>
                        <div><RiPaintBrushFill /></div>
                        <div><RiBold /></div>
                        <div><RiFontSansSerif /></div>
                        <div><RiItalic /></div>

                        <div>
                            {
                                textAlignment === "right" ? <RiAlignRight onClick={toggleTextAlignment} />
                                    : textAlignment === "center" ? <RiAlignCenter onClick={toggleTextAlignment} />
                                        : <RiAlignLeft onClick={toggleTextAlignment} />
                            }
                        </div>
                    </div>

                    <div>
                        <RiSeparator />
                    </div>

                    <div className="**:cursor-pointer *:p-1 *:rounded-full">
                        <div className="flex w-6 h-8">
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

                        <div>
                            <RiFriendicaFill />
                        </div>
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