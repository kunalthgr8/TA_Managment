import React from 'react';
import {useSelector} from 'react-redux';


function Home() {

  const user = useSelector(state => state.user);
  const facultyStatus = useSelector(state => state.facultyStatus);
  
  return (
    <div>Home</div>
  )
}

export default Home