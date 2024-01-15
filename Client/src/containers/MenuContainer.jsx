import React from 'react';
import { pizzaData } from '../utils/data';


function MenuContainer(){
  return (
    <div>
      <div className='w-full h-full absolute flex items-start justify-start px-16 py-24'>
        
    {pizzaData && pizzaData.map((n)=>(
        <div key={n.id} className='w-190 p-4 bg-gray-200 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center'>
          <img src={n.imgsrc} className='w-40 -mt-20 rounded-md' alt='Pizza'  />
          <p className="text-xl font-semibold text-textColor mt-4">{n.name}</p>
          <p className=' text-sm text-gray-700 font-semibold my-2'>{n.decp}</p>
{/*           <p className=' text-sm text-headingColor font-semibold'><span className='text-xs text-red-600'>$</span>{n.price}</p>
 */}        </div>
        ))}
      </div>
    </div>
  )
}

export default MenuContainer;