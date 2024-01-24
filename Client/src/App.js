import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, MainContainer, MenuContainer } from "./components";

import EditCategory from "./components/EditCategory";
import { BrowserRouter as Router } from "react-router-dom";
import Aboutus from "./Container/Aboutus";
import Service from "./Container/Service";
import Carditem from "./Container/Cartitem";


function App() {
  return (
    
    <AnimatePresence mode='wait'>

        <div className="w-screen h-auto flex flex-col">
          <Header />

          <main className="mt-14 md:mt-20 w-screen">
            <Routes>
              <Route path="/" element={<MainContainer/>}/>
              <Route path="/createItem" element={<CreateContainer/>}/>
              <Route path = "/Aboutus" element = {<Aboutus />} />
              <Route path = "/Service" element = {<Service/>} />
              <Route path = "/Carditem" element = {<Carditem/>} />
              <Route path = "/MenuContainer" element = {<MenuContainer/>} />
              <Route path="/EditCategory" element={<EditCategory />} />
            </Routes>
          </main>
      </div>

   </AnimatePresence>
  );
}


export default App;
