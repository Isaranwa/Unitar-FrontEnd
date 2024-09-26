import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserProfile from "./profile/UserProfile";
import HackathonsPage from "./HackathonsPage";
import { getParticipantMetrics } from "../../api/accounts/accounts";
import { selectLoggedInUserRef } from "../../features/user/userSlice";
const ParticipantsContent = () => {
  const [stats, setStats] = useState({});
  const part_ref = useSelector(selectLoggedInUserRef);

  useEffect(() => {
    getParticipantMetrics(part_ref).then((res) => {
      setStats(res.data);
    });
  }, []);
  return (
    <div className=" ml-60">
      <div className="flex justify-between">
        <h1 className="text-gray-600 font-bold text-[24px]">Dashboard</h1>
        <UserProfile />
      </div>

      <div className="flex mt-12">
        <div className="border bg-custom-blue rounded-md text-white pr-20 pt-5 mr-5">
          <span className="text-xs p-5">Your Hackathons</span>
          <p className="p-5 font-bold">{stats.total_hackathons}</p>
        </div>
        <div className="border bg-custom-grey rounded-md  pr-20  pt-5 mr-5">
          <span className="text-xs p-5">Affiliated Organizations</span>
          <p className="p-5 font-bold">{stats.total_organizers}</p>
        </div>
        <div className="border bg-custom-grey rounded-md  pr-20  pt-5 mr-5">
          <span className="text-xs p-5">Submitted projects</span>
          <p className="p-5 font-bold">{stats.total_submissions}</p>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-gray-600 font-semibold">Ongoing hackathons</h1>
        <h3 className="mt-3 text-sm font-bold">Hackathons</h3>
        <p className="text-gray-500 text-xs mt-2 ">
          Active Hackathons are listed here
        </p>
        <HackathonsPage />
      </div>
    </div>
  );
};

export default ParticipantsContent;
