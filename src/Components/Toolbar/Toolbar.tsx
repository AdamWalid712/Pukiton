import { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setBrushMode } from "../../ReduxTk/EditorSlices/BrushsSlice";
import { setBackgroundMode, setBackgroundValue } from "../../ReduxTk/EditorSlices/BackgroundSlice";
import type { brushes, changBackgroundParams } from "../../types/editor";
import type { visibility } from "../../types/visibility";
import useBrushSettings from "../../hooks/Editor/useBrushSettings";
import ToolbarUI from "./ToolbarUi";

export default function Toolbar() {
    const dispatch = useAppDispatch()
    const { pencilColor , markerColor}  = useBrushSettings("colors");
    const brushMode = useBrushSettings("mode")    
    const [settingsPopUpV, setSettingsPopUpV] = useState<visibility>("hidden");

    const toggleSettingsPopUpV = ()=>{
        setSettingsPopUpV(settingsPopUpV === "hidden" ? "visible" : "hidden")
    }


    // other functions

    const changeBrushMode = (mode: brushes): void => {
        dispatch(setBrushMode(mode))
    }

    const changeBackground = ({ mode, value }: changBackgroundParams): void => {
        dispatch(setBackgroundMode(mode))
        dispatch(setBackgroundValue(value))
    }

    return(
        <ToolbarUI
            brushMode={brushMode}
            pencilColor={pencilColor}
            markerColor={markerColor}
            settingsPopUpV={settingsPopUpV}
            toggleSettingsPopUpV={toggleSettingsPopUpV}
            changeBrushMode={changeBrushMode}
            changeBackground={changeBackground}
        />
    )

}