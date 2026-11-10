import { setEraserSize, setMarkerColor, setMarkerSize, setPencilColor, setPencilSize } from "../../ReduxTk/EditorSlices/BrushsSlice";
import type { brushes } from "../../types/editor";
import { useAppDispatch, useAppSelector } from "../reduxHooks";

type target = "colors" | "currentBrushColor" | "currentBrushSize" | "mode" | "functions";


export default function useBrushSettings(target: target) : any {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(state => state.brushSlice.mode)
    const pencil = useAppSelector(state => state.brushSlice.pencil);
    const marker = useAppSelector(state => state.brushSlice.marker);
    const eraser = useAppSelector(state => state.brushSlice.eraser);

    const changeCurrentBrushColor = (color: string) => {
        if (mode === "pencil") {
            dispatch(setPencilColor(color))
        }
        else if (mode === "marker") {
            dispatch(setMarkerColor(color))
        }
    }

    const changeCurrentBrushSize = (size: number) => {
        if (mode === "pencil") {
            dispatch(setPencilSize(size))
        }
        else if (mode === "marker") {
            dispatch(setMarkerSize(size))
        }
        else {
            dispatch(setEraserSize(size))
        }
    }

    if (target === "mode") {
        return mode;
    }
    else if (target === "colors") {
        return {
            pencilColor: pencil.color,
            markerColor: marker.color
        }
    }
    else if (target === "currentBrushColor" && mode === "pencil") {
        return pencil.color
    }
    else if (target === "currentBrushColor" && mode === "marker") {
        return marker.color
    }
    else if (target === "currentBrushSize" && mode === "pencil") {
        return pencil.size
    }
    else if (target === "currentBrushSize" && mode === "marker") {
        return marker.size
    }
    else if (target === "currentBrushSize" && mode === "eraser") {
        return eraser.size
    }
    else {
        return {
            changeCurrentBrushColor : (color: string) => changeCurrentBrushColor(color) ,
            changeCurrentBrushSize : (size: number) => changeCurrentBrushSize(size)
        }
    }
}