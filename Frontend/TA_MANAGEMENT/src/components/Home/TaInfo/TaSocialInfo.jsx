import React, { useEffect, useState } from "react";
import { Input, Button } from "../../index";
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_SOCIAL_PROFILE } from "../../../graphql/queries/taSocialInfo.query";
import { SiKaggle } from "react-icons/si";
import {
  CREATE_SOCIAL_PROFILE,
  UPDATE_SOCIAL_PROFILE,
  DELETE_SOCIAL_PROFILE,
} from "../../../graphql/mutations/taSocialInfo.mutations";
import { useMutation } from "@apollo/client";

function TaSocialInfo() {
  const userData = useSelector((state) => state.auth.user);
  const [socialLinks, setSocialLinks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSocialLink, setCurrentSocialLink] = useState({
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
    kaggle: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const { data } = useQuery(GET_SOCIAL_PROFILE, {
    variables: { idNumber: userData.idNumber },
  });
  console.log("DATA" ,data);
  const [createSocialProfile] = useMutation(CREATE_SOCIAL_PROFILE);
  const [updateSocialProfile] = useMutation(UPDATE_SOCIAL_PROFILE);
  const [deleteSocialProfile] = useMutation(DELETE_SOCIAL_PROFILE);

  useEffect(() => {
    if (data) {
      setSocialLinks([data.getSocialProfile]);
    }
  }, [data]);

  const handleSave = async() => {
    const updatedSocialLinks = [...socialLinks];
    if (isEditMode && editIndex !== null) {
      updatedSocialLinks[editIndex] = currentSocialLink;
      await updateSocialProfile({
        variables: {
          idNumber: userData.idNumber,
          github: currentSocialLink.github,
          twitter: currentSocialLink.twitter,
          linkedin: currentSocialLink.linkedin,
          portfolio: currentSocialLink.website,
          kaggle: currentSocialLink.kaggle,
        }
      })
    } else {
      updatedSocialLinks.push(currentSocialLink);
      await createSocialProfile({
        variables: {
          idNumber: userData.idNumber,
          github: currentSocialLink.github,
          twitter: currentSocialLink.twitter,
          linkedin: currentSocialLink.linkedin,
          portfolio: currentSocialLink.website,
          kaggle: currentSocialLink.kaggle,
        }
      })
    }
    setSocialLinks(updatedSocialLinks);
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
      kaggle: "",
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
      kaggle: "",
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
              {socialLink.website && (
                <a
                  href={socialLink.website}
                  className="flex items-center text-sm gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGlobe className="text-2xl flex justify-center self-center cursor-pointer text-gray-500" />
                  {socialLink.website}
                </a>
              )}
              {socialLink.linkedin && (
                <a
                  href={socialLink.linkedin}
                  className="flex items-center text-sm gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-2xl flex justify-center self-center cursor-pointer text-gray-500" />
                  {socialLink.linkedin}
                </a>
              )}
              {socialLink.github && (
                <a
                  href={socialLink.github}
                  className="flex items-center text-sm gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-2xl flex justify-center self-center cursor-pointer text-gray-500" />
                  {socialLink.github}
                </a>
              )}
              {socialLink.twitter && (
                <a
                  href={socialLink.twitter}
                  className="flex items-center text-sm gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-2xl flex justify-center self-center cursor-pointer text-gray-500" />
                  {socialLink.twitter}
                </a>
              )}
              {socialLink.kaggle && (
                <a
                  href={socialLink.kaggle}
                  className="flex items-center text-sm gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiKaggle className="text-2xl flex justify-center self-center cursor-pointer text-gray-500" />
                  {socialLink.kaggle}
                </a>
              )}
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
          <Input
            type="text"
            name="kaggle"
            value={currentSocialLink.kaggle}
            placeholder="https://www.kaggle.com/yourprofile"
            className="rounded-md bg-white"
            label="Kaggle"
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

      { !data && <Button
        className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
        width="w-1/4"
        onClick={handleAddAnother}
      >
        Add Another
      </Button>}
    </div>
  );
}

export default TaSocialInfo;
