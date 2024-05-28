/* This is for showing only the menu images under each category */


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PiShoppingCartBold } from "react-icons/pi";
import { Customization } from '../components';
import { Link } from 'react-router-dom';

const MenuContainer = ({ data }) => {
  const [modelView, setModelView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => setModelView(false);

  const handleCustomizeClick = (item) => {
    setSelectedItem(item);
    setModelView(true);
  };

  return (
    <div>            
      <div className="w-screen md:w-full flex items-center md:justify-center md:gap-4 p-2 md:p-0 md:ml-auto gap-4 md:px-8 flex-wrap">
        {data && data.map(item => (
          <div key={item?.id} className='w-[310px] min-w-[310px] md:min-w-[400px] md:w-400 h-auto my-5 md:my-4 md:mt-16 bg-slate-100 hover:bg-orange-50 rounded-lg backdrop-blur-lg hover:drop-shadow-2xl'>
            <div className='w-full flex flex-row items-end px-4 my-4'>  
              <motion.img src={item?.imageURL} className='w-24 md:w-32 md:ml-4 rounded-lg shadow-xl'
                whileHover={{ scale: 1.1 }} />
              <div className='w-full flex flex-col items-center justify-center'>
                <p className='text-cyan-950 font-semibold md:text-lg text-sm mt-4 flex flex-col items-end justify-end sm:text-wrap ml-12 md:ml-12'>{item?.name}</p>
                <div className='flex flex-col items-end justify-end mt-4'>
                  {item?.smallPrice !== "" && (
                    <p className='text-textColor font-semibold text-xs'>Starting</p>
                  )}
                  <p className='text-lg text-headingColor font-semibold'>
                    <span className='text-sm text-red-500 px-1'>Rs.</span>{item?.smallPrice ? item?.smallPrice : item?.usualprice}</p>
                </div>
              </div>
            </div>

                {
                  item?.smallPrice !== "" && (
                    <div>
                    <motion.button type='button' className='text-slate-900 text-base md:ml-8 ml-2 py-2 px-4 hover:text-slate-100 font-semibold hover:bg-orange-600 bg-orange-500 rounded-xl cursor-pointer' whileTap={{ scale: 0.7 }} onClick={() => handleCustomizeClick(item)}>Customize</motion.button>
                  </div>
                  )}

                {
                  item?.usualprice!=="" && item?.category !== "OPizza Offers" && (    
                   <motion.button whileTap={{ scale: 0.85 }}
                    type='button'
                    className='w-[30%] md:ml-8 ml-4 flex items-center justify-center bg-red-600 px-2 py-2 hover:bg-red-700 rounded-2xl md:text-base text-sm text-white font-semibold'>
                    Add to
                    <PiShoppingCartBold className='ml-2 text-white text-base' />
                  </motion.button>
                  )}

                {
                  item?.usualprice!=="" && item?.category === "OPizza Offers" && (
                    <Link to={"/Offers"}>                        
                      <motion.button whileTap={{ scale: 0.85 }}
                        type='button'
                        className='w-[30%] md:ml-8 ml-4 flex items-center justify-center bg-yellow-600 px-2 py-2 hover:bg-yellow-700 rounded-2xl md:text-base text-sm text-white font-semibold'>
                        Get Offer!
                      </motion.button>
                  </Link>
                    
                  )}


          </div>
        ))}
      </div>

      {
          selectedItem && (
            <Customization onClose={handleClose} visible={modelView} data={selectedItem} />
      )}

    </div> 
  );
};

export default MenuContainer;
