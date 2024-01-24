import React from 'react';
import HomeContainer from './HomeContainer';
import MenuContainer from './MenuContainer';


function MainContainer() {
  return (
    <div>
    <div className='mt-7 md:mt-2 px-4 py-4 w-18 md:h-auto scroll-mx-16'>
      <HomeContainer/>
    </div>
    <div className='flex flex-col'>
      <MenuContainer />
    </div>
    </div>
  )
}

export default MainContainer