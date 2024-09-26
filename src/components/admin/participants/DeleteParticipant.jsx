import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "./DeleteModal";
import { selectCurrentParticipantDetail } from "../../../features/participant/participantSlice";
import { deleteParticipantProfile } from "../../../api/accounts/accounts";
import DeleteSuccessModal from "../hackathons/DeleteSuccessModal";
import { useNavigate } from "react-router-dom";

const DeleteParticipant = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const partProfile = useSelector(selectCurrentParticipantDetail);
  const participant_code = partProfile.id;
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    setModalOpen(true);
  };
  const handleDeleteUserAccount = (id) => {
    deleteParticipantProfile(id).then((res) => {
      if (res.status === 204) {
        setModalOpen(false);
        setDeleteModalOpen(true);
        setTimeout(() => {
          setDeleteModalOpen(false);
          navigate(-1);
        }, 2000);
      } else {
        alert("Error Deleting Account");
      }
    });
  };
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
                loading="lazy"
                src={partProfile?.profile_image_url || ""}
                sx={{
                  width: "200px",
                  height: "200px",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              />
              <button
                onClick={handleClick}
                className="bg-[#D40C0C] text-white p-2 rounded-md hover:bg-red-700 w-[200px] mt-4"
              >
                Delete participant
              </button>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="mt-3 mb-2 text-gray-600 font-semibold">
              Profile Details
            </h1>
            <div className="flex flex-col bg-[#f0f6ff] w-[400px] rounded-md shadow-lg px-2 py-4">
              <p>
                <strong className="text-custom-blue px-4">First Name:</strong>{" "}
                {partProfile?.first_name || ""}
              </p>
              <p className="mt-3">
                <strong className="text-custom-blue px-4">Last Name:</strong>{" "}
                {partProfile?.last_name || ""}
              </p>
              <p className="mt-3">
                <strong className="text-custom-blue px-4">Residence:</strong>{" "}
                {partProfile?.residence || ""}
              </p>
            </div>
            <div className="mt-5 flex flex-col bg-[#f0f6ff] w-[400px] rounded-md shadow-lg px-2 py-4">
              <p className="mt-3">
                <strong className="text-custom-blue px-3">Gender:</strong>{" "}
                {partProfile?.gender || ""}
              </p>
              <p className="mt-3">
                <strong className="text-custom-blue px-3">
                  Date of Birth:
                </strong>{" "}
                {partProfile?.date_of_birth || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        openModal={isModalOpen}
        closeModal={() => setModalOpen(false)}
        id={participant_code}
        deleteAction={handleDeleteUserAccount}
      />
      <DeleteSuccessModal
        openModal={isDeleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default DeleteParticipant;
