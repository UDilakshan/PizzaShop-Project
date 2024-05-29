import React from "react";
import Logo2 from "../images/OtherImages/Logo2.png";
import {NavLink} from "react-router-dom";
import {isActiveStyles,isNotActiveStyles} from "../utils/style";

const DBLeftSection = () => {
    return (
    <div className="h-full py-6  flex flex-col bg-gray-100
     backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink to = {"/"} className="flex items-center justify-start gap-4 px-6">
        <img src= {Logo2} className = "w-12" alt="" />
        <p className="font-semibold text-2xl text-red-600 underline">O'Pizza</p>
      </NavLink>

      <hr className="my-2 border-t-2 border-gray-300" />

      <ul className="flex flex-col gap-4">
         <NavLink
           to = {"/Dashboard/home"}
           className={({ isActive }) =>
              isActive
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-gray-800`
                : isNotActiveStyles
            }
           >
           Home
         </NavLink>

         <NavLink
           to = {"/Dashboard/orders"}
           className={({ isActive }) =>
              isActive
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-gray-800`
                : isNotActiveStyles
            }
           >
           Orders
         </NavLink>

         <NavLink
           to = {"/Dashboard/items"}
           className={({ isActive }) =>
              isActive
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-gray-800`
                : isNotActiveStyles
            }
           >
           Items
         </NavLink>

         <NavLink
           to = {"/Dashboard/addnewitems"}
           className={({ isActive }) =>
              isActive
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-gray-800`
                : isNotActiveStyles
            }
           >
           Add new items
         </NavLink>

         <NavLink
           to = {"/Dashboard/users"}
           className={({ isActive }) =>
              isActive
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-gray-800`
                : isNotActiveStyles
            }
           >
           Users
         </NavLink> 

      </ul>

      <div className="w-full items-center justify-center flex h-225 mt-auto
      px-2">
        <div className="w-full h-full rounded-md bg-gray-800 flex
        items-center justify-center flex-col gap-3 px-3">
            <div className="w-12 h-12 borde bg-white rounded-full flex
            items-center justify-center">
                <p className="text-2xl font-bold text-black">?</p>
            </div> 
                <p className="text-xl text-primary font-semibold">Help Center</p>
                <p className="text-base text-gray-300 text-center">
                    Having trouble in O'Pizza, Please contact us for more questions
                </p>
                <p className="px-4 py-2 rounded-full bg-primary text-black
                cursor-pointer">
                    Get in touch
                </p>
            
        </div>
      </div>
    </div>
    );
};

export default DBLeftSection;