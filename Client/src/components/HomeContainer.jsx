import React, { useEffect } from 'react';
import NewUpdates from './NewUpdates';
import MenuContainer from './MenuContainer';
import {motion} from 'framer-motion';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import { useStateValue } from '../context/StateProvider';
import CardContainter from '../Container/CardContainter';


function HomeContainer() {
   const [{cartShow},{foodItems},dispatch]=useStateValue();
   useEffect (()=> {},[cartShow]);

  return (
    <div className='md:mt-8 mt-12 '>

     <NewUpdates/>

     <section className='w-full mt-12 md:mt-24'>
      <div className='w-full flex items-center justify-between px-8'>
      <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
      before:w-32 before:content before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
      transition-all ease-in-out duration-100'>Vegetarian Pizza</p>
      </div>
     </section>
 
       <MenuContainer mdflag = {false} flag={true} data={foodItems?.filter((n) => n.category ==='VegPizzaData')} /> 

       {cartShow && (<CardContainter/>)} 

      </div>
  )
}

export default HomeContainer


