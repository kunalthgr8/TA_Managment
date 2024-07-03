import React from "react";
import {
  TaAbout,
  TaEducation,
  TaIndustryExp,
  TaProfile,
  TaProjects,
  TaSkills,
} from "../index";

function TaPublicView() {
  return (
    <div className="flex flex-col w-11/12 justify-center self-center gap-1 mt-10">
      <TaProfile />
      <TaIndustryExp />
      <TaProjects />
      <TaSkills />
      <TaEducation />
      <TaAbout />
    </div>
  );
}

export default TaPublicView;
