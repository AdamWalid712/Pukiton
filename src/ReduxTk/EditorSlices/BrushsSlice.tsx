import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { brushes } from "../../types/editor";

type brushSettings = {
    color: string,
    size: number
}

type BrushState = {
    mode: brushes,
    pencil: brushSettings,
    marker: brushSettings
    eraser: {
        size : number
    }
}

const initialState: BrushState = {
    mode: "pencil",
    pencil:{
        size: 10,
        color:"#f0854c"
    },
    marker:{
        size: 10,
        color:"#f55f41"
    },
    eraser : {
        size:20,
    }
}
const brushSlice = createSlice({
    name: "brush",
    initialState,
    reducers: {
        setBrushMode(state, action: PayloadAction<brushes>) {
            state.mode = action.payload;
            console.log(state.mode)
        },
        setPencilSize(state, action: PayloadAction<number>) {
            state.pencil = {...state.pencil,size:action.payload};
        },
        setPencilColor(state, action: PayloadAction<string>) {
            state.pencil = {...state.pencil,color:action.payload};
        },
        setMarkerColor(state, action: PayloadAction<string>) {
            state.marker = {...state.marker,color:action.payload};
        },
        setMarkerSize(state, action: PayloadAction<number>) {
            state.marker = {...state.marker,size:action.payload};
        },
        setEraserSize(state,action: PayloadAction<number>){
            state.eraser = {size:action.payload}
        }
    }
})

export const { 
    setBrushMode, 
    setPencilColor, 
    setPencilSize , 
    setMarkerColor,
    setMarkerSize, 
    setEraserSize 
} = brushSlice.actions;

export default brushSlice.reducer;