import React from "react";
import {
  TaAboutForm,
  TaEducationForm,
  TaExperienceForm,
  TaProjectForm,
  TaSkillsForm,
  TaSocialInfo,
} from "../index";

function TaForm() {
  return (
    <div className="w-11/12 flex flex-col justify-center self-center gap-10">
      <h1 className="text-center text-white font-bold tracking-wider text-2xl">
        Create Your Profile
      </h1>
      <div className="w-4/5 flex flex-col self-center justify-center bg-white p-4 m-5 mt-5 rounded-lg ">
        <TaEducationForm />
        <hr className="border-2 border-custom-gray" />
        <TaAboutForm />
        <TaExperienceForm />
        <TaProjectForm />
        <TaSkillsForm />
        <TaSocialInfo />
      </div>
    </div>
  );
}

export default TaForm;
