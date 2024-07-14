import React, { useState, useEffect } from "react";
import { Input, Button } from "../../index";
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { EDUCATION_USER } from "../../../graphql/mutations/user.mutations";
import { GET_EDUCATION_USER } from "../../../graphql/queries/user.queries";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TaEducationForm() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const [error, setError] = useState("");
  const [educations, setEducations] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const initialEducationState = {
    degree: "",
    major: "",
    university: "",
    year: "",
    cgpa: "",
  };
  const [currentEducation, setCurrentEducation] = useState(
    initialEducationState
  );
  const [editIndex, setEditIndex] = useState(null);
  const { data: educationData } = useQuery(GET_EDUCATION_USER, {
    variables: { idNumber: userData.idNumber },
    skip: !userData.idNumber,
  });
  
  const [createEducation, { loading }] = useMutation(EDUCATION_USER);

  useEffect(() => {
    if (
      educationData &&
      educationData.getEducation &&
      educationData.getEducation.data &&
      educationData.getEducation.data.education
    ) {
      const mappedEducations = educationData.getEducation.data.education.map(
        (education) => ({
          degree: education.degree,
          major: education.major,
          university: education.college,
          year: education.year,
          cgpa: education.CGPA,
        })
      );
      setEducations(mappedEducations);
    }
  }, [educationData]);

  const handleSave = async () => {
    if (isEditMode) {
      const updatedEducations = [...educations];
      updatedEducations[editIndex] = currentEducation;
      setEducations(updatedEducations);
    } else {
      setEducations([...educations, currentEducation]);
    }
  };
  useEffect(() => {
    if (educations.length > 0) {
      // Make sure the state is updated before calling the backend
      const updateEducationInBackend = async () => {
        try {
          const response = await createEducation({
            variables: {
              input: {
                idNumber: userData.idNumber,
                education: educations.map((education) => ({
                  degree: education.degree,
                  major: education.major,
                  college: education.university,
                  year: education.year,
                  CGPA: education.cgpa,
                })),
              },
            },
          });
          if (response.data.createEducation.status === 201) {
            setError("Education added successfully");
            resetForm();
          }
        } catch (error) {
          setError(error.message);
        }
      };
      updateEducationInBackend();
    }
  }, [educations, userData.idNumber, createEducation]);

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setIsEditMode(false);
    setCurrentEducation(initialEducationState);
    setEditIndex(null);
  };

  const handleAddAnother = () => {
    setIsFormVisible(true);
    setIsEditMode(false);
    setCurrentEducation(initialEducationState);
  };

  const deleteEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
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
    <div className="flex flex-col gap-5 m-2 lg:m-5">
      <h1 className="text-lg font-bold text-gray-800 pl-4">Education</h1>
      {educations.map((education, index) => (
        <div
          key={index}
          className="flex flex-row justify-center self-center gap-4 w-4/5 lg:w-3/4 bg-custom-gray rounded-xl p-4"
        >
          <div className="flex justify-center self-center m-4">
            <GiGraduateCap className="text-7xl text-custom-purple" />
          </div>
          <div className="w-full mt-2 mb-3 bg-custom-gray py-3 px-3 rounded-xl">
            <div className="flex justify-between self-center">
              <h1 className="text-gray-500 text-lg font-semibold tracking-wide">
                {education.university}
              </h1>
              <div className="flex justify-center self-center">
                <MdDelete
                  className="text-gray-500 text-lg font-semibold cursor-pointer tracking-wide"
                  onClick={() => deleteEducation(index)}
                />
              </div>
            </div>
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
