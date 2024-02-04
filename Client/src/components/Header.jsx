import React, { useState } from 'react';
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from 'framer-motion';

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
        setIsMenu(false);
        localStorage.clear();

        dispatch({
            type : actionType.SET_USER,
            user: null,
        });
    }

  return (
    <div className='fixed z-50 w-screen h-24 p-3 px-4 md:p-6 md:px-16 cursor-pointer bg-black'>
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
            <Link to="/">
            <motion.li whileTap={{ scale: 1.3 }} className='text-base text-red-100 hover:text-orange-500 duration-100 
            transition-all ease-in-out cursor-pointer' onClick={() =>setIsMenu(false)}>Home </motion.li>
            </Link>

            <Link to ={"/MenuContainer"}>
            <motion.li whileTap={{ scale: 1.3 }} className='text-base text-red-100 hover:text-orange-500 duration-100 
            transition-all ease-in-out cursor-pointer'onClick={() =>setIsMenu(false)}>Menu </motion.li>
            </Link>

             <Link to = {"/Aboutus"}>
             <motion.li whileTap={{ scale: 1.3 }} className='text-base text-red-100 hover:text-orange-500 duration-100 
            transition-all ease-in-out cursor-pointer'onClick={() =>setIsMenu(false)}>About us </motion.li>
            </Link>
            <Link to = {"/Service"}>
            <motion.li whileTap={{ scale: 1.3 }} className='text-base text-red-100 hover:text-orange-500 duration-100 
            transition-all ease-in-out cursor-pointer'onClick={() =>setIsMenu(false)}>Service</motion.li>
            </Link>
        </motion.ul>

        <Link to="/CardContainer">
          <motion.div className='relative flex items-center justify-center' whileTap={{ scale: 0.7 }}>
        <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
        <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
            <p className='text-xs text-white font-semibold'>2</p>
        </div>
          </motion.div>
        </Link>

         <Link to="/Login">
            <div className='relative'>

                <motion.img whileTap={{ scale : 0.6 }}
                src={user ? user.photoURL : Avatar}
                 className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
                  alt="Avatar" /> 

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
                          transition-all duration-100 ease-in-out text-textColor text-base'onClick={() =>setIsMenu(false)}>
                          New Item <MdAdd /> </p>

                      </Link>
                  )}

                      
                </motion.div>
                )
            }
            </div> 
            </Link >        

        </div>
        </div>




        {/* mobile */}
        <div className='flex items-center justify-between md:hidden w-full h-full'>


        <Link to="/CardContainer">
          <motion.div className='relative flex items-center justify-center' whileTap={{ scale: 0.7 }}>
        <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
        <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
            <p className='text-xs text-white font-semibold'>2</p>
        </div>
          </motion.div>
        </Link>


        <Link to = {"/"} className='flex items-center gap-2'>
            <img src={Logo} className='object-cover w-12' alt="Logo" />
            <p className=' font-pacifico text-slate-100 text-xl font-bold'>Pizza Shop</p>
        </Link>

        <Link to="/Login">
        <div className='relative'>

            <motion.img whileTap={{ scale : 0.6 }}
            src={user ? user.photoURL : Avatar}
            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
            alt="Avatar"/> 

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
                    transition-all duration-100 ease-in-out text-textColor text-base'onClick={()=>setIsMenu(false)}>
                    New Item <MdAdd /> </p>

                </Link>
            )}



            <ul
                className='flex flex-col'>
            <Link to="/">
            <motion.li whileTap={{ scale: 0.8 }} className='text-base text-slate-900 hover:bg-orange-500 hover:text-slate-100 duration-100 
            transition-all ease-in-out cursor-pointer px-8'onClick={()=>setIsMenu(false)}>Home </motion.li>
            </Link>

            <Link to ={"/MenuContainer"}>
            <motion.li whileTap={{ scale: 0.8 }} className='text-base text-slate-900 hover:bg-orange-500 hover:text-slate-100 duration-100 
            transition-all ease-in-out cursor-pointer px-8'onClick={()=>setIsMenu(false)}>Menu </motion.li>
            </Link>

             <Link to = {"/Aboutus"}>
             <motion.li whileTap={{ scale: 0.8 }} className='text-base text-slate-900 hover:bg-orange-500 hover:text-slate-100 duration-100 
            transition-all ease-in-out cursor-pointer px-8'onClick={()=>setIsMenu(false)}>About us </motion.li>
            </Link>
            <Link to = {"/Service"}>
            <motion.li whileTap={{ scale: 0.8 }} className='text-base text-slate-900 hover:bg-orange-500 hover:text-slate-100 duration-100 
            transition-all ease-in-out cursor-pointer px-8'onClick={()=>setIsMenu(false)}>Service</motion.li>
            </Link>
            </ul>

                
                
            </motion.div>
            )
            }

        </div> 
        </Link>
    </div>
</div>
  )
}

export default Header;