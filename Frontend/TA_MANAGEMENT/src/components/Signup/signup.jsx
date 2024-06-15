// import React from 'react'
import {Logo,BaseLogo} from '../index'
// import {Link} from 'react-router-dom'

function Signup() {
  return (
    <div className="bg-custom-purple pt-16 pr-20 pb-5 pl-20 h-screen overflow-hidden">
      <div className='bg-white rounded-3xl flex sticky '>
        <div className='w-1/2 flex flex-col items-center justify-center '>
          <div className='max-h-full overflow-hidden flex flex-col p-8 gap-14 '>
            <Logo width="200px" height="200px" />
            <BaseLogo width="190px" height="px" className='p-20'/>
          </div>
        </div>
        <div className='h-auto border-l-4 border-solid border-purple-800 pt-5 w-1/2 flex flex-col items-center '>
          <div className='text-2xl font-semibold mb-10'>Signup!</div>
          <form className=''>
            <div className='flex flex-col gap-5 items-center' >
              <input 
              className='w-80 bg-gray-300 text-lg py-2 px-4 rounded-lg text-gray-700 font-semibold'
              placeholder='ID Number'
              type='number'
              required
                />
              <input
              className='w-80 bg-gray-300 text-lg py-2 px-4 rounded-lg text-gray-700 font-semibold'
              placeholder='Username'
              type='text'
              required
              />
              <input
              className='w-80 bg-gray-300 text-lg py-2 px-4 rounded-lg text-gray-700 font-semibold'
              placeholder='Email ID'
              type='email'
              required/>
              <input
              className='w-80 bg-gray-300 text-lg py-2 px-4 rounded-lg text-gray-700 font-semibold' 
              placeholder='Phone Number'
              type='number'
              required/>
              <input
              className='w-80 bg-gray-300 text-lg py-2 px-4 rounded-lg text-gray-700 font-semibold'
              placeholder='Password'
              type='password'
              required/>
            </div>
          </form>
          <button>Submit</button>
        {/* <Link to="/">Already Have an account?</Link> */}
          <hr className=' border-purple-800 min-w-80'/>
          {/* <Button>Signup by google</Button> */}
        
        </div>
      </div>
    </div>
  )
}

export default Signup