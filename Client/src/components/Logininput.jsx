import React ,{useState} from 'react'

const LoginInput = ({placeHolder,icon,inputState,inputStateFun,type,isSignUp})=>{

    const[isFocus,setIsFocus]=useState(false);

    return( 
     <div className={`flex f items-center justify-center gap-4 bg-slate-100  backdrop-blur-md 
     rounded-md w-full px-4 py-2 ${isFocus ? "shadow-md shadow-red-600 " : "shadow-none" }`}>
       {icon}
       <input type={type} placeholder={placeHolder}
        className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
        value={inputState}
        onChange={(e)=> inputStateFun(e.target.value)}
        onFocus={()=> setIsFocus(true)}
        onBlur={()=> setIsFocus(false)}
        />
    </div>
    )
}
export default LoginInput