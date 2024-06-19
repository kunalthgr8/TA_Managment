// import React from 'react'
import {Logo,BaseLogo,Button,GoogleLogo} from '../index'
import {Link} from 'react-router-dom'

function Login() {
  return (
    <div className="bg-custom-purple pt-16 pr-10 pb-5 pl-10 md:pt-16 md:pr-20 md:pb-5 md:pl-20 h-screen overflow-scroll ">
      <div className='  bg-white rounded-3xl flex flex-col items-center content-center md:flex-row overflow-scroll'>
        <div className='w-1/2 flex flex-col items-center justify-center '>
          <div className='  flex flex-col p-8 gap-4 md:gap-14 '>
            <Logo width="200px" height="200px" />
            <BaseLogo width="190px" height="px" className='p-20'/>
          </div>
        </div>
        <div className=' h-full border-t-4 md:border-l-4 md:border-t-0 border-solid border-purple-800 pt-5 md:w-1/2 flex flex-col items-center '>
          <div className='text-2xl font-semibold mb-10 mt-10'>Log In</div>
          <form className=''>
            <div className='flex flex-col gap-5 items-center' >
              <input 
              className=' w-60 sm:w-72 lg:w-96 bg-gray-300 text-lg py-2 px-4 rounded-lg text-gray-700 font-semibold'
              placeholder='ID Number'
              type='number'
              required
                />
              
              <input
              className='w-60 sm:w-72 lg:w-96 bg-gray-300 text-lg py-2 px-4 rounded-lg text-gray-700 font-semibold'
              placeholder='Password'
              type='password'
              required/>
            </div>
          </form>
          <Button className='w-32 bg-custom-purple rounded-3xl items-center content-center m-5 font-medium  text-white '>Sign In</Button>
          {/* <Button className='w-32 bg-custom-purple rounded-3xl items-center content-center m-5 font-medium  text-white '>Sign In</Button> */}
        {/* <Link to="/signin">Already Have an account?</Link> */}
        <div className='w-60 sm:w-72 lg:w-96 flex justify-between content-center items-center'>
            <Link className='text-gray-700 flex content-center items-center' to="/signin">Create New Account</Link>
            <Link className='text-gray-700  flex content-center items-center' to="/signin">Forgot Password</Link>
          </div>
          <hr className=' border-purple-800 min-w-60 sm:min-w-72 lg:w-96'/>
          <Button className='bg-gray-300 w-48 rounded-3xl flex items-center content-center m-5 text-gray-700' > <GoogleLogo width='20px' height='20px'/> <p className='ml-3'>SignIn by google</p></Button>
        
        </div>
      </div>
    </div>
  )
}

export default Login

