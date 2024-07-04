import React from 'react'
import { useState } from 'react'
import { Input, Button } from "../../index";

function TaSocialInfo() {
  const [socialInfo, setSocialInfo] = useState({
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialInfo((prev) => ({ ...prev, [name]: value }));
  }

  const handleSave = () => {
    console.log(socialInfo);
  }

  const handleCancel = () => {
    setIsFormVisible(false)
    setSocialInfo({
      website: "",
      linkedin: "",
      github: "",
      twitter: "",
    });
  }

  return (
    <div className="flex flex-col gap-5 m-2 lg:m-5">
      <h1 className="text-lg font-bold text-gray-800 pl-4">Social Profiles </h1>
      {isFormVisible && (
        <div className="flex flex-col justify-center self-center gap-4 w-3/4 bg-custom-gray rounded-xl p-4">
          <Input
            type="text"
            name="website"
            value={socialInfo.website}
            placeholder="https://www.yourwebsite.com"
            className="rounded-md bg-white"
            label="Website"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="linkdin"
            value={socialInfo.linkedin}
            placeholder="https://www.linkedin.com/in/yourprofile"
            className="rounded-md bg-white"
            label="Linkdin"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="github"
            value={socialInfo.github}
            placeholder="https://www.github.com/yourprofile"
            className="rounded-md bg-white"
            label="Github"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="twitter"
            value={socialInfo.twitter}
            placeholder="https://www.twitter.com/yourprofile"
            className="rounded-md bg-white"
            label="Twitter"
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
          onClick={()=>setIsFormVisible(true)}
        >
          + Add Social Media Links
        </p>
      )}
    </div>
  );
}

export default TaSocialInfo;