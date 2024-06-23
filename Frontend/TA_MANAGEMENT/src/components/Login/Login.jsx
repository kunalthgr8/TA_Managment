import React, { useState } from "react";
import { Logo, Button, Input } from "../index";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ idNumber: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    // If there's an error, set it using setError
    // setError("Login failed");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="rounded-xl transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 bg-custom-purple hover:bg-text-green text-white outline-none focus:bg-gray-50 duration-200 w-full"
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
          <Link
            to="/"
            className="flex justify-evenly text-sm transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 text-gray-700 hover:text-nav-white"
          >
            Forgot Password?
          </Link>
        </div>
        <hr className="border-nav-white" />
        <Button className="p-4 rounded-full bg-gray-300 font-semibold text-gray-700 text-sm">
          Sign In By Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
