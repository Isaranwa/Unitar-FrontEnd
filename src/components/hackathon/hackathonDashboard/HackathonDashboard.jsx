import React from "react";
import { Outlet } from "react-router-dom";
import UserProfile from "../../participants/profile/UserProfile";
import OpenHackathon from "./OpenHackathon";

const HackathonDashboard = () => {
  return (
    <>
      <div className="overflow-y-auto  ml-60 bg-white p-8 right-side min-h-screen">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px]">Hackathons</h1>
          <UserProfile />
        </div>
        <div className="mt-10">
          <h1 className="text-gray-600 font-semibold text-sm">
            Open Hackathons
          </h1>
          <OpenHackathon />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default HackathonDashboard;
