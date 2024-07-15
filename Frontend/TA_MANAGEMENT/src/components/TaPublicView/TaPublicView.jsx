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

  return (
    <div className="flex flex-col w-11/12 justify-center self-center gap-1 mt-10">
      <TaProfile userId={taId} />
      <TaIndustryExp userId={taId} />
      <TaProjects userId={taId} />
      <TaSkills userId={taId} />
      <TaEducation userId={taId} />
      {/* <TaAbout /> */}
    </div>
  );
}

export default TaPublicView;
