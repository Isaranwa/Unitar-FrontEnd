import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentOrganizerDetail } from "../../../features/organizer/organizerSlice";

const OrgProfilePage = () => {
  const navigate = useNavigate();
  const orgProfile = useSelector(selectCurrentOrganizerDetail);

  return (
    <div className="right-side min-h-screen bg-pattern">
      <div className="ml-80">
        <h1 className="text-gray-600 text-[24px] font-bold">User Profile</h1>
        <div className="flex flex-row gap-[100px]">
          <div className="mt-3 flex flex-col items-center justify-center bg-[#f0f6ff] w-[400px] rounded-md shadow-lg p-4">
            <Avatar
              alt="Profile pic"
              src={orgProfile.profile_image_url}
              sx={{
                width: "200px",
                height: "200px",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={() => navigate("/organizer/profile/edit")}
              className="bg-custom-blue text-white p-2 rounded-md hover:bg-blue-500 w-full mt-4"
            >
              Edit Profile
            </button>
          </div>
          <div className="mt-10">
            <h1 className="mt-3 mb-2 text-gray-600 font-semibold">
              Profile Details
            </h1>
            <div className="flex flex-col bg-[#f0f6ff] w-[400px] h-[150px] rounded-md shadow-lg p-4">
              <div className="flex mb-3">
                <strong className="text-custom-blue w-[150px]">Name</strong>
                <p>{orgProfile.name}</p>
              </div>
              <div className="flex mb-3">
                <strong className="text-custom-blue w-[150px]">Industry</strong>
                <p>{orgProfile.industry}</p>
              </div>
              <div className="flex">
                <strong className="text-custom-blue w-[150px]">Location</strong>
                <p>{orgProfile.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgProfilePage;
