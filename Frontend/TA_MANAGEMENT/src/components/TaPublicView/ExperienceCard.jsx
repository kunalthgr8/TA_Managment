import React from "react";

function ExperienceCard({
  company = "Company Name",
  role = "Position",
  description = "Description",
  startDate = "00/00/20xx",
  endDate = "00/00/20xx",
}) {
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      endDate.getMonth() -
      startDate.getMonth();
    return months;
  };

  const duration = calculateDuration(startDate, endDate);
  return (
    <div className="w-full mt-2 mb-3 bg-custom-gray py-3 px-3 rounded-xl">
      <h1 className="text-gray-500 text-lg font-semibold tracking-wide">
        {company}
      </h1>
      <h2 className="text-custom-black text-base">{role}</h2>
      <h3 className="text-gray-500 text-sm">
        {startDate} - {endDate} ({duration} months)
      </h3>
      <p className="text-gray-500 text-xs">{description}</p>
    </div>
  );
}

export default ExperienceCard;
