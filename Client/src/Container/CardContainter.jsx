import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { motion } from 'framer-motion';
import { RiRefreshFill } from 'react-icons/ri';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import empty from '../images/OtherImages/empty.jpg';

const CardContainter = () => {
  const [{ cartShow,cartItems, user }, dispatch] = useStateValue();
  const [tot, setTot] = useState(0);
  const [flag, setFlag] = useState(false);

 const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(totalPrice);
  }, [tot, flag, cartItems]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });
    localStorage.setItem('cartItems', JSON.stringify([]));
  };

  return (
    <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
        className='fixed top-24 right-0 w-1/3  py-1 bg-gradient-to-r from-gray-500 to-white-600 drop-shadow-md
        flex flex-col  h-screen z-[101] '>
        <div className='w-full  flex items-center justify-between p-4 cursor-pointer bg-black gap-3'>
          <motion.div whileTap={{ scale: 0.8 }} onClick={showCart}>
            <MdOutlineKeyboardBackspace className=' text-white text-2xl' />
          </motion.div>
          <p className='text-white text-lg font-semibold'> Card </p>
          <motion.p
            whileTap={{ scale: 0.8 }}
            className='flex items-center gap-1 p-2 px-2 my-1 bg-white
            rounded-md hover:shadow-md duration-100 ease-in-out transition-all 
            cursor-pointer text-black text-base'
          >
            Clear <RiRefreshFill /> {' '}
          </motion.p>
        </div>

        {/* bottom section */}
        {cartItems && cartItems.length > 0 ? (
          <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
            {/* Card items section */}
            <div  className='w-full h-340 max-h-36 px-5 py-8  flex flex-col gap-3 overflow-y-scroll
            scrollbar-none'>
          
              {/* cart item */}
              {cartItems.length &&
                cartItems.map((item) => <cartItem key={item.id} data={item} />)}
            </div>

            {/* cart total section */}
            <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center 
            justify-evenly px-8 py-2'>
              <div className='w-full flex items-center justify-between '>
                <p className='text-black text-lg '> Sub Total </p>
                <p className='text-black text-lg '> Rs.400/= </p>
              </div>
              <div className='w-full border-b border-gray-600 my-2'> </div>
              <div className='w-full flex items-center justify-between'>
                <p className='text-black text-xl font-semibold'>Total</p>
                <p className='text-black text-xl font-semibold'> Rs.12/= </p>
              </div>

              {user ? (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type='button'
                  className='w-1/3 p-2 rounded-full bg-green-500
                  text-gray-50 text-lg my-2
                  hover:shadow-lg '
                >
                  Check Out
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type='button'
                  className='w-1/3 p-2 rounded-full bg-green-500
                  text-gray-50 text-lg my-2
                  hover:shadow-lg '
                >

                </motion.button>
              )}
            </div>
          </div>
        ) : (
          <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
            <img
              src={empty}
              className='w-30 h-30 max-w-[250px] rounded-full object-contain'
              alt='Empty Cart'
            />
            <p className='text-xl text-black font-semibold'>
              Add some items to your cart
            </p>
          </div>
        )}
      </motion.div>

  );
};
export default CardContainter;