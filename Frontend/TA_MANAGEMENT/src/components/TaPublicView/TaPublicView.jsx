import React from "react";
import {
  TaAbout,
  TaEducation,
  TaIndustryExp,
  TaProfile,
  TaProjects,
  TaSkills,
} from "../index";
import { useParams } from "react-router-dom";

function TaPublicView() {
  const { taId } = useParams();
  console.log("Public View ID", taId);
  return (
    <div className="flex flex-col w-11/12 justify-center self-center gap-1 mt-10">
      <TaProfile userId={taId}/>
      <TaIndustryExp />
      <TaProjects />
      <TaSkills />
      <TaEducation />
      <TaAbout />
    </div>
  );
}

export default TaPublicView;
