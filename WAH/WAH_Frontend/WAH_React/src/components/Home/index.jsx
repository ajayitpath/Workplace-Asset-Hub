import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  console.log("Hello Chaitali");
  return (
    <>
      <div className='flex gap-5 justify-center items-center min-h-screen'>
        <Link to='/dashboard' className='bg-gray-400 p-3 rounded-md'>Dashboard</Link>
        <Link to='/login' className='bg-gray-400 p-3 rounded-md'>Login</Link>
      </div>
    </>
  )
}

export default Home