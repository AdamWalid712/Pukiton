import { RiBardFill, RiCloseLargeFill } from "@remixicon/react";
import { useState } from "react";
import AIChatBox from "../AIChatBox/AIChatBox";
import type { visibility } from "../../types/visibility";

export default function AIChat() {
    const [visibility, setVisibility] = useState<visibility>("hidden");
    const toggleVisibility = (): void => {
        if (visibility === "visible") {
            setVisibility("hidden")
        } else {
            setVisibility("visible")
        }
    }
    return (
        <div className="flex flex-col items-end absolute right-0 pt-1.5 pr-2 overflow-hidden h-screen">
            <div className="relative h-[98vh] pl-1 pt-1 w-64">
                <button 
                    onClick={toggleVisibility}
                    className={`z-4 absolute right-1.5 p-2 size-10 bg-orange-200 rounded-full text-lg cursor-pointer ${visibility === "hidden" ? "ring-2 shadow-aggressive" : ""} ring-black shadow-black`}
                >
                    { 
                        visibility === "hidden" ? 
                            <RiBardFill /> 
                        :
                            <RiCloseLargeFill  />
                    }
                </button>
                <AIChatBox visibility={visibility} />
            </div>
        </div>
    )
}