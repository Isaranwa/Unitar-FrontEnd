import { Avatar } from "@mui/material";
import React, { useState } from "react";
import DeactivateModal from "./DeactivateModal";

const DeactivateOrganization = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    setModalOpen(true);
  };
  return (
    <div className="right-side min-h-screen bg-pattern">
      <div className="ml-[300px]">
        <h1 className="text-gray-600 text-[24px] font-bold mt-4">
          Activate User Account
        </h1>
        <div className="flex flex-row gap-[100px]">
          <div className="mt-3 flex flex-col items-center justify-center bg-[#f0f6ff] w-[400px] rounded-md shadow-lg p-4">
            <Avatar
              alt="Profile pic"
              src="/assets/image2.png"
              sx={{
                width: "200px",
                height: "200px",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={handleClick}
              className="bg-[#D40C0C] text-white p-2 rounded-md hover:bg-red-600 w-[200px] mt-4"
            >
              Deactivate Account
            </button>
          </div>
          <div className="mt-10">
            <h1 className="mt-3 mb-2 text-gray-600 font-semibold">
              Profile Details
            </h1>
            <div className="flex flex-col bg-[#f0f6ff] w-[400px] h-[150px] rounded-md shadow-lg p-4">
              <div className="flex mb-3">
                <strong className="text-custom-blue w-[150px]">Name</strong>
                <p>UNITAR-W</p>
              </div>
              <div className="flex mb-3">
                <strong className="text-custom-blue w-[150px]">Industry</strong>
                <p>Tech</p>
              </div>
              <div className="flex">
                <strong className="text-custom-blue w-[150px]">Location</strong>
                <p>Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeactivateModal
        openModal={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </div>
  );
};

export default DeactivateOrganization;
