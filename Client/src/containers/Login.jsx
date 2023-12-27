import React, { useState } from 'react'
import { loginbg } from '../asserts'
import { logo4} from '../asserts'
import {LoginInput} from "../components"
import {FaEnvelope, FcGoogle} from "../asserts/icons"
import {motion} from "framer-motion";

const Login = () => {

const[userEmail,setUserEmail]=useState("")
const[isSignUp,setIsSignUp]=useState(false)
const [password,setPassword]=useState("")
const [confirm_password,setConfirm_password]=useState("")

const buttonClick = () => {
  // Define the logic you want to execute on button click
  console.log('Button clicked!');
  // Add your logic here, such as navigating to the signup page
  // or changing the state to switch between login and signup
};

const loginWithGoogle=()=>{
  console.log("clicked");
}
  return (
    <div className='w-screen h-screen relative overflow-hidden flex'>
        {/*background*/}
        <img 
        src={loginbg}
        className='w-full h-full object-cover absolute top-0 left-0 '
        alt=""
        />
        {/*context box*/}
        <div className='flex flex-col items-center bg-blend-hard-light 
         w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12'>
        {/* top logo */}
        <div className='flex items-center justify-start gap-4 w-full'>
            <img src={logo4}
             className='w-8' 
             alt=""
             />
            <p className='font-semibold text-xl text-black-900 '>City </p>
        </div>
        {/*welcome txt*/}
        <p className='text-4xl font-bold text-black '>Welcome Back </p>
        <p className='text-xl font-thin  text-black-800  mt-2 '> {isSignUp ? "Sign up":"Sign in"} with following</p>
        {/*input section*/}
        <div className='w-full  flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
            <LoginInput 
            placeHolder={"Email here"}
             icon={<FaEnvelope className='text-2xl' text-textColor> </FaEnvelope> }
             inputState={userEmail} 
             inputStateFun={setUserEmail}
             type="email"
             isSignUp={isSignUp} /> 

            <LoginInput 
            placeHolder={"Password here"}
             icon={<FaEnvelope className='text-2xl' text-textColor> </FaEnvelope> }
             inputState={password} 
             inputStateFun={setPassword}
             type="password"
             isSignUp={isSignUp} /> 

            {isSignUp &&(
             <LoginInput 
             placeHolder={"Confirm_Password here"}
             icon={<FaEnvelope className='text-2xl' text-textColor> </FaEnvelope> }
             inputState={confirm_password} 
             inputStateFun={setConfirm_password}
             type="password"
             isSignUp={isSignUp} /> 
            )}
            {!isSignUp ? (
            <p style={{color:'whitesmoke',fontSize:'20px' }}>  Doesn't have an account  :{" "}
            <motion.button
             {...buttonClick}
             className="text-blue-300 font-medium text-2xl underline cursor-pointer bg-transparent"
            onClick={()=> setIsSignUp(true)}>
              Crete one
              </motion.button>
             </p>
             ):
             ( 
              <p style={{color:'whitesmoke',fontSize:'20px' }}>  Already  have an account :{" "}
             <motion.button
              {...buttonClick} 
               className= "text-blue-300 font-medium text-2xl  underline cursor-pointer bg-transparent"
               onClick={()=> setIsSignUp(false)}>
               sign-in here
               </motion.button>
              </p>
             )}
        {/* button section*/}  
        {isSignUp ?(
        <motion.button {...buttonClick} className='w-full px-4 py-2  rounded-md bg-red-400
         cursor-pointer text-white text-xl font-medium hover:bg-red-500 transition-all duration-150'>
          Sign Up
        </motion.button>   
        ) :(
          <motion.button {...buttonClick} className='w-full px-4 py-2  rounded-md bg-red-400
         cursor-pointer text-white text-xl font-medium hover:bg-red-500 transition-all duration-150'>
          Sign in
        </motion.button>  )}
       </div>
        <div className='flex items-center justify-between gap-16'>
          <div className='w-24 h-[1px] rounded-md bg-slate-50'> </div>
          <p className='text-white size-3'> or </p>
          <div className='w-24 h-[1px] rounded-md bg-slate-50'> </div>
        </div>
          <br></br>
        <motion.div {...buttonClick} className='flex items-center justify-center px-20 py-2 bg-slate-50 
         backdrop-blur-md cursor-pointer rounded-3xl gap-3'
         onClick={loginWithGoogle}>
          <FcGoogle className='text-3xl'/>
          <p className='text-xl font-semi-bold  text-black '> Sign in with Google </p>
        </motion.div>

    </div>
    </div>
  )
}
export default Login;