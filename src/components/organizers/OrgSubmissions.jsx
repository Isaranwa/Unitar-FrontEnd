import React from "react";
import OrgSubmissionsTable from "./OrgSubmissionsTable";
import OrgProfile from "./profile/OrgProfile";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedHackathonDetail } from "../../features/hackathon/hackathonSlice";

const OrgSubmissions = () => {
  const hackathon = useSelector(selectSelectedHackathonDetail);
  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full">
      <div className="ml-60">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px] mb-8 ">
            Submissions
          </h1>
          <OrgProfile />
        </div>
        <p className="text-xs text-gray-500  flex flex-row mb-10">
          <span>Submissions</span>
          <img
            src="/assets/chevron-right-solid.svg"
            className="w-2 h-2 mt-[4px] "
            alt="chevron"
          />
          <span>{hackathon.title}</span>
        </p>
        <div className="mb-10">
          <OrgSubmissionsTable hackathonId={hackathon.id} />
        </div>
      </div>
    </div>
  );
};

export default OrgSubmissions;
