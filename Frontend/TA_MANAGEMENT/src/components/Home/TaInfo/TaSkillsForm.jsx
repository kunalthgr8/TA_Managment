import React, { useEffect } from 'react'
import { useState } from 'react'
import { Input, Button } from "../../index";

function TaSkillsForm() {
  
  const [skills, setSkills] = useState({
    area_of_specialization: ["Python","Java"],
    primary_programming_skills: ["Python","Java"],
    secondary_programming_skills: ["Python","Java"],
    primary_skills: ["Python","Java"],
    secondary_skills: ["Python","Java"],
    software_tools: ["Python","Java"],
    hardware_tools: ["Python","Java"],
    publications: ["Python","Java"],
    patents: ["Python","Java"],
  });

  const [currentSkills, setCurrentSkills] = useState({
    area_of_specialization: "",
    primary_programming_skills: "",
    secondary_programming_skills: "",
    primary_skills: "",
    secondary_skills: "",
    software_tools: "",
    hardware_tools: "",
    publications: "",
    patents: "",
  });


  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkills((prev) => ({ ...prev, [name]: value }));
  }

  const addSkill = (category, newSkill) => {
    setSkills((prevSkills) => ({
      ...prevSkills,
      [category]: [...prevSkills[category], newSkill],
    }));

  };

  const handleAddSkill = (category,skill) => {
    const newSkill = skill
    addSkill(category, newSkill);
    setCurrentSkills((prev) => ({ ...prev, [category]: "" }));
    
  };

  const handleRemoveSkill = (category, index) => {
    setSkills((prevSkills) => ({
      ...prevSkills,
      [category]: prevSkills[category].filter((_, i) => i !== index),
    }));
  };

  const updateSkills = () => {
    console.log(skills);
  }

  const handleCancel = () => {
    setIsFormVisible(false)
    setCurrentSkills({
      area_of_specialization: "", 
      primary_programming_skills: "",
      secondary_programming_skills: "",
      primary_skills: "",
      secondary_skills: "",
      software_tools: "",
      hardware_tools: "",
      publications: "",
      patents: "",
    });
    setSkills({
      area_of_specialization: [],
      primary_programming_skills: [],
      secondary_programming_skills: [],
      primary_skills: [],
      secondary_skills: [],
      software_tools: [],
      hardware_tools: [],
      publications: [],
      patents: [],
    });
    

  }


  return (
    <div className="flex flex-col gap-5 m-2 lg:m-5">
      <h1 className="text-lg font-bold text-gray-800 pl-4">Skills </h1>
      {isFormVisible && (
        <div className="flex flex-col justify-center self-center gap-4 w-3/4 bg-custom-gray rounded-xl p-4">
          <div className='flex w-full'>
            <Input
              type="text"
              name="area_of_specialization"
              value={currentSkills.area_of_specialization}
              placeholder="Area of Specialization"
              className="rounded-l-full bg-white "
              label="Area of Specialization"
              onChange={handleChange}
            />
            <Button 
            className=" bg-slate-500 mt-7 rounded-r-full" 
            onClick={() => handleAddSkill("area_of_specialization",currentSkills.area_of_specialization)}
            >+</Button>
          </div>
          { skills.area_of_specialization.length>0 &&(
            <div className='flex'>
            {skills.area_of_specialization.map((skill, index) => (
              <div key={index} className=''>
                <Button 
                className='flex bg-slate-300 mr-3 rounded-md'
                onClick={() => handleRemoveSkill("area_of_specialization",index)}
                >{skill} <p className='ml-4 text-gray-500'>x</p></Button>
              </div>
            ))}
            </div>
          )
          }
          <div className='flex w-full'>
            <Input
              type="text"
              name="primary_programming_skills"
              value={currentSkills.primary_programming_skills}
              placeholder="Primary Programming Skills"
              className="rounded-l-full bg-white "
              label="Primary Programming Skills"
              onChange={handleChange}
            />
            <Button 
            className=" bg-slate-500 mt-7 rounded-r-full" 
            onClick={() => handleAddSkill("primary_programming_skills",currentSkills.primary_programming_skills)}
            >+</Button>          </div>
          { skills.primary_programming_skills.length>0 &&(
            <div className='flex'>
            {skills.primary_programming_skills.map((skill, index) => (
              <div key={index} className=''>
                <Button 
                className='flex bg-slate-300 mr-3 rounded-md'
                onClick={() => handleRemoveSkill("primary_programming_skills",index)}
                >{skill} <p className='ml-4 text-gray-500'>x</p></Button>              </div>
            ))}
            </div>
          )
          }
          <div className='flex w-full'>
            <Input
              type="text"
              name="secondary_programming_skills"
              value={currentSkills.secondary_programming_skills}
              placeholder="Secondary Programming Skills"
              className="rounded-l-full bg-white "
              label="Secondary Programming Skills"
              onChange={handleChange}
            />
            <Button 
            className=" bg-slate-500 mt-7 rounded-r-full" 
            onClick={() => handleAddSkill("secondary_programming_skills",currentSkills.secondary_programming_skills)}
            >+</Button>          </div>
          { skills.secondary_programming_skills.length>0 &&(
            <div className='flex'>
            {skills.secondary_programming_skills.map((skill, index) => (
              <div key={index} className=''>
                <Button 
                className='flex bg-slate-300 mr-3 rounded-md'
                onClick={() => handleRemoveSkill("secondary_programming_skills",index)}
                >{skill} <p className='ml-4 text-gray-500'>x</p></Button>
              </div>
            ))}
            </div>
          )
          }
          <div className='flex w-full'>
            <Input
              type="text"
              name="primary_skills"
              value={currentSkills.primary_skills}
              placeholder="Primary Skills"
              className="rounded-l-full bg-white"
              label="Primary Skills"
              onChange={handleChange}
            />
            <Button 
            className=" bg-slate-500 mt-7 rounded-r-full" 
            onClick={() => handleAddSkill("primary_skills",currentSkills.primary_skills)}
            >+</Button>
          </div>
          { skills.primary_skills.length>0 &&(
            <div className='flex'>
            {skills.primary_skills.map((skill, index) => (
              <div key={index} className=''>
                <Button 
                className='flex bg-slate-300 mr-3 rounded-md'
                onClick={() => handleRemoveSkill("primary_skills",index)}
                >{skill} <p className='ml-4 text-gray-500'>x</p></Button>
              </div>
            ))}
            </div>
          )
          }

          <div className='flex w-full'>
            <Input
              type="text"
              name="secondary_skills"
              value={currentSkills.secondary_skills}
              placeholder="Secondary Skills"
              className="rounded-l-full bg-white "
              label="Secondary Skills"
              onChange={handleChange}
            />
            <Button 
            className=" bg-slate-500 mt-7 rounded-r-full" 
            onClick={() => handleAddSkill("secondary_skills",currentSkills.secondary_skills)}
            >+</Button>
          </div>
          { skills.secondary_skills.length>0 &&(
            <div className='flex'>
            {skills.secondary_skills.map((skill, index) => (
              <div key={index} className=''>
                <Button 
                className='flex bg-slate-300 mr-3 rounded-md'
                onClick={() => handleRemoveSkill("secondary_skills",index)}
                >{skill} <p className='ml-4 text-gray-500'>x</p></Button>
              </div>
            ))}
            </div>
          )
          }
          <div className='flex w-full'>
            <Input
              type="text"
              name="software_tools"
              value={currentSkills.software_tools}
              placeholder="Software Tools"
              className="rounded-l-full bg-white"
              label="Software Tools"
              onChange={handleChange}
            />
            <Button 
            className=" bg-slate-500 mt-7 rounded-r-full" 
            onClick={() => handleAddSkill("software_tools",currentSkills.software_tools)}
            >+</Button>
          </div>
          { skills.software_tools.length>0 &&(
            <div className='flex'>
            {skills.software_tools.map((skill, index) => (
              <div key={index} className=''>
                <Button 
                className='flex bg-slate-300 mr-3 rounded-md'
                onClick={() => handleRemoveSkill("software_tools",index)}
                >{skill} <p className='ml-4 text-gray-500'>x</p></Button>
              </div>
            ))}
            </div>
          )
          }
          <div className='flex w-full'>
            <Input
              type="text"
              name="hardware_tools"
              value={currentSkills.hardware_tools}
              placeholder="Hardware Tools"
              className="rounded-l-full bg-white"
              label="Hardware Tools"
              onChange={handleChange}
            />
            <Button 
            className=" bg-slate-500 mt-7 rounded-r-full" 
            onClick={() => handleAddSkill("hardware_tools",currentSkills.hardware_tools)}
            >+</Button>
          </div>
          { skills.hardware_tools.length>0 &&(
            <div className='flex'>
            {skills.hardware_tools.map((skill, index) => (
              <div key={index} className=''>
                <Button 
                className='flex bg-slate-300 mr-3 rounded-md'
                onClick={() => handleRemoveSkill("hardware_tools",index)}
                >{skill} <p className='ml-4 text-gray-500'>x</p></Button>
              </div>
            ))}
            </div>
          )
          }
          <div className='flex w-full'>
            <Input
              type="text"
              name="publications"
              value={currentSkills.publications}
              placeholder="Publications"
              className="rounded-l-full bg-white "
              label="Publications"
              onChange={handleChange}
            />
            <Button 
            className=" bg-slate-500 mt-7 rounded-r-full" 
            onClick={() => handleAddSkill("publications",currentSkills.publications)}
            >+</Button>
          </div>
          { skills.publications.length>0 &&(
            <div className='flex'>
            {skills.publications.map((skill, index) => (
              <div key={index} className=''>
                <Button 
                className='flex bg-slate-300 mr-3 rounded-md'
                onClick={() => handleRemoveSkill("publications",index)}
                >{skill} <p className='ml-4 text-gray-500'>x</p></Button>
              </div>
            ))}
            </div>
          )
          }
          <div className='flex w-full'>
            <Input
              type="text"
              name="patents"
              value={currentSkills.patents}
              placeholder="Patents"
              className="rounded-l-full bg-white"
              label="Patents"
              onChange={handleChange}
            />
            <Button 
            className=" bg-slate-500 mt-7 rounded-r-full" 
            onClick={() => handleAddSkill("patents",currentSkills.patents)}
            >+</Button>
          </div>
          { skills.patents.length>0 &&(
            <div className='flex'>
            {skills.patents.map((skill, index) => (
              <div key={index} className=''>
                <Button 
                className='flex bg-slate-300 mr-3 rounded-md'
                onClick={() => handleRemoveSkill("patents",index)}
                >{skill} <p className='ml-4 text-gray-500'>x</p></Button>
              </div>
            ))}
            </div>
          )
          }
          <div className="flex gap-5 m-5 w-1/2">
          <Button
              className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
              width="w-1/4"
              onClick={updateSkills}
            >
              Save
            </Button>
            <Button
              className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
              width="w-1/4"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            
          </div>
        </div>
      )}
      {!isFormVisible && (
        <p
          className="text-sm font-medium tracking-wide text-custom-purple pl-4 cursor-pointer w-1/3"
          onClick={()=>setIsFormVisible(true)}
        >
          + Add Skills
        </p>
      )}
    </div>
  );
}

export default TaSkillsForm;