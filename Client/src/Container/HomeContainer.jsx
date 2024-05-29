import React, { useEffect } from 'react';
import NewUpdates from '../components/NewUpdates';
import { useStateValue } from '../context/StateProvider';
import CartContainer from './CartContainer';
import CategoryContainer from '../components/CategoryContainer';


function HomeContainer() {
   const [{cartShow},{foodItems},dispatch]=useStateValue();
   useEffect (()=> {},[cartShow]);

  return (
    <div className='mt-28 w-full pb-40'>

       <NewUpdates/>
       <CategoryContainer />
       {cartShow && (<CartContainer/>)} 

    </div>
  )
}

export default HomeContainer