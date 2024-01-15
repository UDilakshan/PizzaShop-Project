import React from "react";
import {HomeContainer, Login} from "./containers"
import Header from "./components/Header";
import { Route, Routes,useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, MainContainer } from "./containers";
//import "./index.css";
const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/Home' && "/createItem" ;

  return (
    <AnimatePresence mode='wait'>
        <div className="w-screen h-fixed flex flex-col">
        {isHomePage && <Header />} 
          <main className=" w-screen">
    <Routes>
        <Route path="/"  element={<Login/>} />
        <Route  path="/Home" element={<MainContainer/>}/>
        <Route path="/createItem" element={<CreateContainer/>}/>
    </Routes>
    
    </main>
      </div>

   </AnimatePresence>
  );
}
export default App;

