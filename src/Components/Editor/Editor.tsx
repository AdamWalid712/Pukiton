import type React from "react";
import Toolbar from "../Toolbar/Toolbar";
import CanvasPage from "../CanvasPage/CanvasPage";
import AIChat from "../AIChat/AIChat";

export default function Editor(): React.JSX.Element {
    return (
        <div className="relative flex w-screen h-screen">
            <Toolbar />
            <CanvasPage />
            <AIChat />
        </div>
    )
}