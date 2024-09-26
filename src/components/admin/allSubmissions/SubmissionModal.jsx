import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function SubmissionModal({ openModal, closeModal }) {
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
                  <h1 className="font-bold text-[20px] font-Lexend-Exa  text-center">
                    Edit Submission
                  </h1>
                  <div className="flex justify-center">
                    <img
                      src="/assets/success.svg"
                      alt=""
                      className="w-[80px] h-[80px]"
                    />
                  </div>
                  <p className=" items-center text-gray-700 text-sm mt-2 ">
                    You have successfully edited this submission.
                  </p>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
