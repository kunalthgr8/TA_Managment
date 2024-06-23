import React, { useState } from "react";
import { Logo, Button, Input } from "../index";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ idNumber: "", username:"", emailId:"" , phoneNumber:"", password: "" });
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // console.log(formData);
    // Perform login logic here
    // If there's an error, set it using setError
    // setError("Signup failed");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row bg-white mt-20 w-3/5 rounded-xl justify-center mb-10 pb-4 text-center self-center border-t-2 border-text-green">
      <div className="w-full h-full pt-10 md:w-1/2 flex flex-col justify-center gap-2 md:gap-7 md:m-5">
        <Logo width="200px" height="200px" />
        <h1 className="text-custom-purple mt-2 md:text-4xl sm:text-3xl font-bold tracking-widest">
          IIT BHILAI
        </h1>
      </div>
      <div className="border border-nav-white mt-2 "></div>
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
          />
          <Input
            type="text"
            name="username"
            placeholder="UserName"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="emailId"
            placeholder="EmailId"
            value={formData.emailId}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
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
        <div className="flex justify-start ">
          <Link
            to="/signup"
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
