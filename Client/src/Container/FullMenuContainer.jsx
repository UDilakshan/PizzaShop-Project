import React from 'react';
import MenuBg from '../images/OtherImages/MenuBg.jpg'

const FullMenuContainer = () => {
  return (
    <div>
      <img src={MenuBg} className='md:w-full h-screen md:h-full bg-fixed md:blur-sm blur-none' alt="Background" />
    </div>
  )
}

export default FullMenuContainer