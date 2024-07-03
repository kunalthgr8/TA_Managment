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
    <div className="flex flex-col w-11/12 justify-center self-center gap-3 mt-10">
      <TaProfile />
      <TaIndustryExp />
      <TaProjects />
      <TaSkills />
      <TaAbout />
      <TaEducation />
    </div>
  );
}

export default TaPublicView;
