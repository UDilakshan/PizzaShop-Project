import React, { useState } from 'react'
import { loginbg} from '../asserts'
import { logo1} from '../asserts'
import {LoginInput} from "../components"
import {FaEnvelope, FcGoogle} from "../asserts/icons"
import {motion} from "framer-motion";
import { buttonClick } from '../animation'
import {useNavigate} from "react-router-dom"
import {getAuth,signInWithPopup,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} 
from "firebase/auth"
import {app} from "../config/firebase.config"
import { validateUserJWTToken } from '../api'

const Login = () => {

const[userEmail,setUserEmail]=useState("")
const[isSignUp,setIsSignUp]=useState(false)
const [password,setPassword]=useState("")
const [confirm_password,setConfirm_password]=useState("")

const firebaseAuth= getAuth(app)
const provider= new GoogleAuthProvider()

const navigate=useNavigate();

const loginWithGoogle= async ()=>{
 await signInWithPopup(firebaseAuth,provider).then(userCred=>{
  firebaseAuth.onAuthStateChanged((cred)=>{
    if(cred){
      cred.getIdToken().then(token=>{
        validateUserJWTToken(token).then((data)=>{
          console.log(data);
        })
        navigate("/", {replace: true});
      })
    }
  })
})
}

const signUpWithEmailPass = async () => {
  if (userEmail === "" || password === "" || confirm_password === "") {
      // console.log("box is empty");
  } else {
      if (password === confirm_password) {
        setUserEmail("");
        setConfirm_password("");
        setPassword("");
      
          try {
              const userCred = await createUserWithEmailAndPassword(firebaseAuth, userEmail, password);

              firebaseAuth.onAuthStateChanged((cred) => {
                  if (cred) {
                      cred.getIdToken().then(async (token) => {
                          const data = await validateUserJWTToken(token);
                          console.log(data);
                      });
                      navigate("/", {replace: true});
                  }
              });

              //console.log("Equal");
          } catch (error) {
            // Handle the error
            if (error.code === "auth/email-already-in-use") {
                // Inform the user that the email is already in use
                console.log("Email is already in use. Please log in or reset your password.");
            } else {
                // Handle other errors
                console.error("Error during user creation:", error);
            }
        }
    } else {
        // alert
    }
  }
};

// Usage of the signUpWithEmailPass function
  signUpWithEmailPass().catch((error) => {
    // Handle any errors that might occur during the function execution
    console.error("Error during signUpWithEmailPass:", error);
  });

    const signInWithEmailPass = async () => {
      if(userEmail !== "" && password !== ""){
        await signInWithEmailAndPassword(firebaseAuth,userEmail,password).then(
          (userCred)=>{
            firebaseAuth.onAuthStateChanged((cred) => {
              if (cred) {
                  cred.getIdToken().then(async (token) => {
                      const data = await validateUserJWTToken(token);
                      console.log(data);
                  });
                  navigate("/", {replace: true});
              }
          });
          }
        )
      }
    }
    
    return (
      <div className='w-screen h-screen relative overflow-hidden flex'>
          {/*background*/}
          <img 
          src={loginbg}
          className='w-full h-full object-cover absolute top-0 left-0 '
          style={{ filter: 'brightness(110%)' }}
          alt=""
          />
          {/*context box*/}
          <div className='flex flex-col items-center bg-blend-hard-light 
           w-[50%] md:w-508 h-full z-10 backdrop-blur-md p-2 px-6 py-8'
           style={{ backdropFilter: 'blur(11px) brightness(90%) saturate(100%) hue-rotate(10deg)' }} >
          {/* top logo */}
          <div className='flex items-center justify-start gap-4 w-full'>
              <img src={logo1}
               className='w-14 highlight-logo' 
               alt=""
               />
              <p className='font-bold text-2xl text-yellow-50 px-0 py-0'
              style={{ textShadow: '2px 2px 4px rgba(255, 255, 200, 0.8)' }}> </p>
          </div>
          {/*welcome txt*/}
          
          <p className=' text-4xl font-bold text-red-200  items-centerjustify-center '>Welcome Back </p>
          <p className='text-xl font-semibold  text-black-400 mt-2 px-12'> {isSignUp ? "Sign up":"Sign in"} with following</p>
          {/*input section*/}
          <div className='w-full  flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
              <LoginInput 
              placeHolder={"Email here"}
               icon={<FaEnvelope className='text-2xl text-textColor'>  </FaEnvelope> }
               inputState={userEmail} 
               inputStateFun={setUserEmail}
               type="email"
               isSignUp={isSignUp} /> 
  
              <LoginInput 
              placeHolder={"Password here"}
               icon={<FaEnvelope className='text-2xl text-textColor'> </FaEnvelope> }
               inputState={password} 
               inputStateFun={setPassword}
               type="password"
               isSignUp={isSignUp} /> 
  
              {isSignUp &&(
               <LoginInput 
               placeHolder={"Confirm_Password here"}
               icon={<FaEnvelope className='text-2xl text-textColor'> </FaEnvelope> }
               inputState={confirm_password} 
               inputStateFun={setConfirm_password}
               type="password"
               isSignUp={isSignUp} /> 
              )}
              {!isSignUp ? (
              <p style={{color:'Window',fontSize:'20px' }} >  Doesn't have an account  :{" "}
              <motion.button
               {...buttonClick}
               className="text-blue-300 font-medium text-2xl underline cursor-pointer bg-transparent"
              onClick={()=> setIsSignUp(true)}>
                Create one
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
           cursor-pointer text-white text-xl font-medium hover:bg-red-500 transition-all duration-150'
           onClick={signUpWithEmailPass}
           >
            Sign Up
          </motion.button>   
          ) :(
            <motion.button {...buttonClick} className='w-full px-4 py-2  rounded-md bg-red-400
           cursor-pointer text-white text-xl font-medium hover:bg-red-500 transition-all duration-150'
           onClick={signInWithEmailPass}
           >
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
  
  