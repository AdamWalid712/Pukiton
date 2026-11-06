import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface initialState{
    mode: "color" | "gradient" | "image",
    value : string | [string , string]
}
const initialState : initialState = {
    mode: "color",
    value :"#fff"
}
const BackgroundSlice = createSlice({
    name:"backgroundSlice",
    initialState,
    reducers:{
        setBackgroundMode(state,action : PayloadAction<"color" | "gradient" | "image">){
            state.mode = action.payload;
        },
        setBackgroundValue(state,action : PayloadAction<string | [string,string]>){
            state.value = action.payload;
        }
    }
})

export const {setBackgroundMode , setBackgroundValue} = BackgroundSlice.actions;
export default BackgroundSlice.reducer;