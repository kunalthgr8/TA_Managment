import React, { useState } from "react";
import { Input, Button } from "../../index";
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function TaSocialInfo() {
  const [socialLinks, setSocialLinks] = useState([
    {
      website: "https://www.yourwebsite.com",
      linkedin: "https://www.linkedin.com/",
      github: "https://www.github.com/",
      twitter: "https://www.twitter.com/",
    },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSocialLink, setCurrentSocialLink] = useState({
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    if (isEditMode) {
      const updatedSocialLinks = [...socialLinks];
      updatedSocialLinks[editIndex] = currentSocialLink;
      setSocialLinks(updatedSocialLinks);
    } else {
      setSocialLinks([...socialLinks, currentSocialLink]);
    }
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setIsEditMode(false);
    setCurrentSocialLink({
      website: "",
      linkedin: "",
      github: "",
      twitter: "",
    });
    setEditIndex(null);
  };

  const handleAddAnother = () => {
    setIsFormVisible(true);
    setIsEditMode(false);
    setCurrentSocialLink({
      website: "",
      linkedin: "",
      github: "",
      twitter: "",
    });
  };

  const handleEdit = (index) => {
    setIsFormVisible(true);
    setIsEditMode(true);
    setEditIndex(index);
    setCurrentSocialLink(socialLinks[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSocialLink({ ...currentSocialLink, [name]: value });
  };

  return (
    <div className="flex flex-col gap-5 m-2 lg:m-5">
      <h1 className="text-lg font-bold text-gray-800 pl-4">Social Profiles</h1>
      {socialLinks.map((socialLink, index) => (
        <div
          key={index}
          className="flex flex-row justify-center self-center gap-4 w-4/5 lg:w-3/4 bg-custom-gray rounded-xl p-4"
        >
          <div className="w-full mt-2 mb-3 bg-custom-gray py-3 px-3 rounded-xl">
            <h2 className="text-gray-500 text-lg font-semibold tracking-wide">
              Social Links
            </h2>
            <div className="flex flex-col gap-2 ml-3 text-custom-black mt-4">
              <Link
                to={socialLink.website}
                className="flex items-center text-sm gap-3"
              >
                <FaGlobe className="text-2xl flex justify-center self-center cursor-pointer text-gray-500" />{" "}
                {socialLink.website}
              </Link>
              <Link
                to={socialLink.linkedin}
                className="flex items-center text-sm gap-3"
              >
                <FaLinkedin className="text-2xl flex justify-center self-center cursor-pointer text-gray-500" />{" "}
                {socialLink.linkedin}
              </Link>
              <Link
                to={socialLink.github}
                className="flex items-center text-sm gap-3"
              >
                <FaGithub className="text-2xl flex justify-center self-center cursor-pointer text-gray-500" />{" "}
                {socialLink.github}
              </Link>
              <Link
                to={socialLink.twitter}
                className="flex items-center text-sm gap-3"
              >
                <FaTwitter className="text-2xl flex justify-center self-center cursor-pointer text-gray-500" />{" "}
                {socialLink.twitter}
              </Link>
            </div>
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
            name="website"
            value={currentSocialLink.website}
            placeholder="https://www.yourwebsite.com"
            className="rounded-md bg-white"
            label="Website"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="linkedin"
            value={currentSocialLink.linkedin}
            placeholder="https://www.linkedin.com/in/yourprofile"
            className="rounded-md bg-white"
            label="LinkedIn"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="github"
            value={currentSocialLink.github}
            placeholder="https://www.github.com/yourprofile"
            className="rounded-md bg-white"
            label="Github"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="twitter"
            value={currentSocialLink.twitter}
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
              width="w-1/4"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default TaSocialInfo;
