// import React from 'react';
// import PropTypes from 'prop-types';
import IITLogo from '../../assets/IITLOGO.svg';

import React from 'react';

function Logo({ width = '100px', height = '100px' }) {
  return (
    <div className='transition duration-400 ease-out hover:ease-in flex justify-center text-center' >
        <img className='transition duration-400 ease-out hover:ease-in transform hover:scale-110' src={IITLogo} alt="Aoushadhi" style={{ width, height }} />
    </div>
  );
}

export default Logo;
