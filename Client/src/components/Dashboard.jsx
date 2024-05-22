import React from 'react'
import { Link } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div  className='flex items-center justify-center bg-pink-600 w-full h-screen'>
        <Link to={"/"}>
            <button className='bg-white text-black px-4 py-2'>Home</button>
        </Link>
    </div>
  )
}

export default Dashboard