import { RiBardFill, RiCloseLargeFill } from "@remixicon/react";
import { useState } from "react";
import AIChatBox from "../AIChatBox/AIChatBox";

export default function AIChat() {
    const [xPosition, setXPosition] = useState(100);
    const toggleXPosition = (): void => {
        if (xPosition === 100) {
            setXPosition(0)
        } else {
            setXPosition(100)
        }
    }
    return (
        <div className="flex flex-col items-end absolute right-0 pt-1.5 pr-2 overflow-hidden h-screen">
            <div className="relative h-[98vh] pl-1 pt-1 w-64">
                <div className={`z-4 absolute right-1.5 p-2 size-10 bg-orange-200 rounded-full text-lg cursor-pointer ${xPosition === 100 ? "ring-2 shadow-aggressive" : ""} ring-black shadow-black`}>
                    { 
                        xPosition === 100 ? 
                            <RiBardFill onClick={toggleXPosition} /> 
                        :
                            <RiCloseLargeFill onClick={toggleXPosition} />
                    }
                </div>
                <AIChatBox xPosition={xPosition} />
            </div>
        </div>
    )
}