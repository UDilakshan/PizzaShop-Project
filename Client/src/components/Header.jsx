import React, { useState } from 'react';
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from 'framer-motion';
import "../../src/index.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../firebase.config";


import Logo from "./../images/Logo.png";
import Avatar from "./../images/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';



function Header() {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{user}, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const login = async () =>{
            if(!user){
                   const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
                    dispatch({
                        type : actionType.SET_USER,
                        user : providerData[0],
                    })
                    localStorage.setItem('user', JSON.stringify(providerData[0]));
                    }

            else{
                setIsMenu(!isMenu);
            }
    };


    const logout = ()=>{
        setIsMenu(false)
        localStorage.clear()

        dispatch({
            type : actionType.SET_USER,
            user: null,
        });
    }

  return (
    <div className='fixed z-50 w-screen h-24 p-3 px-4 md:p-5 md:px-16 cursor-pointer bg-red-600'>
        {/* desktop */}
        <div className='hidden md:flex w-full h-full items-center justify-between'>

        <Link to = {"/"} className='flex items-center gap-2'>
            <img src={Logo} className='object-cover w-20 -ml-10' alt="Logo" />
            <p className='text-red-100 font-pacifico text-3xl font-bold'>Pizza Shop</p>
        </Link>

    

        <div className='flex items-center gap-8'>
        <motion.ul 
        
        initial = {{opacity:0, x: 200 }} 
        animate = {{opacity:1, x: 0 }} 
        exit = {{opacity:0, x: 200 }} 
        
        className='flex items-center gap-8'>
            <li className='text-base text-red-100 hover:text-headingColor duration-100 
            transition-all ease-in-out cursor-pointer'>Home</li>
            <li className='text-base  text-red-100 hover:text-headingColor duration-100 
            transition-all ease-in-out cursor-pointer'>Menu</li>
            <li className='text-base  text-red-100 hover:text-headingColor duration-100 
            transition-all ease-in-out cursor-pointer'>About Us</li>
            <li className='text-base  text-red-100 hover:text-headingColor duration-100 
            transition-all ease-in-out cursor-pointer'>Service</li>
        </motion.ul>

        <div className='relative flex items-center justify-center'>
            <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg 
            flex items-center justify-center'>
                <p className='text-xs text-white font-semibold'>2</p>
            </div>
        </div>


            <div className='relative'>

                <motion.img whileTap={{ scale : 0.6 }}
                src={user ? user.photoURL : Avatar}
                 className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
                  alt="Avatar" onClick = {login}/> 

            {
                isMenu && (
                    
                  <motion.div 
                  initial = {{opacity: 0, scale: 0.6 }}
                  animate = {{opacity: 1, scale: 1 }}
                  exit = {{opacity: 0, scale: 0.6 }} 
                  
                  className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>

                  {user && user.email === "uthayakumardilakshan@gmail.com" && (

                      <Link to = {"/createItem"}>

                          <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover: bg-slate-100
                          transition-all duration-100 ease-in-out text-textColor text-base'>
                          New Item <MdAdd /> </p>

                      </Link>
                  )}

                     <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover: bg-slate-100
                      transition-all duration-100 ease-in-out text-textColor text-base' onClick = {logout}>
                      Logout <MdLogout/> </p>
                      
                </motion.div>
                )
            }



            </div>          

        </div>
        </div>




        {/* mobile */}
        <div className='flex items-center justify-between md:hidden w-full h-full'>


        <div className='relative flex items-center justify-center'>
            <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg 
            flex items-center justify-center'>
                <p className='text-xs text-white font-semibold'>2</p>
            </div>
        </div>


        <Link to = {"/"} className='flex items-center gap-2'>
            <img src={Logo} className='object-cover w-12' alt="Logo" />
            <p className=' font-pacifico text-slate-100 text-xl font-bold'>Pizza Shop</p>
        </Link>


        <div className='relative'>

            <motion.img whileTap={{ scale : 0.6 }}
            src={user ? user.photoURL : Avatar}
            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
            alt="Avatar" onClick = {login}/> 

            {
            isMenu && (
                
            <motion.div 
            initial = {{opacity: 0, scale: 0.6 }}
            animate = {{opacity: 1, scale: 1 }}
            exit = {{opacity: 0, scale: 0.6 }} 
            
            className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>

            {user && user.email === "uthayakumardilakshan@gmail.com" && (

                <Link to = {"/createItem"}>

                    <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover: bg-slate-100
                    transition-all duration-100 ease-in-out text-textColor text-base'>
                    New Item <MdAdd /> </p>

                </Link>
            )}



            <ul
                className='flex flex-col'>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 
                    transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Home</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 
                    transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Menu</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 
                    transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>About Us</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 
                    transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Service</li>
            </ul>

                <p className='m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer
                 hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base' onClick = {logout} >
                Logout <MdLogout/> </p>
                
            </motion.div>
            )
            }

        </div> 
    </div>
</div>
  )
}

export default Header;