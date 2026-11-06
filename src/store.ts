import { configureStore } from "@reduxjs/toolkit";
import brushReducer from "./ReduxTk/EditorSlices/BrushsSlice";
import backgroundReducer from "./ReduxTk/EditorSlices/BackgroundSlice";

export const store = configureStore({
    reducer:{
        "brushSlice": brushReducer,
        "backgroundSlice": backgroundReducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch