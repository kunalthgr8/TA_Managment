import React from "react";
import { ExperienceCard } from "../index";

function TaAbout() {
  return (
    <div className="flex flex-col w-4/5 justify-center self-center gap-3 mt-5 mb-5">
      <h1 className="text-white font-medium text-xl">Experience</h1>
      <div className="flex flex-col  justify-center w-full gap-1 self-center bg-white p-8 rounded-lg border-2 border-custom-gray shadow-slate-700">
        <div className="text-custom-black w-11/12 text-sm p-1 flex flex-col font-medium justify-start gap-2">
          <div className="m-1">
            🌟 Developed and launched OpenLake, a website aimed at the institute
            club Site, showcasing my proficiency in React.js, Express.js, HTML,
            CSS, and more.
          </div>
          <div className="m-1">
            🌟 Spearheaded the creation of intuitive medicine websites for
            retailers and buyers, demonstrating my expertise in web development
            and user experience design.
          </div>
          <div className="m-1">
            🌟 Actively participated in hackathons, honing my problem-solving
            skills and fostering a collaborative mindset in high-pressure
            environments.
          </div>
          <div className="m-1">
            🌟 Contributed to the development of a cutting-edge TA Management
            System at IIT Bhilai, leveraging Java, MongoDB, Node.js, and other
            technologies to streamline administrative processes.
          </div>
          <div className="m-1">
            🌟 Achieved top rankings on platforms like LeetCode and Geeks for
            Geeks, showcasing my dedication to continuous learning and
            improvement in the field of computer science.
          </div>
          <div className="m-1">
            🌟 Embraced opportunities for interdisciplinary exploration, gaining
            proficiency in Machine Learning and digital image processing
            alongside my primary focus on web development.
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaAbout;
