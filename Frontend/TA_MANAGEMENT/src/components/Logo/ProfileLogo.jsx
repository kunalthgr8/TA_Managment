// import cat from '../../assets/cat.jpg';

function ProfileLogo({ width = '100px', height = '100px', className = "w-full", src= "" }) {
  return (
    <div className=''>
      <img className={className} src={src} alt="IITLogo" style={{ width, height }} />
    </div>
  );
}

export default ProfileLogo;