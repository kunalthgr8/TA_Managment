import React, { useState } from "react";
import { Input, Button } from "../../index";
import { FaLightbulb } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { VscGithub } from "react-icons/vsc";
import { Link } from "react-router-dom";

function TaAboutForm() {
  const [experiences, setexperiences] = useState([
    {
      Name: "Kunal Singla",
      Gender: "Male",
      Email: "xyz@gmail.com",
      Phone: "7973203702",
      Bio: "I am a Full Stack Developer",
    },
  ]);
  const [currentProject, setCurrentProject] = useState({
    Name: "",
    Gender: "",
    Email: "",
    Phone: "",
    Bio: "",
  });

  const handleSave = () => {};

  const handleCancel = () => {};

  const resetForm = () => {};

  const handleChange = (e) => {};

  return (
    <div className="flex flex-col gap-5 m-2 lg:m-5 mt-4">
      <h1 className="text-lg font-bold text-gray-800 pl-4">About</h1>
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
    </div>
  );
}
export default TaAboutForm;
