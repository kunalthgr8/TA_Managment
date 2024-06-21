import {Button} from "../index";

function Card({ width = '100px', height = '100px', className = "", src= "" }) {
    return (
        <div className={className}>
        <div className='flex md:flex-row justify-between p-10 items-center flex-col gap-5 '>
            <div className="flex w-full sm:flex-row  flex-col gap-5 md:w-2/3  lg:w-1/2 justify-evenly ">
                <img className="rounded-full" src={src} alt="Profile" style={{ width, height }}  />
                <div className="text-custom-purple">
                    <h1 className="text-2xl font-bold">Kunal Singla</h1>
                    <p className="font-bold">12140970</p>
                    <p className="font-bold">kunalsingla@iitbhilai.ac.in</p>
                    <p className="font-bold">7973-03702</p>
                </div>
            </div>
            <Button className="bg-gray-300 w-32 rounded-3xl text-custom-purple">Details</Button>
        </div>
     </div>
    );
  }
  
  export default Card;