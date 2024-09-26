import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentParticipantDetail } from "../../../features/participant/participantSlice";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const partProfile = useSelector(selectCurrentParticipantDetail);

  return (
    <div className="right-side min-h-screen bg-pattern">
      <div className="ml-80">
        <h1 className="text-gray-600 text-[24px] font-bold py-3">
          User Profile
        </h1>
        <div className="flex flex-row gap-[100px]">
          <div className="mt-3 flex justify-center bg-[#f0f6ff] w-[400px] h-[350px] rounded-md shadow-lg px-2 py-4">
            <div>
              <Avatar
                alt="Profile pic"
                src={partProfile.profile_image_url}
                sx={{
                  width: "200px",
                  height: "200px",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              />
              <button
                onClick={() => navigate("/participant/profile/edit")}
                className="bg-custom-blue text-white p-2 rounded-md hover:bg-blue-500 w-[200px] mt-4"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="mt-3 mb-2 text-gray-600 font-semibold">
              Profile Details
            </h1>
            <div className="flex flex-col justify-start bg-[#f0f6ff] w-[400px] rounded-md shadow-lg px-2 py-4">
              <p>
                <strong className="text-custom-blue px-4">Full Name:</strong>{" "}
                {partProfile.full_name}
              </p>
              <p className="mt-3 ">
                <strong className="text-custom-blue px-4 ">Email:</strong>{" "}
                {partProfile.email}
              </p>
              <p className="mt-3 ">
                <strong className="text-custom-blue px-4">City:</strong>{" "}
                {partProfile.city}
              </p>
              <p className="mt-3 ">
                <strong className="text-custom-blue px-4">Gender:</strong>{" "}
                {partProfile.gender}
              </p>
              <p className="mt-3 ">
                <strong className="text-custom-blue px-4">
                  Date of Birth:
                </strong>{" "}
                {partProfile.date_of_birth}
              </p>
            </div>
            <div className="mt-5 mb-5 flex flex-col bg-[#f0f6ff] w-[400px] rounded-md shadow-lg px-2 py-4">
              <p className="mt-3">
                <strong className="text-custom-blue px-3">
                  Learning Pathway
                </strong>
              </p>
              <p className="px-3 text-sm mt-2"> {partProfile.pathway}</p>
              <p className="mt-3">
                <strong className="text-custom-blue px-3">
                  Hackathon Theme
                </strong>{" "}
              </p>
              <p className="px-3 text-sm mt-2">
                {" "}
                {partProfile.hackathon_theme}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
