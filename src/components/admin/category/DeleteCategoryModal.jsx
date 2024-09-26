import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import { deleteHackathonCategory } from "../../../api/hackathons/hackathons";
import SuccessfulDeletionModal from "./SuccessfulDeletionModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 280,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function DeleteChipModal({ openModal, closeModal, category }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const closeDeleteModal = () => {
    setModalOpen(false);
  };
  console.log(category);
  const handleDelete = () => {
    deleteHackathonCategory(category).then((res) => {
      if (res.status === 204) {
        setModalOpen(true);
        setTimeout(() => {
          closeDeleteModal();
          navigate("/admin/category");
        }, 3000);
      } else {
        setErrorMessage("Error creating tag");
      }
    });
  };

  return (
    <Box>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className=" flex items-center justify-center">
            <Box>
              <Box className="flex space-x-4 ">
                <div>
                  <h1 className="font-bold text-[20px]  font-Lexend-Exa  text-center">
                    Delete Hackathon Category
                  </h1>
                  {errorMessage && (
                    <p className="text-red-500 text-xs">{{ errorMessage }}</p>
                  )}
                  <div className="flex justify-center ">
                    <img
                      src="/assets/bin.jpg"
                      alt=""
                      className="w-[80px] h-[80px]"
                    />
                  </div>

                  <p className="text-sm items-center text-gray-700  ">
                    Delete this Category?
                  </p>
                  <div className="flex flex-row gap-5 mt-6 justify-center">
                    <button
                      onClick={() => handleDelete()}
                      className="bg-[#D40C0C] text-white font-bold w-[150px] py-2 px-2 rounded-md "
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={closeModal}
                      className="py-2 border border-black rounded-md w-[150px]"
                    >
                      Cancel
                    </button>
                  </div>
                  <SuccessfulDeletionModal
                    openModal={isModalOpen}
                    closeModal={closeDeleteModal}
                  />
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
