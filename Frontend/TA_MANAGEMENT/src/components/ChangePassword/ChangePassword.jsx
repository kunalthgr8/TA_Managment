import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../index";
// import authService from "../../appwrite/auth.js";
import { MdModeEdit } from "react-icons/md";
import { CHANGE_PASSWORD_USER } from "../../graphql/mutations/user.mutations";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

function ChangePassword() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);

  const [data, setData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [changePasswordMutation] = useMutation(CHANGE_PASSWORD_USER);

  const handleSubmit = async () => {
    console.log("Change Password Data:", data);

    // setError("");

    if (
      data.oldPassword === "" ||
      data.newPassword === "" ||
      data.confirmPassword === ""
    ) {
      return setError("Please fill all the fields");
    }

    if (data.newPassword !== data.confirmPassword) {
      return setError("Password does not match");
    }

    try {
      setLoading(true);
      const { status, message } = await changePasswordMutation({
        variables: {
          input: {
            idNumber: userData.idNumber,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          },
        },
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-row w-full justify-center m-10 gap-10">
        <div className="flex flex-col gap-5 w-4/5 lg:w-2/3">
          <h1 className="text-white">Change Password</h1>
          <div className="flex flex-col w-full lg:w-4/5 justify-center bg-white rounded-lg p-8 pb-4">
            <div className="w-full flex flex-row">
              <div className="flex flex-col w-full gap-3">
                <h1 className="text-sm text-custom-purple font-semibold">
                  Change Password
                </h1>
                {error && <h1 className="text-red-500">{error}</h1>}
                <div className="flex flex-col p-3 gap-2">
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-sm font-medium text-custom-black">
                      OLD PASSWORD
                    </p>
                    <Input
                      type="password"
                      placeholder="Old Password"
                      value={data.oldPassword}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          oldPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-sm font-medium text-custom-black">
                      NEW PASSWORD
                    </p>
                    <Input
                      type="password"
                      placeholder="New Password"
                      value={data.newPassword}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-sm font-medium text-custom-black">
                      CONFIRM PASSWORD
                    </p>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={data.confirmPassword}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
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
    </>
  );
}

export default ChangePassword;
