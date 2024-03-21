import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, 
GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, updateProfile } from 'firebase/auth';
import { app, storage } from '../firebase.config';
import { validateUserJWTToken } from '../api';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useStateValue } from '../context/StateProvider';

import loginbg from "../images/OtherImages/loginbg.jpg";
import { actionType } from '../context/reducer';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import{ FcGoogle} from "react-icons/fc";
import { FaTimes,FaEnvelope } from 'react-icons/fa';
import { MD5 } from 'crypto-js'; 

const LoginInput = ({ placeHolder, icon, inputState, inputStateFun, type, isSignUp }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <motion.div
    initial = {{opacity:0, x: 200 }} 
    animate = {{opacity:1, x: 0 }} 
    exit = {{opacity:0, x: 200 }}
      className={`flex f items-center justify-center gap-1 bg-red-600  backdrop-blur-18
   rounded-md w-full px-1 py-2 ${isFocus ? 'shadow-md shadow-red-900 ' : 'shadow-none' }`}>
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
        value={inputState}
        onChange={(e) => inputStateFun(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
};

const Login = ({ closePopup }) => { // Add closePopup prop

  const [userEmail, setUserEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  const[isOpenPopup,setIsOpenPopup]=useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const loginWithGoogle = async () => {
    try {
      // Sign out the user if already signed in
      await firebaseAuth.signOut();
      
      // Sign in with Google
      const userCred = await signInWithPopup(firebaseAuth, provider);
  
      // Check if the user is signed in
      if (userCred.user) {
        // Get the user's ID token
        const token = await userCred.user.getIdToken();
  
        // Validate the user's JWT token
        const data = await validateUserJWTToken(token);
        console.log(data);
  
        // Navigate to the main page
        navigate('/', { replace: true });
        closePopup(); 
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  const isValidPassword = (password) => {
    // Minimum length of 6 characters
    if (password.length !== 6) {
      setPasswordError('Password must be exactly 6 characters.');
      return false;
    }
    // Check if the password contains only numbers and alphabets.
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(password)) {
      // Display alert for invalid password characters
      window.alert('Password can only contain numbers and alphabets.');
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSuccessfulSignup = async (user) => {
    try {
      // Wait for the user to refresh their data
      await user.reload();
  
      // Send verification email
      await sendVerificationEmail(user);
  
      // Provide feedback to the user
      window.alert('Verification email sent successfully');
  
      // Check if email is verified
      if (user.emailVerified) {
        // Email is verified, update user profile
        const newAvatarURL = `https://www.gravatar.com/avatar/${MD5(user.email)}?d=identicon`;
        await updateProfile(user, {
          displayName: 'Your Display Name',
          photoURL: newAvatarURL,
        });
  
        // Navigate to the main page
        navigate('/', { replace: true });
      } else {
        // Email is not verified, use default profile (avatar)
        // Optionally, you can show a message to the user about email verification
       // Email is not verified, display an alert message
       window.alert('Email is not verified');
      }
    } catch (error) {
      console.error('Error during successful signup:', error);
    }
  };
  
  const signUpWithEmailPass = async () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  
    if (userEmail === '' || password === '' || confirm_password === '') {
      window.alert('Please fill in all fields.');
      return;
    }
  
    // Validate email
    if (!isValidEmail(userEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
  
    // Validate password
    if (!isValidPassword(password)) {
      setPasswordError('Password must be exactly 6 characters.');
      return;
    }
  
    // Check if password and confirmPassword match
    if (password !== confirm_password) {
      setConfirmPasswordError('Password and Confirm Password do not match.');
      return;
    }
    try {
      
      // Create user (even if email is already in use)
      const userCred = await createUserWithEmailAndPassword(firebaseAuth, userEmail, password);
  
      // Wait for the user to refresh their data
      await userCred.user.reload();
  
      // Send verification email
      await sendVerificationEmail(userCred.user);
  
       // Provide feedback to the user
       window.alert('Verification email sent successfully');
  
      // Check if email is verified
      if (userCred.user.emailVerified) {
        // Email is verified, update user profile
        const newAvatarURL = `https://www.gravatar.com/avatar/${MD5(userCred.user.email)}?d=identicon`;
        await updateProfile(userCred.user, {
          displayName: 'Your Display Name',
          photoURL: newAvatarURL,
        });
        // Navigate to the main page
        navigate('/', { replace: true });
        closePopup();
      } else {
        // Email is not verified, use default profile (avatar)
        // Optionally, you can show a message to the user about email verification
       // If email is not verified, prompt the user to verify their email
       window.alert("Please verify your email to complete the registration process.");
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // If email is already in use, handle accordingly
        console.log('Email is already in use.');
      } else {
        console.error('Error during user creation:', error);
      }
    }
  };
  
  
  
const signInWithEmailPass = async () => {
  if (userEmail !== '' && password !== '') {
    try {
      // Sign in user
      //await signInWithEmailAndPassword(firebaseAuth, userEmail, password);

      // Sign in user
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, userEmail, password);

      // Check if email is verified
      const user = userCredential.user;

      // Check if email is verified
      //const user = firebaseAuth.currentUser;
      if (user && user.emailVerified) {
        const token = await user.getIdToken();
        const data = await validateUserJWTToken(token);
        console.log(data);

        // Log customer details only if email is verified
        console.log('Customer Details:', user);

        // Navigate to the main page
        navigate('/', { replace: true });
        closePopup();
      } else {
        // If email is not verified, display a message to the user
          window.alert('Please verify your email before signing in.');
      }
    } catch (error) {
      // Check if error is due to wrong password
      if (error.code === 'auth/wrong-password') {
       window.alert('Invalid email or password. Please try again.');
   } else {
       // For other errors, log them to console
       console.error('Error during sign in:', error);
      // window.alert("Account has been temporarily disabled due to many failed login attempts. Press forgot_password  to reset your password");
   }
   
   }
  }
};
    const resetPassword = async () => {
      if (userEmail === '') {
        // Handle empty email field
        window.alert('Please provide your email to reset the password.');
        return;
      }

      try {
        // Send password reset email
        await sendPasswordResetEmail(firebaseAuth, userEmail);
        window.alert('Password reset email sent successfully. Check your email inbox.');

        // Provide feedback to the user
        setShowVerifyMessage(true);

      } catch (error) {
        console.error('Error sending password reset email:', error);
      }
    };


    return (

      <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-55 bg-opacity-50 bg-black'>
          
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: 0.5 }}>
          <div className='flex flex-col md:flex-row w-[100vw] md:w-[800px] h-[556px] z-10  relative'>
              {/* Left side (Pizza Image) */}
              
            <div className='relative w-full md:w-1/2 overflow-hidden'>
                <img src={loginbg} alt='Pizza' className='w-full h-full object-cover' />
            </div>

              {/* Right side (Login Details) */}
              <div className='flex flex-col items-center justify-center md:w-1/2 p-4 md:p-8 bg-blend-hard-light bg-white  backdrop-filter  relative'>
        
                 {/*welcome txt*/}
          
                 <p className='text-3xl font-semibold  text-orange-500 mt-2 px-10'> {isSignUp ? "Sign up":"Sign in"} to O'PIZZA </p>
          
          {/*input section*/}
          <div className='w-full  flex flex-col items-center justify-center gap-4 px-4 md:px-7 py-5'>
              <LoginInput 
              placeHolder={"Email here"}
               icon={<FaEnvelope className='text-xl text-textColor'>  </FaEnvelope> }
               inputState={userEmail} 
               inputStateFun={setUserEmail}
               type="email"
               isSignUp={isSignUp} /> 

            {emailError && (
                <p className="text-green-800 text-sm">{emailError}</p>
              )}



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
                whileTap={{scale:0.8}}
                className='text-blue-800 font-medium text-xl underline cursor-pointer bg-transparent'
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
            {passwordError && (
             <p className="text-green-800 text-sm">{passwordError}</p>
              )}
              <LoginInput
                placeHolder="Confirm_Password here"
                icon={<FaEnvelope className='text-xl text-textColor'></FaEnvelope>}
                inputState={confirm_password}
                inputStateFun={setConfirm_password}
                type="password"
                isSignUp={isSignUp}
              />
            </>
          )}

              {confirmPasswordError && (
                      <p className="text-green-800 text-sm">{confirmPasswordError}</p>
              )}

              {!isSignUp ? (
              <p style={{color:'black',fontSize:'20px' }} >  Doesn't have an account  :{" "}
              <motion.button
               whileTap={{scale:0.8}}
               className="text-blue-800 font-medium text-xl underline cursor-pointer bg-transparent"
              onClick={()=> setIsSignUp(true)}>
                Create one
                </motion.button>
               </p>
               ):
               ( 
                <p style={{color:'black',fontSize:'20px' }}>  Already  have an account :{" "}
               <motion.button
                whileTap={{scale:0.8}}
                 className= "text-blue-800 font-medium text-xl  underline cursor-pointer bg-transparent"
                 onClick={()=> setIsSignUp(false)}>
                 sign-in here
                 </motion.button>
                </p>
               )}
          {/* button section*/}  
          {isSignUp ?(
          <motion.button whileTap={{scale:0.8}} className='w-full px-4 py-2  rounded-md bg-red-600
          cursor-pointer text-white text-xl font-medium hover:bg-red-700 transition-all duration-150'
           onClick={signUpWithEmailPass}
           >
            Sign Up
          </motion.button>   
          ) :(
            <motion.button whileTap={{scale:0.8}} className='w-full px-4 py-2  rounded-md bg-red-600
           cursor-pointer text-white text-xl font-medium hover:bg-red-700 transition-all duration-150'
           onClick={signInWithEmailPass}
           >
            Sign in
          </motion.button>  )}
         </div>
          <div className='flex items-center justify-between gap-16'>
            <div className='w-24 h-[1px] rounded-md bg-slate-400'> </div>
            <p className='text-textcolor size-3'> or </p>
            <div className='w-24 h-[1px] rounded-md bg-slate-400'> </div>
          </div>
            <br></br>
          <motion.div whileTap={{scale:0.8}} className='flex items-center justify-center px-22 py-1 bg-slate-600 
           backdrop-blur-md cursor-pointer rounded-2xl gap-2'
           onClick={loginWithGoogle}>
            <FcGoogle className='text-2xl'/>
            <p className='text-xl font-semi-bold  text-white '> Sign in with Google </p>
          </motion.div>
          </div>
           
            {/* Render your component with the avatar */}
             {/* Add a button to close the popup */}
        <button className=' absolute top-4 right-4 text-black text-xl cursor-pointer z-50' onClick={closePopup}>
          <FaTimes />
        </button>
       
      </div>
      </motion.div>
      </div>

    )
  }
  export default Login;