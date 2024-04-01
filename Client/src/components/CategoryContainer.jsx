import React, { useEffect, useState } from 'react'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'


const CategoryContainer = () => {

    const [{foodItems},dispatch] = useStateValue();   
  return (
        <section className='w-full mt-8 md:mt-24 h-auto'>
            <div className= "w-full flex items-center justify-center md:justify-between">
                <p className='md:text-3xl text-xl font-semibold capitalize text-gray-950 relative before:absolute before:rounded-lg before:w-28 before:content before:h-1 before:-bottom-1 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-700 transition-all ease-in-out duration-100 flex justify-center md:ml-24'>Categories</p>
            </div>

            <RowContainer flag={false} data={foodItems?.filter(n => n.category ==="Category")}/>
         </section>
  )
}

export default CategoryContainer