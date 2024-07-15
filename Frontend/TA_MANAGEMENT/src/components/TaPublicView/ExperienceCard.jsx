import React from "react";

function ExperienceCard({
  company = "Company Name",
  role = "Position",
  description = "Description",
  startDate = "00/00/20xx",
  endDate = "00/00/20xx",
}) {
  return (
    <div className="w-full mt-2 mb-3 bg-custom-gray py-3 px-3 rounded-xl">
      <h1 className="text-gray-500 text-lg font-semibold tracking-wide">
        {company}
      </h1>
      <h2 className="text-custom-black text-base">{role}</h2>
      <h3 className="text-gray-500 text-sm">
        {startDate} - {endDate} (10 months)
      </h3>
      <p className="text-gray-500 text-xs">{description}</p>
    </div>
  );
}

export default ExperienceCard;
