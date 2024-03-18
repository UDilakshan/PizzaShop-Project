import React, { useState,useEffect} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
signInWithPopup, GoogleAuthProvider,sendEmailVerification} from 'firebase/auth';
import { app, storage, auth } from '../firebase.config';
import { validateUserJWTToken } from '../api';
import Logo from "./../images/Logo.png";
import loginbg from "../asserts/img/loginbg.jpg";
import { FaEnvelope, FcGoogle } from '../asserts/icons';
import { buttonClick } from '../animation';
import { sendPasswordResetEmail } from 'firebase/auth';
import { fadeInOut } from '../animation';
import { FaTimes } from 'react-icons/fa';
import { useStateValue } from '../context/StateProvider';

const LoginInput = ({placeHolder,icon,inputState,inputStateFun,type,isSignUp})=>{

  const[isFocus,setIsFocus]=useState(false);

  return( 
   <motion.div 
   {...fadeInOut}
   className={`flex f items-center justify-center gap-1 bg-red-600 backdrop-blur-18
   rounded-md w-full px-1 py-2 ${isFocus ? "shadow-md shadow-red-900 " : "shadow-none" }`}>
     {icon}
     <input type={type} placeholder={placeHolder}
      className="w-full h-full px-1 bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
      value={inputState}
      onChange={(e)=> inputStateFun(e.target.value)}
      onFocus={()=> setIsFocus(true)}
      onBlur={()=> setIsFocus(false)}
      />
  </motion.div>
  )
}

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
  const [emailProfile, setEmailProfile] = useState('');

  
useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              console.log(data);
            });
            navigate('/', { replace: true });
            closePopup(); 
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


  const isValidPassword = (password) => {
    // Minimum length of 6 characters
    if (password.length !== 6) {
      setPasswordError('Password must be exactly 6 characters.');
      return false;
    }

    // Check if the password contains only numbers, alphabets, and the specified special characters
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
  const handleEmailVerification = async () => {
    try {
      // Get the currently signed-in user from Firebase Authentication
      const user = auth.currentUser;
  
      // Wait for the user to refresh their data
      await user.reload();
  
      // Check if email is verified
      if (user.emailVerified) {
        // Email is verified, redirect to the home page
        navigate('/', { replace: true });
      } else {
        // Email is not verified, display an alert message
        window.alert('Email is not verified');
      }
    } catch (error) {
      console.error('Error during email verification:', error);
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
  
      // Send email verification
      await sendVerificationEmail(userCred.user);
  
      // Provide feedback to the user
      window.alert('Verification email sent successfully');
  
      // Check if user's email is verified
      if (userCred.user.emailVerified) {
        setEmailProfile(user.email);
        // Proceed to add user to the database or perform any other necessary action
        // For example, you can add user data to Firestore or Realtime Database here
        // Add your code to add user to database here
      } else {
        // If email is not verified, prompt the user to verify their email
        window.alert("Please verify your email to complete the registration process.");
      }
    } catch (error) {
      console.error('Error during user creation:', error);
    }
  };
  
  /*const addEmailToDatabase = async (email) => {
    try {
      // Add the email to your database
      // Example: firebase.firestore().collection('users').doc(user.uid).set({ email });
      // Replace the above line with your database operation
    } catch (error) {
      console.error('Error adding email to database:', error);
    }
  };*/

  const signInWithEmailPass = async () => {
    if (userEmail !== '' && password !== '') {
      try {
        // Sign in user
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, userEmail, password);
        
        // Get the signed-in user
        const user = userCredential.user;
        // Check if email is verified
        if (user && user.emailVerified) {
          // Update email profile state
          setEmailProfile(user.email);
          
          // Proceed to the home page
          const token = await user.getIdToken();
          const data = await validateUserJWTToken(token);
          console.log(data);
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
  

    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-55 bg-opacity-50 bg-black'>
           {emailProfile ? (
        <div className='w-full text-center'>
          <p>Welcome, {emailProfile}</p>
          {/* You can add additional profile information here */}
        </div>
      ) : ( 
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
                icon={<FaEnvelope className='text-xl text-textColor'></FaEnvelope>}
                inputState={password}
                inputStateFun={setPassword}
                type="password"
                isSignUp={isSignUp}
              />

                <motion.p
                {...buttonClick}
                className='text-blue-800 font-semibold text-xl underline cursor-pointer bg-transparent'
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
                icon={<FaEnvelope className='text-xl text-textColor'></FaEnvelope>}
                inputState={password}
                inputStateFun={setPassword}
                type="password"
                isSignUp={isSignUp}
              />
            {passwordError && (
             <p className="text-green-300 text-sm">{passwordError}</p>
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
                      <p className="text-green-300 text-sm">{confirmPasswordError}</p>
              )}

              {!isSignUp ? (
              <p style={{color:'black',fontSize:'20px' }} >  Doesn't have an account  :{" "}
              <motion.button
               {...buttonClick}
               className="text-blue-800 font-semibold text-xl underline cursor-pointer bg-transparent"
              onClick={()=> setIsSignUp(true)}>
                Create one
                </motion.button>
               </p>
               ):
               ( 
                <p style={{color:'black',fontSize:'20px' }}>  Already  have an account :{" "}
               <motion.button
                {...buttonClick} 
                 className= "text-blue-800 font-semibold text-xl  underline cursor-pointer bg-transparent"
                 onClick={()=> setIsSignUp(false)}>
                 sign-in here
                 </motion.button>
                </p>
               )}
          {/* button section*/}  
          {isSignUp ?(
          <motion.button {...buttonClick} className='w-full px-4 py-2  rounded-md bg-red-600
          cursor-pointer text-white text-xl font-medium hover:bg-red-700 transition-all duration-150'
           onClick={signUpWithEmailPass}
           >
            Sign Up
          </motion.button>   
          ) :(
            <motion.button {...buttonClick} className='w-full px-4 py-2  rounded-md bg-red-600
           cursor-pointer text-white text-xl font-medium hover:bg-red-700 transition-all duration-150'
           onClick={signInWithEmailPass}
           >
            Sign In
          </motion.button>  )}
         </div>
          <div className='flex items-center justify-between gap-16'>
            <div className='w-24 h-[1px] rounded-md bg-slate-400'> </div>
            <p className='text-textcolor size-3'> or </p>
            <div className='w-24 h-[1px] rounded-md bg-slate-400'> </div>
          </div>
            <br></br>
          <motion.div {...buttonClick} className='flex items-center justify-center px-22 py-1 bg-slate-600
           backdrop-blur-md cursor-pointer rounded-2xl gap-2'
           onClick={loginWithGoogle}>
            <FcGoogle className='text-2xl'/>
            <p className='text-xl font-semi-bold  text-white '> Sign in with Google </p>
          </motion.div>
          </div>
      
         {/* Add a button to close the popup */}
        <button className=' absolute top-4 right-4 text-black text-xl cursor-pointer z-50' onClick={closePopup}>
          <FaTimes />
        </button>

      </div>
    
  </motion.div>
      )}
        </div>
      
      )
  }
  export default Login;