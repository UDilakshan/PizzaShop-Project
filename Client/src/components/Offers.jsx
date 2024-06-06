import React from 'react';
import { useStateValue } from '../context/StateProvider';
import { motion } from 'framer-motion';

const Offers = () => {

  const [{foodItems}] = useStateValue();
  const data = foodItems ? foodItems.filter(n => n.category === "OPizza Offers") : [];
  return (
    <>
    <div className= "w-full flex items-center justify-center md:justify-between">
        <p className='md:text-3xl text-xl font-semibold capitalize text-gray-950 relative before:absolute before:rounded-lg md:before:w-32 before:w-32 before:content before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-700 transition-all ease-in-out duration-100 flex justify-center md:ml-[43%] mt-14 md:mt-20 md:mb-6'>OPizza Offers</p>
    </div>

    <div className='w-full h-auto flex flex-wrap items-end justify-center gap-2 md:gap-8'>
      { 
        data && data.map(item => (
          <div key={item?.id} className='w-[380px] h-auto -mb-8 md:w-[48%] mt-10 rounded-lg'>
            <div className='relative w-full flex items-center justify-center'>
              <motion.img src={item?.imageURL} className='w-full bg-black h-[180px] md:h-[250px] rounded-lg'/>
              <motion.button whileTap={{ scale: 0.85 }}
                type='button'
                className='absolute w-[30%] md:ml-8 ml-4 flex items-center justify-center bg-yellow-600 px-2 py-2 hover:bg-yellow-700 rounded-2xl md:text-base text-sm text-white font-semibold'
                style={{ top: '75%', left: '0%' }}
                initial={{ scale: 1 }}
                animate={{scale: [1.0, 1.2, 1.0], transition: { duration: 0.7, repeat: Infinity } }}
                exit={{ scale: 1 }}
                >
                Get Offer!
              </motion.button>
            </div>
          </div>
        ))
      }
</div>
    </>


  )
}

export default Offers