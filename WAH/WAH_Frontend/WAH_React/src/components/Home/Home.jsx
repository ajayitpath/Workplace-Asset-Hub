import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div className='flex justify-center items-center min-h-screen'>
        <Link to='/dashboard' className='bg-gray-400 p-3 rounded-md'>Go to Admin Dashboard</Link>
      </div>
    </>
  )
}

export default Home