import React, { useEffect } from "react";
import { ExperienceCard } from "../index";
import { GET_EXPERIENCE_USER } from "../../graphql/queries/user.queries";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TaIndustryExp({ userId }) {
  const navigate = useNavigate();
  const isFaculty = useSelector((state) => state.auth.isFaculty);

  useEffect(() => {
    if (!isFaculty) {
      navigate("/");
    }
  }, [isFaculty, navigate]);

  const { loading, error, data } = useQuery(GET_EXPERIENCE_USER, {
    variables: { idNumber: userId },
  });
  console.log("Experience Data", data);
  console.log("Experience data array", data?.getExperience?.data?.experience);
  return (
    <>
      {data?.getExperience?.data?.experience.length >0 && (
        <div className="flex flex-col w-4/5 justify-center self-center gap-3 mt-5">
          <h1 className="text-white font-medium text-xl">Experience</h1>
          <div className="flex flex-col  justify-center w-full gap-1 self-center bg-white p-8 rounded-lg border-2 border-custom-gray shadow-slate-700">
            {data?.getExperience?.data?.experience?.map((exp, index) => (
              <ExperienceCard
                key={index}
                company={exp.company}
                role={exp.role}
                description={exp.description}
                startDate={exp.startDate}
                endDate={exp.endDate}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TaIndustryExp;
