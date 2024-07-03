import React, { useState } from "react";
import { Input, Button } from "../../index";
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineEdit } from "react-icons/md";

function TaEducationForm() {
  const [educations, setEducations] = useState([
    {
      degree: "B.Tech",
      major: "",
      university: "Indian Institute Of Technology, Bhilai",
      year: "2025",
      cgpa: "7.82",
    },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({
    degree: "",
    major: "",
    university: "",
    year: "",
    cgpa: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    if (isEditMode) {
      const updatedEducations = [...educations];
      updatedEducations[editIndex] = currentEducation;
      setEducations(updatedEducations);
    } else {
      setEducations([...educations, currentEducation]);
    }
    resetForm();
  };

  const handleCancel = () => {
    if (isEditMode) {
      const updatedEducations = [...educations];
      updatedEducations.splice(editIndex, 1);
      setEducations(updatedEducations);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setIsEditMode(false);
    setCurrentEducation({
      degree: "",
      major: "",
      university: "",
      year: "",
      cgpa: "",
    });
    setEditIndex(null);
  };

  const handleAddAnother = () => {
    setIsFormVisible(true);
    setIsEditMode(false);
    setCurrentEducation({
      degree: "",
      major: "",
      university: "",
      year: "",
      cgpa: "",
    });
  };

  const handleEdit = (index) => {
    setIsFormVisible(true);
    setIsEditMode(true);
    setEditIndex(index);
    setCurrentEducation(educations[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation({ ...currentEducation, [name]: value });
  };

  return (
    <div className="flex flex-col gap-5 m-5">
      <h1 className="text-lg font-bold text-gray-800 pl-4">Education</h1>
      {educations.map((education, index) => (
        <div
          key={index}
          className="flex flex-row justify-center self-center gap-4 w-3/4 bg-custom-gray rounded-xl p-4"
        >
          <div className="flex justify-center self-center m-4">
            <GiGraduateCap className="text-7xl text-custom-purple" />
          </div>
          <div className="w-full mt-2 mb-3 bg-custom-gray py-3 px-3 rounded-xl">
            <h1 className="text-gray-500 text-lg font-semibold tracking-wide">
              {education.university}
            </h1>
            <div className="flex flex-row gap-2 justify-start self-center">
              <h2 className="text-custom-black font-medium text-base flex flex-row gap-2 justify-start self-center">
                {education.degree}
              </h2>
              <h3 className="text-custom-black font-medium text-sm flex flex-row gap-2 justify-start self-center">
                CG: {education.cgpa}
              </h3>
            </div>
            <p className="text-gray-500 text-xs">{education.year}</p>
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
          <Input
            type="text"
            name="degree"
            value={currentEducation.degree}
            placeholder="Degree"
            className="rounded-md bg-white"
            label="Degree"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="major"
            value={currentEducation.major}
            placeholder="Major"
            className="rounded-md bg-white"
            label="Major"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="university"
            value={currentEducation.university}
            placeholder="University"
            className="rounded-md bg-white"
            label="University/College"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="year"
            value={currentEducation.year}
            placeholder="Graduation Year"
            className="rounded-md bg-white"
            label="Graduation Year"
            onChange={handleChange}
          />
          <Input
            type="number"
            name="cgpa"
            value={currentEducation.cgpa}
            placeholder="CGPA"
            className="rounded-md bg-white"
            label="CGPA (%)"
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
          + Add Another Education
        </p>
      )}
    </div>
  );
}

export default TaEducationForm;
