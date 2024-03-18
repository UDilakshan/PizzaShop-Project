import React, { useEffect } from 'react';
import NewUpdates from './NewUpdates';
import MenuContainer from './MenuContainer';
import { useStateValue } from '../context/StateProvider';
import CardContainter from '../Container/CardContainter';
import CategoryContainer from './CategoryContainer';


function HomeContainer() {
   const [{cartShow},{foodItems},dispatch]=useStateValue();
   useEffect (()=> {},[cartShow]);

  return (
    <div className='md:mt-8 mt-12 '>

       <NewUpdates/>
       <CategoryContainer />
       <MenuContainer /> 
       {cartShow && (<CardContainter/>)} 

    </div>
  )
}

export default HomeContainer


