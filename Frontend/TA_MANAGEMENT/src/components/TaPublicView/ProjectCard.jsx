import React from 'react'

function ProjectCard() {
  return (
    <div className='w-full mt-2 mb-3 bg-custom-gray p-4 rounded-xl '>
        <div className='flex flex-row justify-between'>
        <h1 className='text-custom-black text-lg font-semibold tracking-wide'>Project Name</h1>
        <div className='flex justify-evenly self-center font-medium text-sm gap-3 text-custom-purple'>
            <p className='cursor-pointer'>Link1</p>
            <p className='cursor-pointer'>Link2</p>
            <p className='cursor-pointer'>Link3</p>
        </div>
        </div>
        <h2 className='text-gray-500 text-base font-bold'>Full Stack</h2>
        <div className='flex flex-row gap-3'>
            <p className='text-gray-500 text-xs font-bold'>Tech Stack: </p>
            <p className='text-gray-500 text-xs'>React, Node, Express, MongoDB</p>
        </div>
        <div className='flex flex-row gap-3'>
            <p className='text-gray-500 text-xs'>This is a full Stack project...................</p>
        </div>

    </div>
  )
}

export default ProjectCard