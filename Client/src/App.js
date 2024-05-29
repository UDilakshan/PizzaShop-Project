import React, { useEffect } from "react";
import { Route, Routes, useLocation, BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, HomeContainer, MenuContainer, EditCategory, AboutUs,  
  CartContainer, ContactUs, Header, Offers, FullMenuContainer, Dashboard , Customization} from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

function App() {
  const [{foodItems}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const useHeaderVisibility = () => {
    const location = useLocation();
    // Return true if the pathname is not '/Dashboard' or '/Dashboard/items'
    return location.pathname !== '/Dashboard' 
    && location.pathname !== '/Dashboard/home' 
    && location.pathname !== '/Dashboard/orders' 
    && location.pathname !== '/Dashboard/items'
    && location.pathname !== '/Dashboard/addnewitems'
    && location.pathname !== '/Dashboard/users' ;
};

  const showHeader = useHeaderVisibility();

  return (
    
    <AnimatePresence mode="wait">

        <div className="w-full h-auto flex">
          <Header />

          <main className="w-screen">
            <Routes>
              
              <Route path="/" element={<HomeContainer/>}/>
              <Route path = "/Customization" element = {<Customization />} />
              <Route path="/createItem" element={<CreateContainer/>}/>
              <Route path = "/AboutUs" element = {<AboutUs />} />
              <Route path = "/ContactUs" element = {<ContactUs/>} />
              <Route path = "/CartContainer" element = {<CartContainer/>}/>
              <Route path = "/MenuContainer" element = {<MenuContainer/>} />
              <Route path="FullMenuContainer" element = {<FullMenuContainer/>} />
              <Route path="/EditCategory" element={<EditCategory />} />
              <Route path="/Offers" element={<Offers />} />
              <Route path="/Dashboard/*" element={<Dashboard />} />

            </Routes>
          </main>
      </div>

   </AnimatePresence>
  );
}


export default App;
