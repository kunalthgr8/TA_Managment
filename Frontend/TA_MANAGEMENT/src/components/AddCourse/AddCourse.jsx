import React, { useState } from "react";

import { Input, Button } from "../index";
import { MdAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import  {useMutation} from "@apollo/client";
import { CREATE_COURSE } from "../../graphql/mutations/course.mutations";
import { GET_ALL_COURSES } from "../../graphql/queries/course.query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [data, setData] = useState({
    semester: "",
    courseCode: "",
    courseName: "",
    requiredSkills: "",
  });
  const [skills, setSkills] = useState([]);
  const userData = useSelector((state) => state.auth.user);
  const [createCourse, { data: courseData, loading }] = useMutation(CREATE_COURSE,
    {refetchQueries: [
    { query: GET_ALL_COURSES, variables: { idNumber: userData.idNumber } },
  ]},);
  
  const handleAddSkill = () => {
    if (data.requiredSkills.trim() === "") {
      setError("Skill cannot be empty.");
      return;
    }
    setSkills([...skills, data.requiredSkills.trim()]);
    setData({ ...data, requiredSkills: "" });
    setError("");
  };

  const cancelSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      handleAddSkill();
    }
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    if (
      !data.semester ||
      !data.courseCode ||
      !data.courseName ||
      skills.length === 0
    ) {
      setError("All fields are required and you must add at least one skill.");
      return;
    }
    setError("");
    // Proceed with form submission (e.g., API call)
    const response = await createCourse({
      variables: {
        input: {
          idNumber: userData.idNumber,
          courses: {
            courseName: data.courseName,
            courseCode: data.courseCode,
            semester: data.semester,
            skills: skills,
            status: "COURSE_REGISTERED",
          },
        },
      },
    });
    console.log("Response:", response);
    console.log("Form data:", { ...data, skills });
    if (response.data.addCourse.status === 201) {
      navigate("/");
      setData({
        semester: "",
        courseCode: "",
        courseName: "",
        requiredSkills: "",
      });
      setSkills([]);
      setError("Course added successfully");
    }
  };

  return (
    <>
      <div className="bg-white flex flex-col justify-center self-center w-3/4 rounded-lg p-5 mt-8">
        <div className="flex flex-col text-center justify-center self-center m-5 mt-2 p-2">
          <h1 className="text-custom-purple font-bold text-2xl tracking-wider">
            Add New Course
          </h1>
          {error && <div className="text-red-500">{error}</div>}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center self-center gap-3 w-4/5"
        >
          <Input
            type="text"
            placeholder="Semester"
            className="bg-custom-gray text-black"
            onChange={(e) => setData({ ...data, semester: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Course Code"
            className="bg-custom-gray text-black"
            onChange={(e) => setData({ ...data, courseCode: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Course Name"
            className="bg-custom-gray text-black"
            onChange={(e) => setData({ ...data, courseName: e.target.value })}
            required
          />
          <div className="flex">
            <Input
              type="text"
              placeholder="Required Skills"
              className="bg-custom-gray text-black flex-grow rounded-e-none"
              value={data.requiredSkills}
              onChange={(e) =>
                setData({ ...data, requiredSkills: e.target.value })
              }
              onKeyPress={handleSkillKeyPress}
            />
            <button
              type="button"
              className="bg-custom-purple text-white text-xl font-bold pl-4 pr-4 rounded-xl rounded-s-none "
              onClick={handleAddSkill}
            >
              <MdAdd />
            </button>
          </div>
          { skills.length>0 && <div className="flex flex-wrap mt-2 bg-custom-gray py-3 px-3 rounded-xl">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="flex gap-1 bg-custom-purple text-white text-sm  px-3 py-1 m-1 rounded-xl"
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
          </div>}
          <Button width="w-full" className="bg-custom-purple text-white p-2 rounded-lg w-full mt-8">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default AddCourse;
