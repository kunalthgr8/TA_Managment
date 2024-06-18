// import React from 'react';
// import PropTypes from 'prop-types';
import Logo from '../../assets/IITLOGO1.png';

function BaseLogo({ width = '100px', height = '100px' }) {
  return (
    <div>
      <img src={Logo} alt="IITLogo" style={{ width, height }} />
    </div>
  );
}

// BaseLogo.propTypes = {
//   width: PropTypes.string,
//   height: PropTypes.string,
// };

export default BaseLogo;
