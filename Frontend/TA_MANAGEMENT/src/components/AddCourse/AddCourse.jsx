import React, { useState, useCallback } from "react";
import { Input, Button } from "../index";
import { MdAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useMutation } from "@apollo/client";
import { CREATE_COURSE } from "../../graphql/mutations/course.mutations";
import { GET_ALL_COURSES } from "../../graphql/queries/course.query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [formState, setFormState] = useState({
    semester: "",
    courseCode: "",
    courseName: "",
    requiredSkills: "",
    skills: [],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);

  const [createCourse, { loading, error: mutationError }] = useMutation(CREATE_COURSE, {
    refetchQueries: [
      { query: GET_ALL_COURSES, variables: { idNumber: userData.idNumber } },
    ],
  });

  const handleAddSkill = useCallback(() => {
    if (formState.requiredSkills.trim() === "") {
      setError("Skill cannot be empty.");
      return;
    }
    setFormState((prevState) => ({
      ...prevState,
      skills: [...prevState.skills, prevState.requiredSkills.trim()],
      requiredSkills: "",
    }));
    setError("");
  }, [formState.requiredSkills]);

  const cancelSkill = useCallback((index) => {
    setFormState((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSkillKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  }, [handleAddSkill]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { semester, courseCode, courseName, skills } = formState;
    if (!semester || !courseCode || !courseName || skills.length === 0) {
      setError("All fields are required and you must add at least one skill.");
      return;
    }
    setError("");
    try {
      const response = await createCourse({
        variables: {
          input: {
            idNumber: userData.idNumber,
            courses: {
              courseName,
              courseCode,
              semester,
              skills,
              status: "COURSE_REGISTERED",
            },
          },
        },
      });
      if (response.data.addCourse.status === 201) {
        navigate("/");
        setFormState({
          semester: "",
          courseCode: "",
          courseName: "",
          requiredSkills: "",
          skills: [],
        });
        setError("Course added successfully");
      }
    } catch (err) {
      setError("An error occurred while adding the course.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <div className="bg-white flex flex-col justify-center self-center w-3/4 rounded-lg p-5 mt-8">
        <div className="flex flex-col text-center justify-center self-center m-5 mt-2 p-2">
          <h1 className="text-custom-purple font-bold text-2xl tracking-wider">
            Add New Course
          </h1>
          {error && <div className="text-red-500">{error}</div>}
          {mutationError && <div className="text-red-500">{mutationError.message}</div>}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center self-center gap-3 w-4/5">
          <Input
            type="text"
            name="semester"
            placeholder="Semester"
            className="bg-custom-gray text-black"
            onChange={handleChange}
            value={formState.semester}
            required
          />
          <Input
            type="text"
            name="courseCode"
            placeholder="Course Code"
            className="bg-custom-gray text-black"
            onChange={handleChange}
            value={formState.courseCode}
            required
          />
          <Input
            type="text"
            name="courseName"
            placeholder="Course Name"
            className="bg-custom-gray text-black"
            onChange={handleChange}
            value={formState.courseName}
            required
          />
          <div className="flex">
            <Input
              type="text"
              name="requiredSkills"
              placeholder="Required Skills"
              className="bg-custom-gray text-black flex-grow rounded-e-none"
              onChange={handleChange}
              onKeyPress={handleSkillKeyPress}
              value={formState.requiredSkills}
            />
            <button
              type="button"
              className="bg-custom-purple text-white text-xl font-bold pl-4 pr-4 rounded-xl rounded-s-none"
              onClick={handleAddSkill}
            >
              <MdAdd />
            </button>
          </div>
          {formState.skills.length > 0 && (
            <div className="flex flex-wrap mt-2 bg-custom-gray py-3 px-3 rounded-xl">
              {formState.skills.map((skill, index) => (
                <span
                  key={index}
                  className="flex gap-1 bg-custom-purple text-white text-sm px-3 py-1 m-1 rounded-xl"
                >
                  {skill}
                  <p
                    className="flex justify-center self-center cursor-pointer"
                    onClick={() => cancelSkill(index)}
                  >
                    <RxCross2 />
                  </p>
                </span>
              ))}
            </div>
          )}
          <Button width="w-full" className="bg-custom-purple text-white p-2 rounded-lg w-full mt-8">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
}

export default AddCourse;
