import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'


const CategoryContainer = () => {

    const [{foodItems},dispatch] = useStateValue();

    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => {} ,[scrollValue])


  return (
        <section className='w-full md:my-16 my-8'>
          <div className= "w-full flex items-center justify-center">
                <p className='md:text-3xl text-2xl font-semibold capitalize text-gray-950 relative before:absolute before:rounded-lg before:w-32 before:content before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-700 transition-all ease-in-out duration-100 md:ml-8'>Categories</p>

           {/*  <div className='hidden md:flex gap-3 items-center'>

                    <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-950         cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center'
                        onClick={()=>setScrollValue(-200)}> <MdChevronLeft className='text-lg text-white' />

                    </motion.div>

                    <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-950 cursor-pointer transition-all
                    duration-100 ease-in-out hover:shadow-lg flex items-center justify-center' onClick={()=>setScrollValue(200)}> <MdChevronRight className='text-lg text-white' />

                    </motion.div>
             </div> */}
             
         </div>

            <RowContainer scrollValue={scrollValue} flag={true} data={foodItems?.filter(n => n.category ==='Category' || n.category === 'other')}/>
         </section>
  )
}

export default CategoryContainer