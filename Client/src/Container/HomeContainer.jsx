import React, { useEffect } from 'react';
import NewUpdates from '../components/NewUpdates';
import MenuContainer from './MenuContainer';
import { useStateValue } from '../context/StateProvider';
import CartContainter from './CartContainter';
import CategoryContainer from '../components/CategoryContainer';


function HomeContainer() {
   const [{cartShow},{foodItems},dispatch]=useStateValue();
   useEffect (()=> {},[cartShow]);

  return (
    <div className='mt-28 w-full'>

       <NewUpdates/>
       <CategoryContainer />
        {/* <MenuContainer /> */}
       {cartShow && (<CartContainter/>)} 

    </div>
  )
}

export default HomeContainer

