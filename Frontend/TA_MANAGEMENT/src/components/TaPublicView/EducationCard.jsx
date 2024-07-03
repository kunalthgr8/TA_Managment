import React from "react";

function EducationCard() {
  return (
    <div className="w-full mt-2 mb-3 bg-custom-gray py-3 px-3 rounded-xl">
      <h1 className="text-gray-500 text-lg font-semibold tracking-wide">
        Indian Institute Of Technology, Bhilai
      </h1>
      <div className="flex flex-row gap-2 justify-start self-center">
        <h2 className="text-custom-black font-medium text-base flex flex-row gap-2 justify-start self-center">B.Tech</h2>
        <h3 className="text-custom-black font-medium text-sm flex flex-row gap-2 justify-start self-center">CG: 7.82</h3>
      </div>
      <p className="text-gray-500 text-xs">July 2025 </p>
    </div>
  );
}

export default EducationCard;
