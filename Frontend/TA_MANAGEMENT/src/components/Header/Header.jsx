import React from "react";
import { Logo, ProfileLogo } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import cat from "../../assets/cat.jpg";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../../graphql/mutations/user.mutations";
import { LOGOUT_FACULTY } from "../../graphql/mutations/faculty.mutations";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFaculty = useSelector((state) => state.auth.isFaculty);
  const [logoutUser] = useMutation(LOGOUT_USER);
  const [logoutFaculty] = useMutation(LOGOUT_FACULTY);
  const facultyStatus = "Course Added"; // or "Not Assigned"

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const onLogout = async () => {
    try {
      const { idNumber } = user;
      console.log("isFaculty", isFaculty);
      if (!isFaculty) {
        await logoutUser({ variables: { idNumber } });
      } else {
        await logoutFaculty({ variables: { idNumber } });
      }
      dispatch(logout());
      localStorage.clear()
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      color: "text-custom-black",
      authenticationReq: true,
      facultyReq: "either",
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

  const navItemsForTa = [
    {
      name: "Home",
      slug: "/",
      color: "text-custom-black",
      authenticationReq: true,
      facultyReq: "either",
    },
    {
      name: "Leave",
      slug: "/taLeaves",
      color: "text-custom-black",
      authenticationReq: true,
      facultyReq: "Course Added",
    },
    {
      name: "Logout",
      slug: "/",
      color: "text-red-500",
      authenticationReq: true,
      facultyReq: "either",
    },
    {
      name: "Register",
      slug: "/login",
      color: "text-red-500",
      authenticationReq: false,
      facultyReq: "either",
    },
  ];
  const finalNavItems = isFaculty ? navItems : navItemsForTa;

  const renderNavItems = () => {
    return finalNavItems.map((item) => {
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
            isActive ? "text-custom-purple" : "text-custom-black"
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
          <div className="ml-3" onClick={() => navigate("/")}>
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
          <p className="text-xs">
            {isAuthenticated ? capitalizeName(user.name) : "User"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
