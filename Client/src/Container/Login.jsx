import React, { useState} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app, storage, auth } from '../firebase.config';
import { validateUserJWTToken } from '../api';
import { sendEmailVerification } from 'firebase/auth';
import Logo from "./../images/Logo.png";
import loginbg from "../images/Veg Pizza/Hot_butter_mushroom.png";
import { FaEnvelope, FcGoogle } from '../asserts/icons';
import { buttonClick } from '../animation';
import { sendPasswordResetEmail } from 'firebase/auth';
import { fadeInOut } from '../animation';


const LoginInput = ({placeHolder,icon,inputState,inputStateFun,type,isSignUp})=>{

  const[isFocus,setIsFocus]=useState(false);

  return( 
   <motion.div 
   {...fadeInOut}
   className={`flex f items-center justify-center gap-4 bg-slate-100  backdrop-blur-md 
   rounded-md w-full px-4 py-2 ${isFocus ? "shadow-md shadow-red-600 " : "shadow-none" }`}>
     {icon}
     <input type={type} placeholder={placeHolder}
      className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
      value={inputState}
      onChange={(e)=> inputStateFun(e.target.value)}
      onFocus={()=> setIsFocus(true)}
      onBlur={()=> setIsFocus(false)}
      />
  </motion.div>
  )
}

const Login = () => {
  //const [user]=useAuthState(auth);
  const [userEmail, setUserEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              console.log(data);
            });
            navigate('/', { replace: true });
          });
        }
      });
    });
  };

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };


  const signUpWithEmailPass = async () => {
    if (userEmail === '' || password === '' || confirm_password === '') {
      // Handle empty fields
    } else {
      try {
        // Create user (even if email is already in use)
        const userCred = await createUserWithEmailAndPassword(firebaseAuth, userEmail, password);
  
        // Send email verification
        await sendVerificationEmail(userCred.user);
  
        // Wait for the user to refresh their data
        await userCred.user.reload();
  
        // Check if email is verified
        if (userCred.user.emailVerified) {
          const token = await userCred.user.getIdToken();
          const data = await validateUserJWTToken(token);
          console.log(data);
  
          // Navigate to the main page
          navigate('/', { replace: true });
        } else {
          // Provide feedback to the user
          console.log('Email is not yet verified.pls verify your mail and press the signup button again');
        }
  
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          // If email is already in use, check if it's verified
          const existingUser = await signInWithEmailAndPassword(firebaseAuth, userEmail, password);
  
          // Wait for the user to refresh their data
          await existingUser.user.reload();
  
          // Check if email is verified
          if (existingUser.user.emailVerified) {
            const token = await existingUser.user.getIdToken();
            const data = await validateUserJWTToken(token);
            console.log(data);
  
            // Navigate to the main page
            navigate('/', { replace: true });
          } else {
            
            // Provide feedback to the user
            console.log('Email is not yet verified.pls verify it and press the signup button.');
          }
  
        } else {
          console.error('Error during user creation:', error);
        }
      }
    }
  };
  
  
  

const signInWithEmailPass = async () => {
  if (userEmail !== '' && password !== '') {
    try {
      // Sign in user
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password);

      // Check if email is verified
      const user = firebaseAuth.currentUser;
      if (user && user.emailVerified) {
        const token = await user.getIdToken();
        const data = await validateUserJWTToken(token);
        console.log(data);

        // Navigate to the main page
        navigate('/', { replace: true });
      } else {
        // Provide feedback to the user
        console.log('Email is not yet verified. pls verify');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  }
};
    const resetPassword = async () => {
      if (userEmail === '') {
        // Handle empty email field
        console.log('Please provide your email to reset the password.');
        return;
      }

      try {
        // Send password reset email
        await sendPasswordResetEmail(firebaseAuth, userEmail);
        console.log('Password reset email sent successfully. Check your email inbox.');

        // Provide feedback to the user
        setShowVerifyMessage(true);

      } catch (error) {
        console.error('Error sending password reset email:', error);
      }
    };


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
              <img src={Logo}
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


            {!isSignUp && (
            <>
              <LoginInput
                placeHolder="Password here"
                icon={<FaEnvelope className='text-2xl text-textColor'></FaEnvelope>}
                inputState={password}
                inputStateFun={setPassword}
                type="password"
                isSignUp={isSignUp}
              />

                <motion.p
                {...buttonClick}
                className='text-blue-200 font-medium text-xl underline cursor-pointer bg-transparent'
                onClick={() => resetPassword()}
              >
                Forgot_Password?
              </motion.p>
            </>
          )}

            {isSignUp && (
            <>
              <LoginInput
                placeHolder="Password here"
                icon={<FaEnvelope className='text-2xl text-textColor'></FaEnvelope>}
                inputState={password}
                inputStateFun={setPassword}
                type="password"
                isSignUp={isSignUp}
              />

              <LoginInput
                placeHolder="Confirm_Password here"
                icon={<FaEnvelope className='text-2xl text-textColor'></FaEnvelope>}
                inputState={confirm_password}
                inputStateFun={setConfirm_password}
                type="password"
                isSignUp={isSignUp}
              />
            </>
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