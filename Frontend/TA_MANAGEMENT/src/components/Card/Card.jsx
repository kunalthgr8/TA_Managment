import {Button} from "../index";

function Card({ width = '100px', height = '100px', className = "", src= "" }) {
    return (
        <div className={className}>
        <div className='flex flex-col md:flex-row justify-between bg-slate-100 rounded-lg p-5 gap-4 '>
            <div className="flex flex-col justify-center self-center w-full sm:w-4/5 md:flex-row md:w-3/4 gap-5 md:justify-evenly p-4">
                <img className="rounded-full flex justify-center self-center" src={src} alt="Profile" style={{ width, height }}  />
                <div className="text-custom-purple flex flex-col justify-center self-center gap-2">
                    <h1 className=" text-lg lg:text-2xl font-bold">Kunal Singla</h1>
                    <p className="text-sm lg:text-base font-medium">12140970</p>
                    <p className="text-sm lg:text-base font-medium">kunalsingla@iitbhilai.ac.in</p>
                    <p className="text-sm lg:text-base font-medium">7973-03702</p>
                </div>
            </div>
            <Button width="flex justify-center self-center" className="bg-gray-300 w-32 font-bold rounded-3xl text-custom-purple">Details</Button>
        </div>
     </div>
    );
  }
  
  export default Card;