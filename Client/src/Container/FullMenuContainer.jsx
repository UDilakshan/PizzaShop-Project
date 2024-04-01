import React from 'react';
import { useStateValue } from '../context/StateProvider';
import MenuBg from "../images/OtherImages/MenuBg.jpg"
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FullMenuContainer = () => {

  const [{foodItems},dispatch] = useStateValue();
  let data = foodItems.filter(n => n.category !== "Category");
  console.log(data);

  return (
    <div className= 'flex items-center justify-center background'>       
            <div className='flex flex-wrap justify-center items-center gap-4 md:mt-32 mt-[120px]'>
            {data && data.map(item =>(
                <div key={item?.id}  className='w-[310px] min-w-[310px] md:min-w-[400px] md:w-400 h-auto bg-slate-100 rounded-lg backdrop-blur-lg hover:drop-shadow-2xl'>
                <div className='w-full flex flex-row items-end px-4 my-4'>  
                    <motion.img src={item?.imageURL} className='w-24 md:w-32 md:ml-4 rounded-lg shadow-xl'
                    whileHover={{scale:1.1}} />
                    <div className='w-full flex flex-col items-center justify-center'>
                      <p className='text-cyan-950 font-semibold md:text-lg text-sm mt-4 flex flex-col items-end justify-end sm:text-wrap ml-12 md:ml-12'>{item?.title}</p>
                      <div className='flex flex-col items-end justify-end mt-4'>
                      <p className='text-textColor font-semibold text-xs'>Starting</p>
                        <p className='text-lg text-headingColor font-semibold'>
                        <span className='text-sm text-red-500 px-1'>Rs.</span>{item?.price}</p>
                      </div>
                  </div>
                </div>
                <div>
                  <Link to = {'/Customization'}>
                  <motion.button type='button' className='text-slate-900 text-base md:ml-8 ml-2 py-2 px-4 hover:text-slate-100 font-semibold hover:bg-orange-600
                    bg-orange-500 rounded-xl' whileTap={{scale :0.7}}>Customize</motion.button>
                    </Link>
                </div>
            </div>
            ))} 
            </div>

        </div>
  )
}

export default FullMenuContainer