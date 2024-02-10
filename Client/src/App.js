import React, { useEffect } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, HomeContainer, MenuContainer, EditCategory, AboutUs,  CardContainer, Login, ContactUs, Customization } from "./components";

import { BrowserRouter as Router } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";


function App() {
/* 
  const [{foodItems}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems : data,
      });
    });
  };

  useEffect(()=>{
    fetchData();
  },[]);
   */
  return (
    
    <AnimatePresence mode='wait'>

        <div className="w-screen h-auto flex flex-col">
          <Header />

          <main className="mt-14 md:mt-20 w-screen">
            <Routes>
              <Route path= "/Login" element = {<Login/>} />
              <Route path="/" element={<HomeContainer/>}/>
              <Route path = "/Customization" element = {<Customization />} />
              <Route path="/createItem" element={<CreateContainer/>}/>
              <Route path = "/AboutUs" element = {<AboutUs />} />
              <Route path = "/ContactUs" element = {<ContactUs/>} />
              <Route path = "/CardContainer" element = {<CardContainer/>}/>
              <Route path = "/MenuContainer" element = {<MenuContainer/>} />
              <Route path="/EditCategory" element={<EditCategory />} />
            </Routes>
          </main>
      </div>

   </AnimatePresence>
  );
}


export default App;
