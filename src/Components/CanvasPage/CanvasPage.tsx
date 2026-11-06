import { useEffect, useRef } from "react"
import { useAppSelector } from "../../hooks/reduxHooks";

export default function CanvasPage() {
    // const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
    const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
    const bgColor = useAppSelector((state) => state.backgroundSlice.value);
    const bgMode = useAppSelector((state) => state.backgroundSlice.mode);
    useEffect(()=>{
        
        if(!backgroundCanvasRef.current) return;
        const backgroundContext = backgroundCanvasRef.current.getContext("2d");
        if(!backgroundContext) return;

        if(bgMode === "color" && typeof bgColor === "string"){
            backgroundContext.fillStyle = bgColor;
        }
        const h = backgroundCanvasRef.current.height;
        const w = backgroundCanvasRef.current.width;
        backgroundContext?.fillRect(0,0,w,h)
    },[bgColor,bgMode])

    return (
        <div className="relative w-screen h-screen">
            <canvas ref={backgroundCanvasRef} width={`${window.innerWidth}px`} height={`${window.innerHeight}px`}></canvas>
            {/* <canvas ref={drawingCanvasRef} className="absolute"></canvas> */}
        </div>
    )
}