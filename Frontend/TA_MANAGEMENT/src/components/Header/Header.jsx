import React from "react";
import { Logo, ProfileLogo } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import cat from "../../assets/cat.jpg";

function Header() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = true;
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      color: "text-custom-purple",
      authenticationReq: true,
    },
    {
      name: "Courses",
      slug: "/courses",
      color: "text-custom-purple",
      authenticationReq: true,
    },
    {
      name: "TA List",
      slug: "/ta-list",
      color: "text-custom-purple",
      authenticationReq: true,
    },
    {
      name: "Leaves",
      slug: "/leaves",
      color: "text-custom-purple",
      authenticationReq: true,
    },
    {
      name: "Login",
      slug: "/login",
      color: "text-red-500",
      authenticationReq: false,
    },
    {
      name: "Signup",
      slug: "/signup",
      color: "text-red-500",
      authenticationReq: false,
    },
    {
      name: "Logout",
      slug: "/",
      color: "text-red-500",
      authenticationReq: true,
    },
  ];

  const renderNavItems = () => {
    return navItems.map((item) => {
      if (item.authenticationReq && !isAuthenticated) {
        return <div className="hidden"></div>;
      }
      if((item.name === "Login" || item.name === "Signup") && isAuthenticated){
        return <div className="hidden"></div>;
      }
      const isActive = location.pathname === item.slug;
      return (
        <Link
          key={item.name}
          className={`${item.color} font-bold ${
            isActive ? "text-purple-500" : item.color
          }`}
          to={item.slug}
        >
          {item.name}
        </Link>
      );
    });
  };

  return (
    <div className="bg-custom-purple h-auto">
      <div className="bg-white flex justify-between items-center rounded-b-xl p-1">
        <div className="flex sm:w-2/3 lg:w-1/2 justify-between self-center ml-2 gap-5 ">
          <div className="ml-3">
            <Logo
              width="60px"
              height="70px"
              className="ml-6 content-center items-center"
            />
          </div>
          <div className="flex w-4/5 justify-start self-center gap-5">
            {renderNavItems()}
          </div>
        </div>
        <div
          className="flex flex-col items-center mr-4 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <ProfileLogo
            width="50px"
            height="50px"
            className="rounded-3xl"
            src={cat}
          />
          <p className="text-xs">Gagan Raj Gupta</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
