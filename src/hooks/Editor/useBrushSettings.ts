import { useAppSelector } from "../reduxHooks";

export default function useBrushSettings () {
    const brushMode = useAppSelector((state)=> state.brushSlice.mode);
    const brushColor = useAppSelector((state)=> state.brushSlice.color);
    const brushSize = useAppSelector((state)=> state.brushSlice.size);

    return{
        brushMode,
        brushColor,
        brushSize
    }
}