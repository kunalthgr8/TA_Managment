import React, { useState,useEffect } from "react";
import { Input, Button } from "../../index";
import { FaLightbulb } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { VscGithub } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useMutation,useQuery } from '@apollo/client';
import { EXPERIENCE_USER } from "../../../graphql/mutations/user.mutations";
import { GET_EXPERIENCE_USER } from "../../../graphql/queries/user.queries";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { MdDelete } from "react-icons/md";

function TaExperienceForm() {
  // const [experiences, setexperiences] = useState([
  //   {
  //     Company: "Exprto",
  //     Role: "Mentor",
  //     description: "This is a mentoring Company...",
  //     startDate: "2023-01-01",
  //     endDate: "2023-12-31",
  //   },
  // ]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const userData = useSelector((state) => state.auth.user);
  const [createExperience, { data, loading }] = useMutation(EXPERIENCE_USER);
  const [experiences, setexperiences] = useState([]);
  const { data: experienceData} = useQuery(GET_EXPERIENCE_USER,{
    variables: { idNumber: userData.idNumber },
    skip: !userData.idNumber,
  } );

  useEffect(() => {
    if (experienceData && experienceData.getExperience && experienceData.getExperience.data && experienceData.getExperience.data.experience) {
      const mappedexperiences = experienceData.getExperience.data.experience.map((experience) => ({
        Company: experience.company,
        Role: experience.role,
        description: experience.description,
        startDate: experience.startDate,
        endDate: experience.endDate
      }));
      setexperiences(mappedexperiences);
    }
  }, [experienceData]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    Company: "",
    Role: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    const updatedexperiences = [...experiences];
    if (editIndex !== null) {
      updatedexperiences[editIndex] = currentProject;
    } else {
      updatedexperiences.push(currentProject);
    }
    setexperiences(updatedexperiences);
    // resetForm();
  };
  useEffect(() => {
    if (experiences.length > 0) {
      // Make sure the state is updated before calling the backend
      const updateExperienceInBackend = async () => {
        try {
          const response = await createExperience({
            variables: {
              input: {
                idNumber: userData.idNumber,
                experience: experiences.map((experience) => ({
                  company: experience.Company,
                  role: experience.Role,
                  description: experience.description,
                  startDate: experience.startDate,
                  endDate: experience.endDate,
                })),
              },
            },
          });
          console.log('Response:', response);
          if (response.data.createExperience.status === 201) {
            setError('Experience added successfully');
            console.log('Experience added successfully');
            resetForm();
            // navigate("/");
          }
        } catch (error) {
          setError(error.message);
        }
      };

      updateExperienceInBackend();
    }
  }, [experiences, userData.idNumber, createExperience]);


  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setCurrentProject({
      Company: "",
      Role: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    setEditIndex(null);
  };

  const handleAddAnother = () => {
    setIsFormVisible(true);
    setCurrentProject({
      Company: "",
      Role: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleEdit = (index) => {
    setIsFormVisible(true);
    setCurrentProject(experiences[index]);
    setEditIndex(index);
  };
  const deleteExperience = (index) => {
    const updatedexperiences = [...experiences];
    updatedexperiences.splice(index, 1);
    setexperiences(updatedexperiences);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  return (
    <div className="flex flex-col gap-5 m-2 lg:m-5 mt-4">
      <h1 className="text-lg font-bold text-gray-800 pl-4">Experience</h1>
      {experiences.map((project, index) => (
        <div
          key={index}
          className="flex flex-row justify-center self-center gap-4 w-4/5 lg:w-3/4 bg-custom-gray rounded-xl p-4"
        >
          <div className="flex justify-center self-center m-4">
            <FaLightbulb className="text-7xl text-custom-purple" />
          </div>
          <div className="w-full mt-2 mb-3 bg-custom-gray py-3 px-3 rounded-xl">
            <div className="flex justify-between mr-4">
              <div className="flex w-full justify-between self-center">
                <h1 className="text-gray-500 text-lg font-semibold tracking-wide">
                  {project.Company}
                </h1>
                <div className="flex justify-center self-center">
                  <MdDelete
                    className="text-gray-500 text-lg font-semibold cursor-pointer tracking-wide"
                    onClick={() => deleteExperience(index)}
                  />
                </div>
              </div>
            </div>
            <h2 className="text-custom-black font-medium text-base">
              {project.Role}
            </h2>

            <p className="text-gray-500 text-xs">
              {`From: ${project.startDate} To: ${project.endDate}`}
            </p>
            <p className="text-gray-500 text-xs">
              {project.description.substring(0, 40) + "......"}
            </p>
            <p
              className="text-right text-custom-purple flex justify-end self-center gap-2 cursor-pointer"
              onClick={() => handleEdit(index)}
            >
              <MdOutlineEdit />
              Edit
            </p>
          </div>
        </div>
      ))}

      {isFormVisible && (
        <div className="flex flex-col justify-center self-center gap-4 w-3/4 bg-custom-gray rounded-xl p-4">
          {["Company", "Role", "description"].map((field) => (
            <Input
              key={field}
              type="text"
              name={field}
              value={currentProject[field]}
              placeholder={field}
              className="rounded-md bg-white"
              label={field}
              onChange={handleChange}
            />
          ))}
          <Input
            type="date"
            name="startDate"
            value={currentProject.startDate}
            placeholder="Start Date"
            className="rounded-md bg-white"
            label="Start Date"
            onChange={handleChange}
          />
          <Input
            type="date"
            name="endDate"
            value={currentProject.endDate}
            placeholder="End Date"
            className="rounded-md bg-white"
            label="End Date"
            onChange={handleChange}
          />

          <div className="flex gap-5 m-5 w-1/2">
            <Button
              className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
              width="w-1/4"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
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
          onClick={handleAddAnother}
        >
          + Add Another Experience
        </p>
      )}
    </div>
  );
}

export default TaExperienceForm;
