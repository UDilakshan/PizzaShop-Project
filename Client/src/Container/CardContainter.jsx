import React from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import {motion} from  "framer-motion";
import {RiRefreshFill}  from 'react-icons/ri'
import {BiMinus} from "react-icons/bi"
import {BiPlus} from "react-icons/bi"
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


const CardContainter = () => {

  const [{cartShow,cartItems},dispatch] = useStateValue();
  const showCart = ()=>{
    dispatch({
        type : actionType.SET_CART_SHOW,
        cartShow: !cartShow,
        });
  };
  
  return (  
    <motion.div 
    initial={{opacity:0, x:200}} 
    animate={{opacity:1, x:200}} 
    exit={{opacity:0, x:0}} 
    className='fixed top-24 right-0 w-2/5 h-[90%] bg-white drop-shadow-md
     flex flex-col z-[101]'>
        <div className='w-full  flex items-center justify-between p-4 cursor-pointer bg-slate-600'>
        <motion.div  whileTap={{scale:0.8}} onClick={showCart}>
            <MdOutlineKeyboardBackspace className=' text-black text-2xl'/>
            </motion.div>
            <p className=' text-white text-lg font-semibold'> Card </p>
    
            <motion.p
            whileTap={{scale:0.8}}
            className='flex items-center gap-1 p-2 px-2 my-1 bg-white
            rounded-md hover:shadow-md duration-100 ease-in-out transition-all 
            cursor-pointer text-black text-base'
            > 
            Clear <RiRefreshFill/> {" "}
            </motion.p>
            </div>
  {/*Name section*/}
    <div className='flex flex-col gap-2'>
            <p className='text-base text-black'></p>
            <p className='text-sm block text-black font-semibold'>Rs.0.00</p>
          </div>
          {/* Button section*/}
          <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
            <motion.div  whileTap={{scale:0.65}}>
              <BiMinus className="text-black w-screen" />
            </motion.div >
            
          
            <p className='w-5 h-5  rounded-sm bg-cartNumBg text-gray-50 flex items-center justify-center'>
              qty
            </p>

            <motion.div  whileTap={{scale:0.65}}>
             <BiPlus className=" text-black w-screen" />
            </motion.div>
          </div>
        {/*cart total section */}
        <div className='w-full h-full  bg-cartTotal rounded-t-[2rem] flex flex-col items-center 
        justify-evenly px-8 py-2'>
          <div className='w-full flex items-center justify-between '>
            <p className=' text-white text-lg '> Sub Total </p>
            <p className=' text-white text-lg '> Rs.400/= </p>
          </div>
          <div className='w-full flex items-center justify-between'>
            <p className=' text-white text-lg '> Free Delivery </p>
          </div>

          <div className='w-full border-b border-gray-600 my-2'> </div>

          <div  className='w-full flex items-center justify-between'>
              <p className=' text-white text-xl font-semibold'>Total</p>
              <p className='text-white text-xl font-semibold'> Rs.12/= </p>
          </div>

        <motion.button 
           whileTap={{scale:0.8}}
           type="button"
           className=' w-1/3 p-2 rounded-full bg-green-500
            text-gray-50 text-lg my-2
           hover:shadow-lg '
        >
          checkOut
        </motion.button>
           </div>
    </motion.div>
  );
};

export default CardContainter