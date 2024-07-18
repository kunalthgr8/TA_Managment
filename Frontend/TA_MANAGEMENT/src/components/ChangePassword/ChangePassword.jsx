import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../index";
import { MdModeEdit } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { CHANGE_PASSWORD_USER } from "../../graphql/mutations/user.mutations";
import { CHANGE_PASSWORD_FACULTY } from "../../graphql/mutations/faculty.mutations";

function ChangePassword() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const isFaculty = useSelector((state) => state.auth.isFaculty);

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [changePasswordMutation] = useMutation(CHANGE_PASSWORD_USER);
  const [changePasswordFacultyMutation] = useMutation(CHANGE_PASSWORD_FACULTY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { oldPassword, newPassword, confirmPassword } = data;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const variables = {
        input: {
          idNumber: userData.idNumber,
          oldPassword,
          newPassword,
        },
      };

      const mutation = isFaculty ? changePasswordFacultyMutation : changePasswordMutation;
      const { status, message } = await mutation({ variables });

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-row w-full justify-center m-10 gap-10">
      <div className="flex flex-col gap-5 w-4/5 lg:w-2/3">
        <h1 className="text-white">Change Password</h1>
        <div className="flex flex-col w-full lg:w-4/5 justify-center bg-white rounded-lg p-8 pb-4">
          <div className="w-full flex flex-row">
            <div className="flex flex-col w-full gap-3">
              <h1 className="text-sm text-custom-purple font-semibold">Change Password</h1>
              {error && <h1 className="text-red-500">{error}</h1>}
              <div className="flex flex-col p-3 gap-2">
                <div className="flex flex-col pb-3 gap-1">
                  <p className="text-sm font-medium text-custom-black">OLD PASSWORD</p>
                  <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={data.oldPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col pb-3 gap-1">
                  <p className="text-sm font-medium text-custom-black">NEW PASSWORD</p>
                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={data.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col pb-3 gap-1">
                  <p className="text-sm font-medium text-custom-black">CONFIRM PASSWORD</p>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full text-right">
            <Button
              width="flex justify-end"
              className="bg-custom-purple flex justify-center self-center gap-1 px-4 text-center rounded-lg text-white"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
              <MdModeEdit className="flex justify-center self-center" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
