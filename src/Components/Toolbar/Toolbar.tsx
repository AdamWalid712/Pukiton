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


export default function Toolbar() {
    const [textAlignment, setTextAlignment] = useState("left");

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
        <div className="absolute h-screen flex items-center pl-2 justify-center w-11">
            <div className="flex flex-col justify-between h-[98vh] rounded-xl  p-2 py-3 bg-orange-200 ring-2 ring-black shadow-aggressive shadow-gray-900">
                <div className="flex flex-col justify-between *:flex *:flex-col *:gap-1.5 *:mb-1.5">
                    <div className="*:cursor-pointer">
                        <RiPencilFill />
                        <RiMarkPenFill />
                        <RiEraserLine />
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

                    <div className="*:cursor-pointer">
                        <RiPaintFill />
                        <RiFriendicaFill />
                        <RiImageFill />
                    </div>
                </div>
                <div className="*:cursor-pointer">
                    <RiAddLine size={27} className="mb-2.5"/>
                    <RiMoonClearFill />
                </div>
            </div>
        </div>
    )
}