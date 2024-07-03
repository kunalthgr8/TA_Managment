import React from "react";
import Cat from "../../assets/cat.jpg";
import { FaLinkedinIn } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import { SiKaggle } from "react-icons/si";
import { Link } from "react-router-dom";

function TaProfile() {
  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-center gap-5 self-center bg-white p-8 rounded-lg border-2 border-custom-gray shadow-slate-700">
      <div>
        <img src={Cat} alt="TA Profile Picture" className="rounded-xl" />
      </div>
      <div className="w-3/4 flex flex-col m-5">
        <h1 className="text-2xl font-bold text-custom-black">Kunal Singla (He/Him)</h1>
        <h2 className="text-base font-medium text-gray-500 mt-3">
          {" "}
          IIT Bhilai, 4th Year, Web Developer, Machine Learning, Digital Image
          Processing, Tech enthusiast, CS
        </h2>
        <div>
          <div className="flex flex-row justify-start self-center gap-3 text-lg mt-2 ">
            <Link
              to="https://www.linkedin.com/feed/"
              className="text-2xl flex justify-center self-center cursor-pointer text-gray-500"
              title="LinkedIn"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              to="https://www.linkedin.com/feed/"
              className="text-2xl flex justify-center self-center cursor-pointer text-gray-500"
              title="Github"
            >
              <VscGithub />
            </Link>
            <Link
              to="https://www.linkedin.com/feed/"
              className="text-2xl flex justify-center self-center cursor-pointer text-gray-500"
              title="Kaggle"
            >
              <SiKaggle />
            </Link>
            <Link
              to="https://www.linkedin.com/feed/"
              className="text-base flex justify-center self-center cursor-pointer text-gray-500"
              title="Portfolio"
            >
              portfolio.com
            </Link>
          </div>
          <div className="flex flex-row justify-start self-center gap-3 text-lg mt-2 ">
            <p className="text-sm text-gray-500 cursor-pointer" title="Email Id">xyz@gmail.com</p>
            <p className="text-sm text-gray-500 cursor-pointer" title="Mobile Number" >xxxxx-xxxxx</p>
            <p className="text-sm text-gray-500 cursor-pointer" title="Department">CSE </p>
            <p className="text-sm text-gray-500 cursor-pointer" title="Resume">Resume</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaProfile;
