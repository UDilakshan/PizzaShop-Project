import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, HomeContainer, MenuContainer, EditCategory, AboutUs,  
  CartContainter, ContactUs, Customization, Header, Offers, FullMenuContainer, Footer } from "./components";

import { BrowserRouter as Router } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";


function App() {
 
  const [{foodItems}, dispatch] = useStateValue();
  
  const fetchData = async () => {
    await getAllFoodItems() .then((data) => {
      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems : data,
      });
    });
  };

  useEffect(()=>{
    fetchData();
  },[]);
   


  return (
    
    <AnimatePresence mode="wait">

        <div className="w-full h-auto flex">
          <Header />
          
          <main className="w-screen h-auto">
            <Routes>  
               <Route path="/" element={<HomeContainer/>}/>
              <Route path = "/Customization" element = {<Customization />} />
              <Route path="/createItem" element={<CreateContainer/>}/>
              <Route path = "/AboutUs" element = {<AboutUs />} />
              <Route path = "/ContactUs" element = {<ContactUs/>} />
              <Route path = "/CartContainter" element = {<CartContainter/>}/>
              <Route path = "/MenuContainer" element = {<MenuContainer/>} />
              <Route path="FullMenuContainer" element = {<FullMenuContainer/>} />
              <Route path="/EditCategory" element={<EditCategory />} />
              <Route path="/Offers" element={<Offers />} />
            </Routes>                          
          </main>
          
          <Footer />
      </div>

   </AnimatePresence>
  );
}


export default App;
