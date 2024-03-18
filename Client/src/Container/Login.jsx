import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, updateProfile } from 'firebase/auth';
import { app, storage } from '../firebase.config';
import { validateUserJWTToken } from '../api';
import { sendPasswordResetEmail } from 'firebase/auth';
import { fadeInOut } from '../animation';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { FaEnvelope, FcGoogle } from '../asserts/icons';
import { buttonClick } from '../animation';
import { MD5 } from 'crypto-js'; 

const LoginInput = ({ placeHolder, icon, inputState, inputStateFun, type, isSignUp }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <motion.div
      {...fadeInOut}
      className={`flex f items-center justify-center gap-4 bg-slate-100  backdrop-blur-md 
   rounded-md w-full px-4 py-2 ${isFocus ? 'shadow-md shadow-red-600 ' : 'shadow-none' }`}>
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

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

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
      return false;
    }

    // Check if the password contains only numbers, alphabets, and the specified special characters
    const regex = /^[a-zA-Z0-9@$#%^&*]+$/;
    return regex.test(password);
  };

  const handleSuccessfulSignup = async (user) => {
    try {
      // Wait for the user to refresh their data
      await user.reload();
  
      // Send verification email
      await sendVerificationEmail(user);
  
      // Provide feedback to the user
      console.log('Verification email sent successfully');
  
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
        console.log('Email verification is pending. Please verify your email.');
      }
    } catch (error) {
      console.error('Error during successful signup:', error);
    }
  };
  
  const signUpWithEmailPass = async () => {
    try {
      // Validate input fields
      if (userEmail === '' || password === '' || confirm_password === '') {
        // Handle empty fields
        console.log('Please fill in all fields.');
        return;
      }
  
      if (!isValidPassword(password)) {
        // Handle invalid password
        console.log('Password must be exactly 6 characters and can only contain numbers, special characters, and alphabets.');
        return;
      }
  
      // Create user (even if email is already in use)
      const userCred = await createUserWithEmailAndPassword(firebaseAuth, userEmail, password);
  
      // Wait for the user to refresh their data
      await userCred.user.reload();
  
      // Send verification email
      await sendVerificationEmail(userCred.user);
  
      // Provide feedback to the user
      console.log('Verification email sent successfully');
  
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
      } else {
        // Email is not verified, use default profile (avatar)
        // Optionally, you can show a message to the user about email verification
        console.log('Email verification is pending. Please verify your email.');
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

     <div className='w-screen h-screen items-center justify-center relative overflow-hidden flex' style={{ backgroundColor: '#f0f0f0' }}>
      <div className='flex flex-col items-center bg-blue-400 w-full p-2 px-4 py-10 rounded-md md:w-3/5 lg:w-2/4 xl:w-1/3 md:h-[70vh] lg:h-[80vh] xl:h-80vh]'>
          
          {/*welcome txt*/}
          
          <p className=' text-3xl font-bold text-red-600  items-centerjustify-center '>Welcome Back </p>
          

          <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
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
               className="text-black font-medium text-xl underline cursor-pointer bg-transparent"
              onClick={()=> setIsSignUp(true)}>
                Create one
                </motion.button>
               </p>
               ):
               ( 
                <p style={{color:'whitesmoke',fontSize:'20px' }}>  Already  have an account :{" "}
               <motion.button
                {...buttonClick} 
                 className= "text-black font-medium text-xl  underline cursor-pointer bg-transparent"
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
           <div>
            {/* Render your component with the avatar */}

        </div>
      </div>
      </div>
    )
  }
  export default Login;
