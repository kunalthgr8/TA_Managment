import React, { useState, useEffect } from "react";
import Cat from "../../assets/cat.jpg";
import { FaLinkedinIn } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import { SiKaggle } from "react-icons/si";
import { Link } from "react-router-dom";
import { GET_USER } from "../../graphql/queries/faculty.query";
import { GET_SOCIAL_PROFILE } from "../../graphql/queries/taSocialInfo.query";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../index.js";

function TaProfile({ userId }) {
  const navigate = useNavigate();
  const isFaculty = useSelector((state) => state.auth.isFaculty);
  
  const [profilePicture, setProfilePicture] = useState(Cat);

  useEffect(() => {
    if (!isFaculty) {
      navigate("/");
    }
  }, [isFaculty, navigate]);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { idNumber: userId },
  });

  const {
    loading: socialLoading,
    error: socialError,
    data: socialData,
  } = useQuery(GET_SOCIAL_PROFILE, {
    variables: { idNumber: userId },
  });

  const [genderPronoun, setGenderPronoun] = useState(null);

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    if (userData?.getUser?.gender) {
      if (userData.getUser.gender === "male") {
        setGenderPronoun("(He/Him)");
      } else if (userData.getUser.gender === "female") {
        setGenderPronoun("(She/Her)");
      }
    }
    if(userData?.getUser?.profilePicture?.picture) {
      setProfilePicture(userData.getUser.profilePicture.picture);
    }
    console.log(userData);
  }, [userData]);

  if (userLoading || socialLoading)
    return (
      <div className="flex justify-center self-center gap-10 w-full mt-10">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-center gap-5 self-center bg-white p-8 rounded-lg border-2 border-custom-gray shadow-slate-700">
      <div className="flex justify-center self-center">
        <img src={profilePicture} alt="TA Profile Picture" className="rounded-xl" width="150px" />
      </div>
      <div className="w-3/4 flex flex-col m-5 bg-custom-gray p-4 rounded-xl">
        <h1 className="text-2xl font-bold text-custom-black">
          {capitalizeName(userData?.getUser?.name)} {genderPronoun}
        </h1>
        <h2 className="text-base font-medium text-gray-500 mt-3">
          {userData?.getUser?.bio}
        </h2>
        <div>
          {socialData?.getSocialProfile && (
            <div className="flex flex-row justify-start self-center gap-3 text-lg mt-2 ">
              {socialData?.getSocialProfile?.linkedin && (
                <Link
                  to={socialData.getSocialProfile.linkedin}
                  className="text-2xl flex justify-center self-center cursor-pointer text-gray-500"
                  title="LinkedIn"
                >
                  <FaLinkedinIn />
                </Link>
              )}
              {socialData?.getSocialProfile?.github && (
                <Link
                  to={socialData.getSocialProfile.github}
                  className="text-2xl flex justify-center self-center cursor-pointer text-gray-500"
                  title="Github"
                >
                  <VscGithub />
                </Link>
              )}
              {socialData?.getSocialProfile?.kaggle && (
                <Link
                  to={socialData.getSocialProfile.kaggle}
                  className="text-2xl flex justify-center self-center cursor-pointer text-gray-500"
                  title="Kaggle"
                >
                  <SiKaggle />
                </Link>
              )}
              {socialData?.getSocialProfile?.portfolio && (
                <Link
                  to={socialData.getSocialProfile.portfolio}
                  className="text-base flex justify-center self-center cursor-pointer text-gray-500"
                  title="Portfolio"
                >
                  Website
                </Link>
              )}
            </div>
          )}
          <div className="flex flex-row justify-start self-center gap-3 text-lg mt-2 ">
            <p
              className="text-sm text-gray-500 cursor-pointer"
              title="Email Id"
            >
              {userData?.getUser?.email}
            </p>
            <p
              className="text-sm text-gray-500 cursor-pointer"
              title="Mobile Number"
            >
              {userData?.getUser?.phoneNumber}
            </p>
            <p
              className="text-sm text-gray-500 cursor-pointer"
              title="Department"
            >
              CSE
            </p>
            <p className="text-sm text-gray-500 cursor-pointer" title="Resume">
              Resume
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaProfile;
