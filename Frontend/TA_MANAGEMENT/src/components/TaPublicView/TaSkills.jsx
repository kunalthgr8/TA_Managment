import React, {useState} from 'react'

function TaSkills() {
  const [skills, setSkills] = useState(["Java","Python"]);
  return (
    <div className="flex flex-col w-4/5 justify-center self-center gap-3 mt-5">
      <h1 className="text-white font-medium text-xl ">Skills</h1>
      <div className="flex flex-col  justify-center w-full gap-2 self-center bg-white p-8 rounded-lg border-2 border-custom-gray shadow-slate-700">
      { skills.length>0 && <div className="flex flex-wrap mt-2 bg-custom-gray py-3 px-3 rounded-xl">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="flex gap-1 bg-custom-purple text-white text-sm  px-3 py-1 m-1 rounded-xl"
              >
                {skill}
                
              </span>
            ))}
          </div>}
      </div>
    </div>
  )
}

export default TaSkills