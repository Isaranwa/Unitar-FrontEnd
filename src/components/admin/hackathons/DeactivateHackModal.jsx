import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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

export default function DeactivateHackModal({ openModal, closeModal }) {
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
                    Deactivate Hackathon
                  </h1>
                  <div className="flex justify-center ">
                    <img
                      src="/assets/hackdeactivate.jpg"
                      alt=""
                      className="w-[80px] h-[80px] mt-2"
                    />
                  </div>
                  <p className="mt-2 items-center text-gray-700 text-sm ">
                    Do you really want to deactivate this hackathon?
                  </p>

                  <div className="flex flex-row gap-5 mt-6">
                    <button className="bg-[#D40C0C] text-white font-bold w-[150px] py-2 px-2 rounded-md  ">
                      Yes, Deactivate
                    </button>
                    <button
                      onClick={closeModal}
                      className="border  border-black rounded-md w-[150px] py-2 px-2 "
                    >
                      No, Cancel
                    </button>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
