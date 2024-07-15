import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_SKILLS } from "../../graphql/queries/taSkill.query";
import { useQuery } from "@apollo/client";

function TaSkills({ userId }) {
  const navigate = useNavigate();
  const isFaculty = useSelector((state) => state.auth.isFaculty);

  useEffect(() => {
    if (!isFaculty) {
      navigate("/");
    }
  }, [isFaculty, navigate]);

  const { loading, error, data } = useQuery(GET_SKILLS, {
    variables: { idNumber: userId },
  });

  const skills = useMemo(() => {
    if (!data?.getSkills) return [];
    return [
      ...data.getSkills.areaOfSpecialization,
      ...data.getSkills.hardwareTools,
      ...data.getSkills.primarySkills,
      ...data.getSkills.secondarySkills,
      ...data.getSkills.primaryProgSkills,
      ...data.getSkills.secondaryProgSkills,
      ...data.getSkills.softwareTools,
    ];
  }, [data]);

  return (
    <>
      {data?.getSkills && (
        <div className="flex flex-col w-4/5 justify-center self-center gap-3 mt-5">
          <h1 className="text-white font-medium text-xl">Skills</h1>
          <div className="flex flex-col justify-center w-full gap-2 self-center bg-white p-8 rounded-lg border-2 border-custom-gray shadow-slate-700">
            {skills.length > 0 && (
              <div className="flex flex-wrap mt-2 bg-custom-gray py-3 px-3 rounded-xl">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex gap-1 bg-custom-purple text-white text-sm px-3 py-1 m-1 rounded-xl"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TaSkills;
