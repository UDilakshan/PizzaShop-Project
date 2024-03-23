import React from 'react';
import { VegPizzaData, categoryData, NonVegPizzaData, PremiumNonVegPizzaData, DessertsData, NewtoMenuData, OffersData } from '../utils/data';
import { MdShoppingBasket } from 'react-icons/md';
import {motion} from 'framer-motion';
import { Link } from "react-router-dom";
import CardContainter from './CardContainter';
import { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';

const MenuContainer = ({flag, data}) => {
  const [{cartShow},{foodItems},dispatch]=useStateValue();
  //const[{scrollValue,setScrollValue}]=useState(0);
  useEffect (()=> {},[cartShow]);
  return (

    <div> 
              {/* <div className='mb-40'>
                  <div className= "w-full flex items-center md:justify-start md:gap-3 md:px-8 my-4">
                      <section className='w-full mt-12 md:mt- mb-10'>
                      <div className='w-full flex items-center justify-between px-8'>
                      <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
                      before:w-32 before:content before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
                      transition-all ease-in-out duration-100'>Categories</p>
                      </div>
                    </section>
                    </div>

                  
                  <div className='w-full h-full absolute flex items-start justify-start  gap-x-2'>
                    {categoryData && categoryData.map(item =>(

                        <div key={item?.id}  className='w-190 p-4 bg-gray-100 backdrop-blur-md rounded-lg flex flex-col
                        items-center justify-center'>
                            <motion.img src={item?.imgsrc} className='w-32 rounded-md shadow-xl cursor-pointer'
                            whileHover={{scale:0.9}} />
                          <p className='text-xl font-semibold my-2'>{item?.name}</p>

                        </div>

                        ))}

                  </div>  
                 
            </div> */}



            <div id='Offers' className= "w-full flex items-center md:justify-start md:gap-3 md:px-8 my-4 flex-wrap">

            <section className='w-full mt-12 md:mt-24 mb-10'>
            <div className='w-full flex items-center justify-between px-8'>
            <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
            before:w-16 before:content before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
            transition-all ease-in-out duration-100'>Offers</p>
            </div>
            </section>


            {OffersData && OffersData.map(item =>(

              <div key={item?.id}  className='w-375 min-w-[375px] md:min-w-[400px] md:w-400 h-auto my-5 md:my-4 bg-pink-300
              rounded-lg backdrop-blur-lg hover:drop-shadow-2xl'>
              <div className='w-full flex flex-row item-center justify-center px-4 my-4'>  
                  <motion.img src={item?.imgsrc} className='w-28 md:w-32 ml-4 rounded-lg shadow-xl'
                  whileHover={{scale:1.1}} />
                  <div className='w-full flex flex-col items-center justify-center'>
                    <p className='text-textColor font-semibold text-base mt-4 flex flex-col items-end justify-end sm:text-wrap'>{item?.name}</p>
                    <div className='flex flex-col items-end justify-end mt-8'>
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


              <div id='Non-Veg' className= "w-full flex items-center md:justify-start md:gap-3 md:px-8 my-4 flex-wrap">

                <section className='w-full mt-12 md:mt-24 mb-10'>
                <div className='w-full flex items-center justify-between px-8'>
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
                before:w-32 before:content before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
                transition-all ease-in-out duration-100'>Non-Vegetarian Pizza</p>
                </div>
                </section>
        

              {NonVegPizzaData && NonVegPizzaData.map(item =>(

                    <div key={item?.id} className='w-375 min-w-[375px] md:min-w-[400px] md:w-400 h-auto my-5 md:my-4 bg-amber-200            
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

           <div id='Premium' className= "w-full flex items-center md:justify-start md:gap-3 md:px-8 my-4 flex-wrap">

                <section className='w-full mt-12 md:mt-24 mb-10'>
                <div className='w-full flex items-center justify-between px-8'>
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
                before:w-32 before:content before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
                transition-all ease-in-out duration-100'>Premium Pizza</p>
                </div>
                </section>
        

              {PremiumNonVegPizzaData && PremiumNonVegPizzaData.map(item =>(

                    <div key={item?.id} className='w-375 min-w-[375px] md:min-w-[400px] md:w-400 h-auto my-5 md:my-4 bg-lime-200            
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

           <div id='Desserts' className= "w-full flex items-center md:justify-start md:gap-3 md:px-8 my-4 flex-wrap">

                <section className='w-full mt-12 md:mt-24 mb-10'>
                <div className='w-full flex items-center justify-between px-8'>
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
                before:w-24 before:content before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
                transition-all ease-in-out duration-100'>Desserts</p>
                </div>
                </section>
        

              {DessertsData && DessertsData.map(item =>(

                    <div key={item?.id} className='w-375 min-w-[375px] md:min-w-[400px] md:w-400 h-auto my-5 md:my-4 bg-emerald-200            
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

           <div id='New' className= "w-full flex items-center md:justify-start md:gap-3 md:px-8 my-4 flex-wrap">

                <section className='w-full mt-12 md:mt-24 mb-10'>
                <div className='w-full flex items-center justify-between px-8'>
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
                before:w-32 before:content before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
                transition-all ease-in-out duration-100'>New items</p>
                </div>
                </section>
        

              {NewtoMenuData && NewtoMenuData.map(item =>(

                    <div key={item?.id} className='w-375 min-w-[375px] md:min-w-[400px] md:w-400 h-auto my-5 md:my-4 bg-violet-200            
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
                  
                    <div>
                    <Link to = {'/Customization'}>
                      <motion.button type='button' className='text-slate-900 text-base ml-8 py-2 px-4 hover:text-slate-100 font-semibold hover:bg-orange-600
                        bg-orange-500 rounded-xl' whileTap={{scale :0.7}}>Customize</motion.button>
                        </Link>
                    </div>

                    </div>
                  </div>

              ))}

              
      { cartShow && (<CardContainter/>)}
          </div>
    </div> 


  )
}

export default MenuContainer



