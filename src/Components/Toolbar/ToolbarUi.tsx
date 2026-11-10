import {
    RiAddLine,
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
import BrushSettings from "../BrushSettings/BrushSettings";
import type { brushes } from "../../types/editor";
import type { visibility } from "../../types/visibility";
import type { changBackgroundParams } from "../../types/editor";

type props = {
    brushMode: brushes,
    pencilColor:string,
    markerColor: string,
    settingsPopUpV: visibility,
    toggleSettingsPopUpV(): void, 
    changeBrushMode(mode: brushes):void,
    changeBackground({ mode, value }: changBackgroundParams) : void
}

export default function ToolbarUI({
    brushMode,
    pencilColor,
    markerColor,
    settingsPopUpV,
    toggleSettingsPopUpV,
    changeBrushMode,
    changeBackground
}:props){
    return (
        <div className="absolute h-screen flex flex-row-reverse gap-2 items-center pl-2 justify-center  z-10">
            <div className="flex flex-col justify-start h-full py-3">
                <BrushSettings
                    visibility={settingsPopUpV}
                    visibilityFn={toggleSettingsPopUpV}
                />
            </div>
            <div className="w-11 flex flex-col justify-between h-[98vh] scrollbar-none overflow-scroll rounded-xl  p-2 py-3 bg-orange-200 ring-2 ring-black shadow-aggressive shadow-gray-900">
                <div className="flex flex-col items-center *:flex *:flex-col *:gap-1.5 *:mb-1">
                    <div className="*:cursor-pointer *:rounded-full *:p-1">
                        <div style={{
                            background: pencilColor
                        }} className={brushMode === "pencil" ? "ring-3 ring-black" : ""}>
                            <RiPencilFill
                                onClick={() => changeBrushMode("pencil")}
                                onDoubleClick={toggleSettingsPopUpV}
                            />
                        </div>

                        <div style={{
                            background: markerColor
                        }} className={brushMode === "marker" ? "ring-3 ring-black" : ""}>
                            <RiMarkPenFill
                                onClick={() => changeBrushMode("marker")}
                                onDoubleClick={toggleSettingsPopUpV}
                            />
                        </div>

                        <div className={brushMode === "eraser" ? "ring-3 ring-black" : ""}>
                            <RiEraserLine
                                onClick={() => changeBrushMode("eraser")}
                                onDoubleClick={toggleSettingsPopUpV}
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
                            <RiAlignRight />
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