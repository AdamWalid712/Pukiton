import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { brushes } from "../../types/brushes";

interface BrushState {
    mode: brushes;
    color: string;
    size: number;
}

const initialState : BrushState = {
    mode: "pencil",
    color: "#000",
    size: 5
}
const brushSlice = createSlice({
    name: "brush",
    initialState,
    reducers: {
        setBrushMode(state, action: PayloadAction<brushes>){
            state.mode = action.payload;
        },
        setBrushColor(state,action: PayloadAction<string>){
            state.color = action.payload;
        },
        setBrushSize(state,action: PayloadAction<number>){
            state.size = action.payload;
        }
    }
})

export const {setBrushMode,setBrushColor,setBrushSize} = brushSlice.actions;
export default brushSlice.reducer;