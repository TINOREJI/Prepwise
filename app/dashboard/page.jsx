import React from 'react';
import AddInterview from './_component/addInterview';

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl text-[#a900e2]'>Dashboard</h2>
      <h2 className='text-[#8f49a6]'>Create and Start Your MockUp Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddInterview/>
      </div>
      </div>
  )
}

export default Dashboard