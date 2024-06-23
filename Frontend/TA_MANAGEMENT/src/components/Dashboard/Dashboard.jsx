import React from 'react'
import { ProfileLogo, Card } from '../index'
import cat from '../../assets/cat.jpg';

const ProfileDetails = ({ title, details }) => (
  <div className='flex flex-col gap-2 text-custom-purple'>
    {details.map((detail, index) => (
      <p key={index} className='font-bold text-xl'>{detail}</p>
    ))}
  </div>
);

function Dashboard() {
  const courseDetails = [
    "Course Code: CS690",
    "Semester: Monsoon23-24",
    "Professor: Dr. Gagan Raj Gupta",
    "Course Name: Machine Learning"
  ];

  return (
    <div className='bg-custom-purple h-full w-4/5 pt-7'>
      <div className='bg-white rounded-2xl m-10'>
        <div className='flex md:flex-row md:items-center justify-around content-center p-10 flex-col gap-5'>
          <ProfileLogo src={cat} width="200px" height="200px" className='rounded-full' />
          <ProfileDetails title="Course Details" details={courseDetails} />
        </div>
        <h1 className='text-2xl font-bold ml-5 sm:ml-24 mt-5'>Teaching Assistant Information</h1>
        <div className='flex flex-col content-center p-4 sm:p-10 pt-0 gap-10'>
          {[1, 2, 3, 4].map((item) => (
            <Card
              key={item}
              className='sm:m-5 shadow-xl rounded-3xl'
              src={cat}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
