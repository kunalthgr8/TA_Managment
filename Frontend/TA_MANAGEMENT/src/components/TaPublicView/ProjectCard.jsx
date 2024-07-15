import React from "react";

function ProjectCard({
  title,
  role,
  description,
  githubLink,
  liveLink,
  techstack,
}) {
  return (
    <div className="w-full mt-2 mb-3 bg-custom-gray p-4 rounded-xl ">
      <div className="flex flex-row justify-between">
        <h1 className="text-custom-black text-lg font-semibold tracking-wide">
          {title}
        </h1>
        <div className="flex justify-evenly self-center font-medium text-sm gap-3 text-custom-purple">
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noreferrer">
              Github
            </a>
          )}
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noreferrer">
              Live Link
            </a>
          )}
        </div>
      </div>
      <h2 className="text-gray-500 text-base font-bold">{role}</h2>
      <div className="flex flex-row gap-3">
        <p className="text-gray-500 text-xs font-bold">Tech Stack: </p>
        {techstack.map((tech, index) => (
          <p key={index} className="text-gray-500 text-xs">
            {tech}
            {index !== techstack.length - 1 ? ", " : ""}
          </p>
        ))}
      </div>
      <div className="flex flex-row gap-3">
        <p className="text-gray-500 text-xs">{description}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
