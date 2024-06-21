// import React from 'react'
import {ProfileLogo,Card} from '../index'
// import {Link} from 'react-router-dom'
import cat from '../../assets/cat.jpg';

function Dashboard() {
  return (
    <div className='bg-custom-purple h-screen pt-7 overflow-scroll'>
      <div className='bg-white rounded-2xl m-10'>
        <div className='flex md:flex-row md:items-center justify-around content-center p-10 flex-col gap-5'>
          <ProfileLogo src={cat} width="200px" height="200px" className='rounded-full'/>
          <div className='flex flex-col gap-2 text-custom-purple'>
            <h1 className='text-2xl font-bold'>
              Course Code: CS690
            </h1>
            <p className='font-bold'>Semester: Monsoon23-24</p>
            <p className='font-bold'>Professor: Dr. Gagan Raj Gupta</p>
            <p className='font-bold'>Course Name: Machine Learning</p>
          </div>
        </div>
        <h1 className='text-2xl font-bold ml-5 sm:ml-24 mt-5'>Teaching Assistant Information</h1>
        <div className='flex flex-col content-center p-4 sm:p-10 pt-0 gap-10'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Card
            key={item}
            className='sm:m-5 shadow-xl rounded-3xl'
            src={cat}
          />
        ))}
        </div>

        <div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard