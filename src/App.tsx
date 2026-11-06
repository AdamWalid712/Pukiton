import { Route, Routes } from "react-router-dom";
import Editor from "./Components/Editor/Editor";
export default function App() {
  return(
    <div>
      <Routes>
        <Route index element={<Editor/>}/>
      </Routes>
    </div>
  )
}