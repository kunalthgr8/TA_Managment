import React from "react";

function EducationCard({
  degree = "B.Tech",
  institute = "Indian Institute Of Technology, Bhilai",
  endDate = "July 2025",
  grade = "7.82",
  major = "Computer Science",
}) {
  return (
    <div className="w-full mt-2 mb-3 bg-custom-gray py-3 px-3 rounded-xl">
      <h1 className="text-gray-500 text-lg font-semibold tracking-wide">
        {institute}
      </h1>
      <div className="flex flex-row gap-2 justify-start self-center">
        <h2 className="text-custom-black font-medium text-base flex flex-row gap-2 justify-start self-center">
          {degree}
        </h2>
        <h3 className="text-custom-black font-medium text-sm flex flex-row gap-2 justify-start self-center">
          CG: {grade}
        </h3>
        <p className="text-gray-500 text-xs flex justify-center self-center  ">{major}</p>
      </div>

      <p className="text-gray-500 text-xs">{endDate}</p>
    </div>
  );
}

export default EducationCard;
