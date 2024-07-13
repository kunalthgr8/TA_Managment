import React, { useState } from "react";
import { Logo, Button, Input, RadioButton } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutations/user.mutations";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idNumber: "",
    username: "",
    emailId: "",
    phoneNumber: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.role === "student") {
      try {
        const response = await registerUser({
          variables: {
            input: {
              idNumber: formData.idNumber,
              name: formData.username,
              email: formData.emailId,
              phoneNumber: formData.phoneNumber,
              password: formData.password,
            },
          },
        });

        if (response.data.registerUser.status === 201) {
          dispatch(login(response.data.registerUser.data));
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.registerUser.data)
          );
          navigate("/");
        } else {
          setError(response.data.registerUser.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleChange = (e) => {
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
      <div className="w-full h-full pt-10 md:w-1/2 flex flex-col justify-center self-center gap-2 md:gap-7 md:m-5">
        <Logo width="200px" height="200px" />
        <h1 className="text-custom-purple mt-2 md:text-4xl sm:text-3xl font-bold tracking-widest">
          IIT BHILAI
        </h1>
      </div>
      <div className="border border-nav-white mt-2"></div>
      <div className="w-4/5 h-full m-auto mt-10 md:w-1/2 flex flex-col justify-evenly gap-7 md:m-5">
        <h2 className="text-nav-white mt-1 sm:mt-2 text-2xl md:text-2xl sm:text-2xl font-bold tracking-widest">
          SIGNUP {error && <span className="text-red-500">{error}</span>}
        </h2>
        <form onSubmit={handleSignup} className="p-2 flex flex-col gap-3">
          <Input
            type="number"
            name="idNumber"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="emailId"
            placeholder="Email Id"
            value={formData.emailId}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
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
        <div className="flex justify-start">
          <Link
            to="/login"
            className="flex justify-evenly text-sm transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 text-gray-700 hover:text-nav-white"
          >
            Already have an account?
          </Link>
        </div>
        <hr className="border-nav-white" />
        <Button className="p-4 rounded-full bg-gray-300 font-semibold text-gray-700 text-sm">
          Sign Up By Google
        </Button>
      </div>
    </div>
  );
};

export default Signup;
