import React from "react";
import { Route,Routes } from 'react-router-dom'
import {Login,Main} from "./containers"

const App = () => {
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center ">
    
    <Routes>
        <Route path="/*"  element={<Main/>} />
        <Route path="/Login"  element={<Login/>} />
    </Routes>
    </div>
  )
}

export default App;
/*return(
<h1 className="text-3xl font-bold underline">
Hello world!
</h1>
)}*/
