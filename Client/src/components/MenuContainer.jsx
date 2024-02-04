import React from 'react';
import { VegPizzaData } from '../utils/data';
import { MdShoppingBasket } from 'react-icons/md';
import {motion} from 'framer-motion';

const MenuContainer = ({mdflag, data}) => {
  return (
   <div className={`w-full flex items-center md:justify-start md:gap-3 md:px-8 my-12 ${
      mdflag ? "overflow-x-scroll scrollbar-none" : "overflow-hidden scroll-smooth flex-wrap"
    }`}>

      {VegPizzaData && VegPizzaData.map(item =>(

            <div key={item?.id} className='w-375 min-w-[375px] md:min-w-[400px] md:w-400 h-auto my-14 bg-cardOverlay rounded-lg backdrop-blur-lg hover:drop-shadow-2xl'>
            <div className='w-full flex flex-row item-center justify-center px-4 my-4'>  
                <motion.img src={item?.imgsrc} className='w-28 ml-4 rounded-lg -mt-12 shadow-xl'
                whileHover={{scale:1.1}} />
                <div className='w-full flex flex-col items-center justify-center'>
                  <p className='text-textColor font-semibold text-base'>{item?.name}</p>
                  <p className='text-lg text-headingColor font-semibold px-12'>
                      <span className='text-sm text-red-500 px-1'>Rs.</span>{item?.price}</p>
              </div>
            </div>
            <div>
              <motion.button type='button' className='text-slate-900 text-base ml-8 py-2 px-4 hover:text-slate-100 font-semibold hover:bg-orange-600
                bg-orange-500 rounded-xl' whileTap={{scale :0.7}}>Customize</motion.button>
            </div>

            </div>

      ))}

    </div> 


  )
}

export default MenuContainer