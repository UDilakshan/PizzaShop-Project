import React from 'react';
import {motion} from 'framer-motion';
import { Link } from "react-router-dom";


const MenuContainer = ({data}) => {
  return (
    <div>            
        <div className= "w-screen md:w-full flex items-center md:justify-center md:gap-4 p-2 md:p-0 md:ml-auto gap-4 md:px-8 flex-wrap">
              {data && data.map(item =>(
                <div key={item?.id}  className='w-[310px] min-w-[310px] md:min-w-[400px] md:w-400 h-auto my-5 md:my-4 md:mt-16 bg-slate-100 rounded-lg backdrop-blur-lg hover:drop-shadow-2xl'>
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

export default MenuContainer




{/* 
              <div id='Veg' className= "w-full flex items-center md:justify-start md:gap-3 md:px-8 my-4 flex-wrap">

                <section className='w-full mt-12 md:mt-24 mb-10'>
                <div className='w-full flex items-center justify-between px-8'>
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
                before:w-32 before:content before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
                transition-all ease-in-out duration-100'>Vegetarian Pizza</p>
                </div>
                </section>
        

              {VegPizzaData && VegPizzaData.map(item =>(

                    <div key={item?.id} className='w-375 min-w-[375px] md:min-w-[400px] md:w-400 h-auto my-5 md:my-4 bg-orange-200 
                    rounded-lg backdrop-blur-lg hover:drop-shadow-2xl'>
                    <div className='w-full flex flex-row item-center justify-center px-4 my-4'>  
                        <motion.img src={item?.imgsrc} className='w-28 md:w-32 ml-4 rounded-lg shadow-xl'
                        whileHover={{scale:1.1}} />
                        <div className='w-full flex flex-col items-center justify-center'>
                          <p className='text-textColor font-semibold text-base mt-4 flex flex-col items-end justify-end sm:text-wrap'>{item?.name}</p>
                          <div className='flex flex-col items-end justify-end mt-8'>
                            <p className='text-textColor font-semibold text-xs'>Starting</p>
                            <p className='text-lg text-headingColor font-semibold'>
                            <span className='text-sm text-red-500 px-1'>Rs.</span>{item?.price}</p>
                          </div>
                      </div>
                    </div>
                    <div>
                      <Link to = {'/Customization'}>
                      <motion.button type='button' className='text-slate-900 text-base ml-8 py-2 px-4 hover:text-slate-100 font-semibold hover:bg-orange-600
                        bg-orange-500 rounded-xl' whileTap={{scale :0.7}}>Customize</motion.button>
                        </Link>
                    </div>

                    </div>

              ))}

           </div>

              */}
