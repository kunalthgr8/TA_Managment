import React from 'react'
import {Logo,ProfileLogo} from '../index'
import {Link} from 'react-router-dom'
import cat from '../../assets/cat.jpg';

function Header() {
  return (
    <div className=' bg-custom-purple h-auto'>
      <div className='bg-white flex justify-between items-center rounded-2xl p-1' >
        <div className='flex sm:w-2/3 lg:w-1/2 content-center items-center justify-between'>
          <Logo width="60px" height="70px" classname='ml-6 content-center items-center' />
          <Link className='text-custom-purple font-bold' to="/home">Home</Link>
          <Link className='text-custom-purple font-bold' to="/mycourses">MyCourses</Link>
          <Link className='text-custom-purple font-bold' to="/approvedta">ApprovedTA</Link>
          <Link className='text-custom-purple font-bold' to="/leaves">Leaves</Link>
        </div>
        <div className='flex flex-col items-center mr-4'>
          <ProfileLogo width="50px" height="50px" className='rounded-3xl' src={cat}/>
          <p>Gagan Raj Gupta</p>
        </div>
      </div>
    </div>
  )
}

export default Header

