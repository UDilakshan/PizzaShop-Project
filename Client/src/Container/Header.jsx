import React, { useState, useEffect } from 'react';
import { MdShoppingBasket, MdAdd, MdLogin, MdLogout  } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { RiContactsBook2Fill } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";
import { FaCircleUser } from "react-icons/fa6";
import { BiSolidFoodMenu } from "react-icons/bi";
import { motion } from 'framer-motion';
import { getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import {app} from "../firebase.config";
import Logo from "../images/OtherImages/Logo.png";
import { Link, useNavigate  } from "react-router-dom";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import Login from '../Container/Login';
import {MD5} from 'crypto-js';



function Header() {
  
    const firebaseAuth = getAuth(app);
    const [{user}, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const navigate = useNavigate();
    // State variable to hold the login button text
    //const [loginButtonText, setLoginButtonText] = useState(user ? user.email : 'Login');

    const toggleLoginPopup = () => {
      if (window.location.pathname == '/') {
      setIsOpenPopup(!isOpenPopup);
      document.body.style.overflow = isOpenPopup ? 'auto' : 'hidden'; // Prevent scrolling when popup is open
      }
  // If the user is not on the home page, redirect to the home page
  else if (window.location.pathname !== '/') {
      window.location.href = '/'; // Redirect to the home page
      document.body.style.overflow = isOpenPopup ? 'auto' : 'hidden';
  }
  };

  // Function to close the login popup
  const closePopup = () => {
      setIsOpenPopup(false);
  }; 




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
          if (authUser) {
            // Extract the user from the authentication result
            // Update the avatar based on the user's email
            const newAvatarURL = `https://www.gravatar.com/avatar/${MD5(authUser.email)}?d=identicon`;
            // setAvatarURL(newAvatarURL); // Uncomment this line if you are using a local state for avatar URL
    
            // Dispatch the user to the context
            dispatch({
              type: actionType.SET_USER,
              user: authUser,
            });
          } else {
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
          }
        });
        
    
        return () => {
          // Cleanup the subscription when the component unmounts
          unsubscribe();
        };
      }, [firebaseAuth, dispatch]);

      const handleClick = () =>{
        if(user){
          setIsMenu(!isMenu);
        }
           
      }


    const logout = async () => {
      setIsMenu(false);
        try {
            // Sign out the user
            await signOut(firebaseAuth);

            // Clear user from the state
            dispatch({
                type: actionType.SET_USER,
                user: null,
            });

            // Clear user from localStorage
            localStorage.clear();
        } catch (error) {
            console.error('Error during logout:', error);
        }

        navigate('/');
        
    };



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
                 <Link to = {"/"}>
                <motion.li whileTap={{scale:1.3}}>
                      <div className='flex gap-1 text-base text-red-100 hover:text-orange-500 duration-100 
                                        transition-all ease-in-out cursor-pointer'>
                          <IoHome className='mt-[2.5px]'/>
                          <p>Home</p>
                      </div>  
                 </motion.li>
              </Link>

            <Link to='/MenuContainer'>
            <motion.li whileTap={{scale:1.3}}>
                      <div className='flex gap-1 text-base text-red-100 hover:text-orange-500 duration-100 
                                        transition-all ease-in-out cursor-pointer'>
                          <BiSolidFoodMenu className='mt-[2.5px]'/>
                          <p>Menu</p>
                      </div>  
                 </motion.li>
              </Link>

             <Link to = {"/AboutUs"}>
             <motion.li whileTap={{scale:1.3}}>
                      <div className='flex gap-1 text-base text-red-100 hover:text-orange-500 duration-100 
                                        transition-all ease-in-out cursor-pointer'>
                          <FaCircleUser className='mt-[2.5px]'/>
                          <p>About Us</p>
                      </div>  
                 </motion.li>
              </Link>

            <Link to = {"/ContactUs"}>
              <motion.li whileTap={{scale:1.3}}>
                      <div className='flex gap-1 text-base text-red-100 hover:text-orange-500 duration-100 
                                        transition-all ease-in-out cursor-pointer'>
                          <RiContactsBook2Fill className='mt-[2.5px]'/>
                          <p>Contact Us</p>
                      </div>  
                 </motion.li>
              </Link>
        </motion.ul>

        <Link to="/CardContainer">
          <motion.div
          initial = {{opacity:0, x: 200 }} 
          animate = {{opacity:1, x: 0 }} 
          exit = {{opacity:0, x: 200 }}
          
          className='relative flex items-center justify-center' whileTap={{ scale: 0.7 }}>
        <MdShoppingBasket className='text-red-100 text-2xl cursor-pointer' />
        <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
            <p className='text-xs text-white font-semibold'>2</p>
        </div>
          </motion.div>
        </Link>


            <div className='relative'>
                
                    {!user && (
                      <motion.div 
                          initial = {{opacity:0, x: 200 }} 
                          animate = {{opacity:1, x: 0 }} 
                          exit = {{opacity:0, x: 200 }}>
                        <motion.p 
                        className='text-base text-red-100 hover:text-orange-500 duration-100 
                    transition-all ease-in-out cursor-pointer flex gap-1' onClick={toggleLoginPopup} whileTap={{ scale : 0.8 }}>Login <MdLogin 
                    initial = {{opacity:0, x: 200 }} 
                    animate = {{opacity:1, x: 0 }} 
                    exit = {{opacity:0, x: 200 }}
                    className='mt-1'/></motion.p> 
                    </motion.div>
                    )}
                

               {user && (

                  <motion.img
                  initial = {{opacity:0, x: 200 }} 
                  animate = {{opacity:1, x: 0 }} 
                  exit = {{opacity:0, x: 200 }}
                  whileTap={{ scale : 0.8 }} onClick = {handleClick}
                  src={user.photoURL}
                  className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
                  alt="User image"/>
                  
                )}

          
              {
                 isMenu && (
                    <motion.div 
                      initial = {{opacity: 0, scale: 0.6 }}
                      animate = {{opacity: 1, scale: 1 }}
                      exit = {{opacity: 0, scale: 0.6 }}                    
                      className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>

                  {   
                      user && user.email === "opizzashop@gmail.com" && (        
                        <Link to = {"/createItem"}>
                            <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover: bg-slate-100
                            transition-all duration-100 ease-in-out text-textColor text-base rounded-lg hover:bg-slate-200' onClick={()=>setIsMenu(false)}>
                            New Item <MdAdd /> </p>
                        </Link>   

                  )}

                        <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover: bg-slate-100
                            transition-all duration-100 ease-in-out text-textColor text-base rounded-lg hover:bg-slate-200' onClick={logout}>
                            Logout <MdLogout /> </p>

                </motion.div>
                )
              }
           </div> 
          </div>
        </div>




        {/* mobile */}
      <div className='flex items-center justify-between md:hidden w-full h-full'>
        
        <Link to="/CardContainer">
          <motion.div

          initial = {{opacity:0, x: 200 }} 
          animate = {{opacity:1, x: 0 }} 
          exit = {{opacity:0, x: 200 }} 
          
          className='relative flex items-center justify-center' whileTap={{ scale: 0.7 }}>
        <MdShoppingBasket className='text-red-100 text-2xl cursor-pointer' />
        <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
            <p className='text-xs text-white font-semibold'>2</p>
        </div>
          </motion.div>
        </Link>


        <Link to = {"/"} className='flex items-center gap-2'>
            <img src={Logo} className='object-cover w-12' alt="Logo" />
            <p className=' font-pacifico text-slate-100 text-xl font-bold'>Pizza Shop</p>
        </Link>
        

        <div className='relative'>
        
        {!user && (
                <motion.p 
                initial = {{opacity:0, x: 200 }} 
                animate = {{opacity:1, x: 0 }} 
                exit = {{opacity:0, x: 200 }} 
                className='text-base text-red-100 hover:text-orange-500 duration-100 
                transition-all ease-in-out cursor-pointer flex gap-0' onClick={toggleLoginPopup} whileTap={{ scale : 0.6 }}>
                  Login <MdLogin 
                initial = {{opacity:0, x: 200 }} 
                animate = {{opacity:1, x: 0 }} 
                exit = {{opacity:0, x: 200 }} 
                className='mt-1'/>
            
              </motion.p> 
            )}
          

          {user && (

            <motion.img
            initial = {{opacity:0, x: 200 }} 
            animate = {{opacity:1, x: 0 }} 
            exit = {{opacity:0, x: 200 }} 

            whileTap={{ scale : 0.6 }} onClick={handleClick}
            src={user.photoURL}
            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
            alt="User image"/>

          )} 

            {
               isMenu && (
                    
                <motion.div 

                initial = {{opacity:0, x: 200, scale: 0.6 }} 
                animate = {{opacity:1, x: 0,scale: 1 }} 
                exit = {{opacity:0, x: 200, scale: 0.6 }} 
                
                className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>

                {user && user.email === "opizzashop@gmail.com" && (

                    <Link to = {"/createItem"} >
                      <div className='flex mt-4 hover:bg-orange-500 hover:text-slate-100 duration-100
                       transition-all ease-in-out cursor-pointer' onClick={()=>setIsMenu(false)}>
                      <VscNewFile className='mt-1 ml-4'/>
                      <p className='text-lg px-1'>
                        New Item </p>
                      </div>
                    </Link>
            )}



            <ul
                className='flex flex-col gap-1'>
              <Link to = {"/"}>
                <motion.li whileTap={{scale:0.8}}>
                      <div className='flex hover:bg-orange-500 hover:text-slate-100 duration-100
                       transition-all ease-in-out cursor-pointer mt-4' onClick={()=>setIsMenu(false)}>
                      <IoHome className='mt-1 ml-4'/>
                      <p className='text-lg px-1'>
                        Home </p>
                      </div>  
                 </motion.li>
              </Link>

            <Link to ={"/MenuContainer"}>
               <motion.li whileTap={{scale:0.8}}>
                      <div className='flex hover:bg-orange-500 hover:text-slate-100 duration-100
                       transition-all ease-in-out cursor-pointer' onClick={()=>setIsMenu(false)}>
                      <BiSolidFoodMenu className='mt-1 ml-4'/>
                      <p className='text-lg px-1'>
                        Menu </p>
                      </div>  
                 </motion.li>
            </Link>

             <Link to = {"/AboutUs"}>
             <motion.li whileTap={{scale:0.8}}>
                      <div className='flex hover:bg-orange-500 hover:text-slate-100 duration-100
                       transition-all ease-in-out cursor-pointer' onClick={()=>setIsMenu(false)}>
                      <FaCircleUser className='mt-1 ml-4'/>
                      <p className='text-lg px-1'>
                        About Us </p>
                      </div>  
                 </motion.li>
            </Link>

            <Link to = {"/ContactUs"}>
            <motion.li whileTap={{scale:0.8}}>
                      <div className='flex hover:bg-orange-500 hover:text-slate-100 duration-100
                       transition-all ease-in-out cursor-pointer mb-4' onClick={()=>setIsMenu(false)}>
                      <RiContactsBook2Fill className='mt-1 ml-4'/>
                      <p className='text-lg px-1'>
                        Contact Us </p>
                      </div>  
                 </motion.li>
            </Link>

            <motion.li whileTap={{scale:0.8}}>
                      <div className='flex hover:bg-orange-500 hover:text-slate-100 duration-100
                       transition-all ease-in-out cursor-pointer mb-4'>
                      <MdLogout className='mt-1 ml-4'/>
                      <p className='text-lg px-1 ' onClick={logout}>
                        Logout </p>
                      </div>  
            </motion.li>
                  

            </ul>
            </motion.div>
            )
            }

        </div> 
        
    </div>

              {/* Button to toggle the login popup */}
     <button onClick={toggleLoginPopup}></button>

              {/* Render the Login component conditionally */}
      {isOpenPopup && <Login closePopup={closePopup} />}

</div>
  )
}

export default Header;