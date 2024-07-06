import React, { useState } from "react";
import { Input, Button } from "../../index";
import Cat from "../../../assets/cat.jpg";
// import "./TaAboutForm.css";

function TaAboutForm() {
  const defaultAboutValues = {
    Name: "",
    Gender: "",
    Email: "",
    Phone: "",
    Bio: "",
    image: null,
  };

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [AboutValues, setAboutValues] = useState([
    {
      Name: "Kunal Singla",
      Gender: "Male",
      Bio: "I am a Full Stack Developer",
      Email: "xyz@gmail.com",
      Phone: "7973203702",
      image: null,
    },
  ]);

  const [CurrentAboutValues, setCurrentAboutValues] = useState(defaultAboutValues);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    if (editIndex !== null) {
      setAboutValues((prevAboutValues) =>
        prevAboutValues.map((experience, index) =>
          index === editIndex ? CurrentAboutValues : experience
        )
      );
    }
    resetForm();
    setIsFormVisible(false);
  };

  const handleCancel = () => {
    resetForm();
    setIsFormVisible(false);
  };

  const resetForm = () => {
    setCurrentAboutValues(defaultAboutValues);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAboutValues({ ...CurrentAboutValues, [name]: value });
  };

  const editForm = (index) => {
    setCurrentAboutValues(AboutValues[index]);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentAboutValues({ ...CurrentAboutValues, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const fields = ["Name", "Gender", "Bio", "Email", "Phone"];

  return (
    <div className="flex flex-col gap-5 m-2 lg:m-5 mt-4">
      <h1 className="text-lg font-bold text-gray-800 pl-4">About</h1>
      <div className="flex flex-col justify-center self-center gap-4 w-3/4 bg-custom-gray rounded-xl p-4">
        {!isFormVisible && (
          <>
            {AboutValues.map((experience, index) => (
              <div
                key={index}
                className="flex flex-col justify-between self-center gap-4 w-full lg:w-3/4 bg-custom-gray rounded-xl"
              >
                <div className="flex justify-center self-center">
                  <img
                    src={Cat}
                    alt="Profile Image"
                    width="150px"
                    className=" rounded-full  "
                  />
                </div>
                <div className="flex flex-col gap-2 w-3/4">
                  <h1 className="text-2xl font-bold text-custom-black">
                    {experience.Name}
                  </h1>
                  <p className="text-base font-medium text-gray-500 ">
                    {experience.Bio}
                  </p>
                  <div className="flex flex-row  gap-3 text-lg  ">
                    <p
                      className="text-sm text-gray-500 cursor-pointer"
                      title="Gender"
                    >
                      {experience.Gender}
                    </p>
                    <p
                      className="text-sm text-gray-500 cursor-pointer"
                      title="Mobile Number"
                    >
                      {experience.Phone}
                    </p>
                    <p
                      className="text-sm text-gray-500 cursor-pointer"
                      title="Email"
                    >
                      {experience.Email}
                    </p>
                  </div>
                  {experience.image && (
                    <img
                      src={experience.image}
                      alt="Profile"
                      className="mt-2 ml-5 h-20 w-20 rounded-full object-cover"
                    />
                  )}
                </div>
                <Button
                  className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
                  onClick={() => editForm(index)}
                >
                  Edit Profile
                </Button>
              </div>
            ))}
          </>
        )}
        {isFormVisible && (
          <>
            {fields.map((field) => (
              <Input
                key={field}
                type="text"
                name={field}
                value={CurrentAboutValues[field]}
                placeholder={field}
                className="rounded-md bg-white"
                label={field}
                onChange={handleChange}
              />
            ))}
            <div className="flex flex-col">
              <label className="inline-block mb-1 pl-1 font-bold text-custom-black">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="px-3 py-2 text-custom-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full rounded-lg bg-white"
              />
              {CurrentAboutValues.image && (
                <img
                  src={CurrentAboutValues.image}
                  alt="Profile"
                  className="mt-2 ml-5 h-20 w-20 rounded-full object-cover"
                />
              )}
            </div>
            <div className="flex gap-5 m-5 w-1/2 self-center">
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
          </>
        )}
      </div>
    </div>
  );
}

export default TaAboutForm;
