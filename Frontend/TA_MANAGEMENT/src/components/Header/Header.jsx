import React from "react";
import { Logo, ProfileLogo } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import cat from "../../assets/cat.jpg";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();
  const facultyStatus = "Course Added"; // or "Not Assigned"
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      color: "text-custom-purple",
      authenticationReq: true,
      facultyReq: "either",
    },
    {
      name: "TA List",
      slug: "/ta-list",
      color: "text-custom-purple",
      authenticationReq: true,
      facultyReq: "either",
    },
    {
      name: "Leaves",
      slug: "/leaves",
      color: "text-custom-purple",
      authenticationReq: true,
      facultyReq: "Course Added",
    },
    {
      name: "Register",
      slug: "/login",
      color: "text-red-500",
      authenticationReq: false,
      facultyReq: "either",
    },
    {
      name: "Logout",
      slug: "/",
      color: "text-red-500",
      authenticationReq: true,
      facultyReq: "either",
    },
  ];

  const renderNavItems = () => {
    return navItems.map((item) => {
      if (
        (item.authenticationReq && !isAuthenticated) ||
        (item.facultyReq !== "either" && item.facultyReq !== facultyStatus)
      ) {
        return null;
      }

      if (item.name === "Register" && isAuthenticated) {
        return null;
      }

      const isActive = location.pathname === item.slug;
      return (
        <Link
          key={item.name}
          className={`${item.color} text-xs sm:text-base font-bold ${
            isActive ? item.color : "text-custom-black"
          }`}
          to={item.slug}
          onClick={item.name === "Logout" ? onLogout : undefined}
        >
          {item.name}
        </Link>
      );
    });
  };

  return (
    <div className="bg-custom-purple h-auto">
      <div className="bg-white flex justify-between items-center rounded-b-xl p-1">
        <div className="flex sm:w-2/3 lg:w-1/2 justify-between self-center ml-2 gap-5">
          <div className="ml-3">
            <Logo
              width="60px"
              height="70px"
              className="ml-6 content-center items-center"
            />
          </div>
          <div className="flex w-4/5 justify-start self-center gap-2 sm:gap-5">
            {renderNavItems()}
          </div>
        </div>
        <div
          className="flex flex-col items-center mr-4 cursor-pointer"
          onClick={() => navigate("/faculty-dashboard")}
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
