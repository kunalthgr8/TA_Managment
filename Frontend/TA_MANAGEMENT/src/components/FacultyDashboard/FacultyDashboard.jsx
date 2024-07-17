import React, { useState } from "react";
import { Input, Button } from "../index";
import { MdModeEdit } from "react-icons/md";
import Cat from "../../assets/cat.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER } from "../../graphql/mutations/user.mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/user.queries";
import { login } from "../../store/authSlice";
import { GET_ALL_COURSES } from "../../graphql/queries/course.query";

function FacultyDashboard() {
  const userinfo = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isFaculty = useSelector((state) => state.auth.isFaculty);
  const navigate = useNavigate();
  const [updateUserMutation] = useMutation(UPDATE_USER);

  const { data, loading, error } = useQuery(GET_ALL_COURSES, {
    variables: { idNumber: userinfo?.idNumber },
  });
  const courses = data?.getCourses?.data?.courses;

  const [editAbleUser, setEditAbleUser] = useState(false);
  const [info, setinfo] = useState({
    email: userinfo?.email || "No Email Found",
    phoneNumber: userinfo?.phoneNumber || "No Number Found",
    fullname: userinfo?.name || "User Name Not Found",
    idNumber: userinfo?.idNumber || "xxxxxxxxxx",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const saveButtonHandler = async () => {
    // Implement save functionality here
    if (
      info.email === "" ||
      info.phoneNumber === "" ||
      info.fullname === "" ||
      info.idNumber === ""
    ) {
      console.log("Please fill all the fields");
      return;
    }
    if (!isFaculty) {
      const { data } = await updateUserMutation({
        variables: {
          input: {
            idNumber: userinfo.idNumber,
            name: info.fullname,
            email: info.email,
            phoneNumber: info.phoneNumber,
          },
        },
      });
      if (data.updateUser.status === 201) {
        dispatch(login(data.updateUser.data));
      }
      setEditAbleUser(false);
    }
  };

  return (
    <div className="flex flex-row w-4/5 justify-center m-10 gap-10">
      <div className="flex flex-col lg:flex-row md:justify-evenly w-full gap-10">
        <div className=" w-3/5 md:w-2/5 lg:w-1/3 flex flex-row bg-white h-[120px] rounded-lg p-4 gap-2">
          <div className="flex justify-center self-center w-1/3 ">
            <img width="80" height="80" src={Cat} alt="user" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-nav-color text-base sm:text-xl">
              {capitalizeName(info.fullname)}
            </h1>
            <p className="text-black-heading text-xs sm:text-sm italic">
              {info.email}
            </p>
            <p
              className="text-nav-color font-semibold cursor-pointer text-xs sm:text-sm italic"
              onClick={() => navigate("/changePassword")}
            >
              Change Password
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full xl:w-2/3">
          <div className="flex flex-col w-2/3 justify-center self-center bg-white rounded-lg p-8 pb-4 ">
            <div className="w-full flex flex-row">
              <div className="flex flex-col w-1/2 gap-3">
                <h1 className="text-xs sm:text-sm text-custom-purple font-semibold">
                  LOGIN INFORMATION
                </h1>
                <div className="flex flex-col p-3 gap-2">
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-xs sm:text-sm font-medium text-red-500">
                      EMAIL
                    </p>
                    {editAbleUser ? (
                      <Input
                        type="email"
                        name="email"
                        value={info.email}
                        placeholder="Email"
                        className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                        {info.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-xs sm:text-sm font-medium text-red-500">
                      MOBILE NUMBER
                    </p>
                    {editAbleUser ? (
                      <Input
                        type="text"
                        name="phoneNumber"
                        value={info.phoneNumber}
                        placeholder="Mobile Number"
                        className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                        {info.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-1/2 gap-3">
                <h1 className="text-xs sm:text-sm text-custom-purple font-semibold">
                  PERSONAL INFORMATION
                </h1>
                <div className="flex flex-col p-3 gap-2">
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-xs sm:text-sm font-medium text-red-500">
                      FULL NAME
                    </p>
                    {editAbleUser ? (
                      <Input
                        type="text"
                        name="fullname"
                        value={info.fullname}
                        placeholder="Full Name"
                        className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                        {capitalizeName(info.fullname)}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-xs sm:text-sm font-medium text-red-500">
                      ID Number
                    </p>

                    <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                      {info.idNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full text-right">
              <Button
                width="flex justify-end"
                className="bg-custom-purple text-white text-xs sm:text-sm flex justify-center self-center gap-1 px-4 text-center rounded-lg text-nav-white"
                onClick={
                  editAbleUser ? saveButtonHandler : () => setEditAbleUser(true)
                }
              >
                <MdModeEdit className="flex justify-center self-center" />
                {editAbleUser ? "Save Details" : "Edit Info"}
              </Button>
            </div>
          </div>
          {isFaculty && (
            <div className="flex flex-col w-2/3 justify-center self-center bg-white rounded-lg p-8 pb-4 mt-8">
              <div className="w-full flex flex-row">
                <div className="flex flex-col w-full gap-3">
                  <h1 className="text-xs sm:text-sm text-custom-purple font-semibold">
                    COURSES INFORMATION
                  </h1>
                  <div className="flex flex-col p-3 gap-2">
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-xs sm:text-sm font-medium text-red-500">
                        Courses
                      </p>
                      {courses?.map((course, index) => (
                        <p
                          key={index}
                          className="text-sm font-medium text-heading-color mt-2 border-b border-text-heading flex justify-between pl-2 pr-2"
                        >
                          <p>{course.courseName}</p>

                          {course.courseCode}
                        </p>
                      ))}
                      {/* <p className="text-sm font-medium text-heading-color mt-2 border-b border-text-heading">
                        CS500
                      </p>
                      <p className="text-sm font-medium text-heading-color mt-2 border-b border-text-heading">
                        CS200
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
