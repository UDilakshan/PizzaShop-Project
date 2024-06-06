import React from "react";
import { DBHeader, DBHome, DBOrders, DBItems, DBNewitem, DBUsers } from "../components";
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";

const DBRightSection = () => {
    return (
        <div className="flex flex-col py-8 px-12 flex-l h-full w-[78%] bg-primary">
            <DBHeader />
            <div className="flex flex-col flex-l overflow-y-scroll scrollbar-none">
              <Routes>
                <Route path = "/Home" element={<DBHome/>}/>
                <Route path = "/orders" element={<DBOrders/>}/>
                <Route path = "/items" element={<DBItems/>}/>
                <Route path = "/addnewitems" element={<DBNewitem/>}/>
                <Route path = "/users" element={<DBUsers/>}/>
              </Routes>
            </div>
        </div>
    );
};

export default DBRightSection;
