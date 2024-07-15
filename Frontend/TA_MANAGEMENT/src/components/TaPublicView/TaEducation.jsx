import React from "react";
import { EducationCard } from "../index";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_EDUCATION_USER } from "../../graphql/queries/user.queries";

function TaEducation({ userId }) {
  const navigate = useNavigate();
  const isFaculty = useSelector((state) => state.auth.isFaculty);
  const { loading, error, data } = useQuery(GET_EDUCATION_USER, {
    variables: { idNumber: userId },
  });

  return (
    <>
      {data?.getEducation?.data?.education.length > 0 && isFaculty && (
        <div className="flex flex-col w-4/5 justify-center self-center gap-3 mt-5">
          <h1 className="text-white font-medium text-xl">Education</h1>
          <div className="flex flex-col  justify-center w-full gap-1 self-center bg-white p-8 rounded-lg border-2 border-custom-gray shadow-slate-700">
            {data?.getEducation?.data?.education?.map((education, index) => (
              <EducationCard
                key={index}
                degree={education.degree}
                institute={education.college}
                endDate={education.year}
                grade={education["CGPA"]}
                major={education.major}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TaEducation;
