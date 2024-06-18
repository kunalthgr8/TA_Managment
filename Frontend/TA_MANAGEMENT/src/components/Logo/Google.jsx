// import React from 'react';
// import PropTypes from 'prop-types';
import Logo from '../../assets/google.png';

function GoogleLogo({ width = '100px', height = '100px' }) {
  return (
    <div>
      <img src={Logo} alt="GoogleLogo" style={{ width, height }} />
    </div>
  );
}

// Logo.propTypes = {
//   width: PropTypes.string,
//   height: PropTypes.string,
// };

export default GoogleLogo;