import React, { useEffect } from 'react';
import NewUpdates from '../components/NewUpdates';
import { useStateValue } from '../context/StateProvider';
import CartContainter from './CartContainter';
import Offers from '../components/Offers';


function HomeContainer() {
   const [{cartShow},dispatch]=useStateValue();
   useEffect (()=> {},[cartShow]);

 

  return (
    <div className='mt-28 w-full pb-40'>

       <NewUpdates/> 
       <Offers />

       {cartShow && (<CartContainter/>)} 


    </div>
  )
}

export default HomeContainer