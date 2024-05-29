/* This is for full menu items istead opizza offers */


import React, { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { motion } from 'framer-motion';
import { PiShoppingCartBold } from "react-icons/pi";
import { Customization } from '../components';

const FullMenuContainer = () => {
  const [{ foodItems }] = useStateValue();
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter out items with category "Category Data"
  const data = foodItems ? foodItems.filter(n => n.category !== "Category Data" && n.category!== "OPizza Offers") : [];

  // Group the remaining items by their category
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const [modelView, setModelView] = useState(false);

  const handleClose = () => setModelView(false);

  const handleCustomizeClick = (item) => {
    setSelectedItem(item);
    setModelView(true);
  };

  return (
    <div className='flex items-center justify-center background'>
      <div className='flex flex-wrap justify-center items-center gap-16 md:mt-20 mt-16'>

        {        
              Object.keys(groupedData).map(category => (
              <div key={category} className="w-full mt-16">
                <p className='md:text-[27px] text-xl font-semibold capitalize text-white relative before:absolute before:rounded-lg before:w-28 before:content before:h-1 before:-bottom-2 before:left-auto before:bg-gradient-to-tr from-orange-400 to-orange-700 transition-all ease-in-out duration-100 flex justify-center md:ml-24'>
                  {category}
                </p>

            <div className='flex flex-wrap justify-center items-center  md:gap-4 md:mt-8 mt-8'>
              {groupedData[category].map(item => (
                <div key={item?.id} className='w-[310px] min-w-[310px] md:min-w-[400px] md:w-400 h-auto bg-lightOverlay rounded-3xl backdrop-blur-lg hover:drop-shadow-2xl mb-4 md:mb-8'>
                  <div className='w-full flex flex-row items-end px-4 my-4'>
                    <motion.img
                      src={item?.imageURL}
                      className='w-24 md:w-32 md:ml-4 rounded-lg shadow-xl'
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className='w-full flex flex-col items-center justify-center'>
                      <p className='text-white font-semibold md:text-lg text-sm mt-4 flex flex-col items-end justify-end sm:text-wrap ml-12 md:ml-12'>
                        {item?.name}
                      </p>
                      <div className='flex flex-col items-end justify-end mt-4'>
                        {                       
                          item?.smallPrice !== "" && (
                          <p className='text-white font-semibold text-xs'>Starting</p>
                        )}
                        <p className='text-lg text-white font-semibold'>
                          <span className='text-sm text-red-500 px-1'>Rs.</span>
                          {item?.smallPrice ? item?.smallPrice : item?.usualprice}
                        </p>
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
                  item?.usualprice!=="" && (
                     <motion.button whileTap={{ scale: 0.85 }}
                    type='button'
                    className='w-[30%] md:ml-8 ml-4 flex items-center justify-center bg-red-600 px-2 py-2 hover:bg-red-700 rounded-2xl md:text-base text-sm text-white font-semibold'>
                    Add to
                    <PiShoppingCartBold className='ml-2 text-white text-base' />
                  </motion.button>
                  )}


                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
          <Customization onClose={handleClose} visible={modelView} data={selectedItem} />
      )}
      
    </div>
  );
};

export default FullMenuContainer;