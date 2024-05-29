import React from "react";
import { MdLogout, MdSearch } from "react-icons/md";
import { BsFillBellFill, BsToggles2 } from "react-icons/bs";
import { motion } from "framer-motion";
import { buttonClick } from "../utils/Animation";
import Avatar from "../images/OtherImages/Avatar.jpg";
// import { useNavigate } from "react-router-dom"; 
// import { useSelector, useDispatch } from "react-redux"; 
// import { getAuth, signOut } from "firebase/auth"; 
// import { app } from "../firebase.config"; 
// import { setUserNull } from "../context/actions/userActions"; 

const DBHeader = (user) => {
   // const user = useSelector((state) => state.user);
   // const firebaseAuth = getAuth(app);
   // const navigate = useNavigate();
   // const dispatch = useDispatch();

   // const Logout = () => {
   //    signOut(firebaseAuth)
   //       .then(() => {
   //          dispatch(setUserNull());
   //          navigate("/login", { replace: true });
   //       })
   //       .catch((err) => console.log(err));
   // };

  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl text-headingColor">Welcome to O'Pizza...!</p>

      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 py-2 px-4 bg-lightOverlay backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-600 text-2xl" />
          <input
            type="text"
            placeholder="Search Here..."
            className="border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor"
          />
          <BsToggles2 className="text-gray-600 text-2xl" />
        </div>

        <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-600 text-xl" />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover rounded-full"
              src={user?.picture ? user.picture : Avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>

          <motion.div
            {...buttonClick}
            // onClick={Logout} 
            className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
          >
            <MdLogout className="text-gray-600 text-xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DBHeader;