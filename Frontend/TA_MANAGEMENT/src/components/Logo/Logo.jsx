// import React from 'react';
// import PropTypes from 'prop-types';
import IITLogo from '../../assets/IITLOGO.svg';

function Logo({ width = '100px', height = '100px' , classname = 'w-full' }) {
  return (
    <div>
      <img  className= {classname} src={IITLogo} alt="IITLogo" style={{ width, height }} />
    </div>
  );
}

// Logo.propTypes = {
//   width: PropTypes.string,
//   height: PropTypes.string,
// };

export default Logo;
