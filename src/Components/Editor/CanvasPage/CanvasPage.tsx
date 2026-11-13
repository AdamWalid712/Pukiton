import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../../hooks/reduxHooks";
import useBrushSettings from "../../../hooks/Editor/useBrushSettings";

export default function CanvasPage() {
    const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
    const drawingContext = drawingCanvasRef.current?.getContext("2d")
    const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
    const bgValue = useAppSelector((state) => state.backgroundSlice.value);
    const bgMode = useAppSelector((state) => state.backgroundSlice.mode);

    const [isDrawing,setIsDrawing] = useState<boolean>(false);

    const currentBrush = useBrushSettings("mode")
    const currentBrushSize = useBrushSettings("currentBrushSize")
    const currentBrushColor = useBrushSettings("currentBrushColor");

    useEffect(()=>{
        if(!backgroundCanvasRef.current) return;
        const backgroundContext = backgroundCanvasRef.current.getContext("2d");
        if(!backgroundContext) return;

        if(bgMode === "color" && typeof bgValue === "string"){
            backgroundContext.fillStyle = bgValue;
        }
        const h = backgroundCanvasRef.current.height;
        const w = backgroundCanvasRef.current.width;
        backgroundContext?.fillRect(0,0,w,h)
    },[bgValue,bgMode])

    const drawingStart = (e: React.MouseEvent<HTMLCanvasElement>)=>{
        if(!drawingContext) return;
        setIsDrawing(true)
        if (currentBrush !== "eraser"){
            drawingContext.lineCap = currentBrush === "marker"? "square" : "round";
            drawingContext.lineJoin = currentBrush === "marker"? "bevel" : "round";
        }else {
            drawingContext.globalCompositeOperation = "destination-out";
        }
        drawingContext.beginPath();
        drawingContext.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
        drawingContext.lineWidth = currentBrushSize;
        drawingContext.strokeStyle = currentBrushColor;
    }

    const drawing = (e: React.MouseEvent<HTMLCanvasElement>) =>{
        if(!isDrawing || !drawingContext) return;
        drawingContext.lineTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
        drawingContext.stroke()
    }

    const drawingEnd = ()=>{
        if(!drawingContext || !isDrawing) return;
        setIsDrawing(false)
    }

    return (
        <div className=" relative w-screen h-screen">
            <canvas ref={backgroundCanvasRef} width={window.innerWidth} height={`${window.innerHeight}px`}></canvas>
            <canvas 
                onMouseDown={(e)=> drawingStart(e)}
                onMouseMove={(e)=> drawing(e)}
                onMouseUp={drawingEnd}
                ref={drawingCanvasRef} 
                width={`${window.innerWidth}px`} 
                height={`${window.innerHeight}px`} 
                className="absolute top-0 left-0"
            ></canvas>
        </div>
    )
}