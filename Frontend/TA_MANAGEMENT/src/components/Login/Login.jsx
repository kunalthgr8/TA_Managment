import React, { useState } from "react";
import { Logo, Button, Input ,RadioButton} from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations/user.mutations";
import { LOGIN_FACULTY } from "../../graphql/mutations/faculty.mutations";
import { useDispatch } from "react-redux";
import { faculty, login } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ idNumber: "", password: "" ,role:"" });
  const [error, setError] = useState("");
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [loginFaculty, { loading:loadingFaculty }] = useMutation(LOGIN_FACULTY);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.role === "student"){
      try {
        const response = await loginUser({
          variables: {
            input: {
              idNumber: formData.idNumber,
              password: formData.password,
            },
          },
        });
        if (response.data.loginUser.status === 201) {
          dispatch(login(response.data.loginUser.data));
          localStorage.setItem("token",  JSON.stringify(response.data.loginUser.data));
          localStorage.setItem("isFaculty",  JSON.stringify(false));
          localStorage.setItem("userToken", JSON.stringify(response.data.loginUser.data.accessToken));
          setError("Login successful");
          navigate("/");
        } else {
          setError(response.data.loginUser.message);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setError("An error occurred while logging in. Please try again.");
      }
    } else {
      try {
        const response = await loginFaculty({
          variables: {
            input: {
              idNumber: formData.idNumber,
              password: formData.password,
            },
          },
        });
        if (response.data.loginFaculty.status === 201) {
          dispatch(login(response.data.loginFaculty.data));
          dispatch(faculty());
          localStorage.setItem("token",  JSON.stringify(response.data.loginFaculty.data));
          localStorage.setItem("isFaculty",  JSON.stringify(true));
          localStorage.setItem("userToken", JSON.stringify(response.data.loginFaculty.data.accessToken));
          setError("Login successful");
          navigate("/");
        } else {
          setError(response.data.loginFaculty.message);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setError("An error occurred while logging in. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: value }));
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        role: value,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white mt-20 w-3/5 rounded-xl justify-center pb-4 md:m-10 text-center self-center border-t-2 border-text-green">
      <div className="w-full h-full pt-10 md:w-1/2 flex flex-col justify-center gap-2 md:gap-7 md:m-5">
        <Logo width="200px" height="200px" />
        <h1 className="text-custom-purple mt-2 md:text-4xl sm:text-3xl font-bold tracking-widest">
          IIT BHILAI
        </h1>
      </div>
      <div className="border border-nav-white mt-2 mb-2"></div>
      <div className="w-4/5 h-full m-auto mt-10 md:w-1/2 flex flex-col justify-evenly gap-7 md:m-5">
        <h2 className="text-nav-white mt-1 sm:mt-2 text-2xl md:text-2xl sm:text-2xl font-bold tracking-widest">
          LOGIN {error && <span className="text-red-500">{error}</span>}
        </h2>
        <form onSubmit={handleLogin} className="p-2 flex flex-col gap-3">
          <Input
            type="number"
            name="idNumber"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="flex gap-10">
            <RadioButton
              id="faculty"
              label="faculty"
              name="Enrollment Type"
              value="faculty"
              onChange={handleChange}
              checked={formData.role === "faculty"}
              required
            />
            <RadioButton
              id="student"
              label="student"
              name="Enrollment Type"
              value="student"
              onChange={handleChange}
              checked={formData.role === "student"}
              required
            />
          </div>
          <Button
            type="submit"
            className="rounded-xl transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 bg-custom-purple hover:bg-text-green text-white outline-none focus:bg-gray-50 duration-200 w-full"
            disabled={loading}
          >
            Submit
          </Button>
        </form>
        <div className="flex justify-evenly gap-2">
          <Link
            to="/signup"
            className="flex justify-evenly text-sm transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 text-gray-700 hover:text-nav-white"
          >
            Create a new Account?
          </Link>
          
        </div>
        
      </div>
    </div>
  );
};

export default Login;
