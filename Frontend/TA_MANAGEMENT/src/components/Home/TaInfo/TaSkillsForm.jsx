import React, { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Input, Button } from "../../index";
import { MdAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CREATE_SKILLS, UPDATE_SKILLS, DELETE_SKILLS } from "../../../graphql/mutations/taSkill.mutations";
import { GET_SKILLS } from "../../../graphql/queries/taSkill.query";
import { useSelector } from "react-redux";

function TaSkillsForm() {
  const userData = useSelector((state) => state.auth.user);

  const [skills, setSkills] = useState({
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

  const [createSkills] = useMutation(CREATE_SKILLS);
  const [updateSkills] = useMutation(UPDATE_SKILLS);
  const [deleteSkills] = useMutation(DELETE_SKILLS);

  const { data } = useQuery(GET_SKILLS, {
    variables: { idNumber: userData.idNumber },
  });

  useEffect(() => {
    if (data && data.getSkills) {
      const {
        areaOfSpecialization,
        primarySkills,
        secondarySkills,
        primaryProgSkills,
        secondaryProgSkills,
        softwareTools,
        hardwareTools,
        patents,
        publications,
      } = data.getSkills;

      setSkills({
        area_of_specialization: areaOfSpecialization,
        primary_programming_skills: primaryProgSkills,
        secondary_programming_skills: secondaryProgSkills,
        primary_skills: primarySkills,
        secondary_skills: secondarySkills,
        software_tools: softwareTools,
        hardware_tools: hardwareTools,
        publications: publications,
        patents: patents,
      });
      console.log("User Skills", data.getSkills);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkills((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = (category, newSkill) => {
    if (newSkill.trim()) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [category]: [...prevSkills[category], newSkill],
      }));
      setCurrentSkills((prev) => ({ ...prev, [category]: "" }));
    }
  };

  const handleAddSkill = useCallback(
    (category) => {
      const newSkill = currentSkills[category];
      addSkill(category, newSkill);
    },
    [currentSkills]
  );

  const handleRemoveSkill = useCallback((category, index) => {
    setSkills((prevSkills) => ({
      ...prevSkills,
      [category]: prevSkills[category].filter((_, i) => i !== index),
    }));
  }, []);

  const handleSave = async () => {
    try {
      await createSkills({
        variables: {
          idNumber: userData.idNumber,
          areaOfSpecialization: skills.area_of_specialization,
          primarySkills: skills.primary_skills,
          secondarySkills: skills.secondary_skills,
          primaryProgSkills: skills.primary_programming_skills,
          secondaryProgSkills: skills.secondary_programming_skills,
          softwareTools: skills.software_tools,
          hardwareTools: skills.hardware_tools,
          patents: skills.patents,
          publications: skills.publications,
        },
      });
    } catch (error) {
      console.error("Error creating skills:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateSkills({
        variables: {
          idNumber: userData.idNumber,
          areaOfSpecialization: skills.area_of_specialization,
          primarySkills: skills.primary_skills,
          secondarySkills: skills.secondary_skills,
          primaryProgSkills: skills.primary_programming_skills,
          secondaryProgSkills: skills.secondary_programming_skills,
          softwareTools: skills.software_tools,
          hardwareTools: skills.hardware_tools,
          patents: skills.patents,
          publications: skills.publications,
        },
      });
    } catch (error) {
      console.error("Error updating skills:", error);
    }
  };

  const handleCancel = async () => {
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
    try {
      await deleteSkills({
        variables: {
          idNumber: userData.idNumber,
        },
      });
    } catch (error) {
      console.error("Error deleting skills:", error);
    }
  };

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="flex flex-col gap-5 m-2 lg:m-5">
      <h1 className="text-lg font-bold text-gray-800 pl-4">Skills</h1>
      {isFormVisible ? (
        <div className="flex flex-col justify-center self-center gap-4 w-11/12 bg-custom-gray rounded-xl p-4 pt-10">
          {Object.keys(skills).map((category) => (
            <React.Fragment key={category}>
              <div className="w-11/12 flex flex-col justify-center self-center bg-white p-5 gap-3 rounded-xl">
                <h2 className="inline-block mb-1 pl-1 font-bold text-custom-black">
                  {capitalizeName(category.replace(/_/g, " "))}
                </h2>
                <div className="flex">
                  <Input
                    type="text"
                    name={category}
                    placeholder={category.replace(/_/g, " ")}
                    className="rounded-l-mg rounded-r-none bg-custom-gray"
                    value={currentSkills[category]}
                    onChange={handleChange}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddSkill(category)
                    }
                  />
                  <button
                    type="button"
                    className="bg-custom-purple text-white text-xl font-bold pl-4 pr-4 rounded-xl rounded-s-none"
                    onClick={() => handleAddSkill(category)}
                  >
                    <MdAdd />
                  </button>
                </div>

                {skills[category].length > 0 && (
                  <div className="flex flex-wrap pl-2 rounded-xl">
                    {skills[category].map((skill, index) => (
                      <span
                        key={index}
                        className="flex gap-1 bg-custom-purple text-white text-sm px-3 py-2 m-1 rounded-xl"
                      >
                        {skill}
                        <p
                          className="flex justify-center self-center cursor-pointer"
                          onClick={() => handleRemoveSkill(category, index)}
                        >
                          <RxCross2 />
                        </p>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
          <div className="flex gap-5 m-5 w-1/2 p-5 pt-0">
            <Button
              className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
              width="w-1/4"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
              width="w-1/4"
              onClick={handleUpdate}
            >
              Update
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
      ) : (
        <p
          className="text-sm font-medium tracking-wide text-custom-purple pl-4 cursor-pointer w-1/3"
          onClick={() => setIsFormVisible(true)}
        >
          + Add Skills
        </p>
      )}
    </div>
  );
}

export default TaSkillsForm;
