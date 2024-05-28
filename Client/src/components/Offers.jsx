import React from 'react'
import { Link } from 'react-router-dom'

const Offers = () => {
  return (
    <Link to={"/FullMenuContainer"}>
    <div className='flex items-center justify-center mt-72'>
      <button className='flex items-center justify-center rounded-xl bg-red-500 text-white p-2'>Menu</button>
    </div>
    </Link>
  )
}

export default Offers