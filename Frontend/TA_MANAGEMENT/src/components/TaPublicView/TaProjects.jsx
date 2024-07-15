import React, { useEffect } from "react";
import { ProjectCard } from "../index";
import { GET_PROJECT } from "../../graphql/queries/project.query";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TaProjects({ userId }) {
  const navigate = useNavigate();
  const isFaculty = useSelector((state) => state.auth.isFaculty);
  if (!isFaculty) {
    navigate("/");
  }
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { idNumber: userId },
  });
  console.log("Project Data", data);
  console.log("Project data array", data?.getProjects?.data?.projects);
  return (
    <>
      {data?.getProjects?.data?.projects && (
        <div className="flex flex-col w-4/5 justify-center self-center gap-3 mt-5">
          <h1 className="text-white font-medium text-xl ">Projects</h1>
          <div className="flex flex-col  justify-center w-full gap-1 self-center bg-white p-8 rounded-lg border-2 border-custom-gray shadow-slate-700">
            {data?.getProjects?.data?.projects?.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                role={project.role}
                description={project.description}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
                techstack={project.techstack}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TaProjects;
