import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HashLink } from "react-router-hash-link";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div ref={rowContainer} className={`w-full flex items-center my-12 gap-2 scroll-smooth ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap'}`}>
      {data && data.map(item => (
        <HashLink
          key={item?.id}
          to={
            item?.title === 'Offers' ? "#Offers" 
            : item?.title==='Drinks' ? "#Drinks" 
            : item?.title==='Desserts' ? "#Desserts" 
            : item?.title==='Premium' ? "#Premium" 
            : item?.title==='New' ? "#New" 
            : item?.title==='Veg' ? "#Veg"
            : item?.title==='Non-Veg"' ? "#Non-Veg"
            : "" } smooth
          className='w-300 min-w-[300px] md:min-w-[340px] h-auto md:w-340 bg-cardOverlay rounded-xl shadow-xl backdrop-blur-lg hover:drop-shadow-2xl'
          
        >
          <div className='w-full flex flex-col items-center justify-center'>
            <motion.img
              src={item?.imageURL}
              alt='image'
              className='md:w-40 w-56 rounded-md cursor-pointer'
              initial={{ scale: 1 }}
              animate={item.title === 'Offers' ? { scale: [0.9, 0.7, 0.9], transition: { duration: 1.0, repeat: Infinity } } : { scale: 1 }}
              exit={{ scale: 1 }}
            />
            <div className='w-full items-center justify-center flex flex-col'>
              <p className='text-headingColor font-semibold text-3xl md:text-xl'>{item?.title}</p>
            </div>
          </div>
        </HashLink>
      ))}
    </div>
  );
}

export default RowContainer;
