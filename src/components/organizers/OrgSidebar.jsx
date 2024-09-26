import React, { useState, useEffect } from "react";
import logo from "../../assets/unitar-logo.svg";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { align, layers } from "../../assets";
const OrgSidebar = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");
  useEffect(() => {
    if (pathnameArray[2] === undefined || pathnameArray[2] === "dashboard") {
      setActivePage("dashboard");
    } else if (pathnameArray[2] === "hackathons") {
      setActivePage("hackathons");
    } else if (pathnameArray[2] === "submissions") {
      setActivePage("submissions");
    }
  }, [pathnameArray]);
  return (
    <div className=" flex ">
      <div className="bg-light-blue w-[250px]  p-5 h-screen fixed left-0 top-0 ">
        <div className="flex justify-between">
          <img src={logo} alt="" />
          {/* <img src="/assets/back.svg" alt="back" width="20" height="20" /> */}
        </div>
        <button
          onClick={() => navigate("/organizer/dashboard")}
          style={{
            borderColor: activePage === "dashboard" ? "#089BD9" : "inherit",
            transition: "border-color 0.3s",
          }}
          className="py-2 pl-6 pr-5 border rounded-md   mt-16"
        >
          <div className="flex gap-5">
            <img src={align} alt="" />
            <span>Dashboard</span>
          </div>
        </button>

        <button
          onClick={() => navigate("/organizer/hackathons")}
          style={{
            borderColor: activePage === "hackathons" ? "#089BD9" : "inherit",
            transition: "border-color 0.3s",
          }}
          className="py-2 pl-6 pr-5 border rounded-md hover:border-custom-blue mt-5"
        >
          <div className="flex gap-5">
            <img src={layers} alt="" />
            <span>Hackathons</span>
          </div>
        </button>

        <button
          onClick={() => navigate("/organizer/submissions")}
          style={{
            borderColor: activePage === "submissions" ? "#089BD9" : "inherit",
            transition: "border-color 0.3s",
          }}
          className="py-2 px-6 border rounded-md mt-5"
        >
          <div className="flex gap-5">
            <img src="/assets/submissions.svg" />
            <span>Submissions</span>
          </div>
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default OrgSidebar;
