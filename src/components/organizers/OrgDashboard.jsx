import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrgHackathons from "./OrgHackathons";
import OrgProfile from "./profile/OrgProfile";
import { getOrganizerMetrics } from "../../api/accounts/accounts";
import { selectLoggedInUserRef } from "../../features/user/userSlice";
const OrgDashboard = () => {
  const [stats, setStats] = useState({});
  const org_ref = useSelector(selectLoggedInUserRef);

  useEffect(() => {
    getOrganizerMetrics(org_ref).then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="bg-white p-8 right-side min-h-screen">
      <div className="overflow-y-auto  ml-60">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px]">Dashboard</h1>
          <OrgProfile />
        </div>
        <div className="flex mt-12">
          <div className="border bg-custom-blue rounded-md text-white pt-5 mr-5 pr-[40px] ">
            <span className="text-xs p-5">Affiliated Participants</span>
            <p className="p-5 font-bold">{stats.total_participants}</p>
          </div>
          <div className="border bg-custom-grey rounded-md   pr-[60px]  pt-5 mr-5">
            <span className="text-xs p-5">Your Hackathons</span>
            <p className="p-5 font-bold">{stats.total_hackathons}</p>
          </div>
          <div className="border bg-custom-grey rounded-md  pr-[60px]  pt-5 mr-5">
            <span className="text-xs p-5">Submitted Projects</span>
            <p className="p-5 font-bold">{stats.total_submissions}</p>
          </div>
        </div>
        <div className="mt-10">
          <h1 className=" font-bold">Ongoing hackathons</h1>
          <h3 className="mt-3 text-sm text-gray-600 font-bold">
            Your active hackathons are listed here
          </h3>
          <OrgHackathons />
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;
