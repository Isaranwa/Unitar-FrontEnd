import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { activateUserAccount } from "../../../api/admins/admins";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ActivateModal({ openModal, closeModal, user_id }) {
  const adminActivateUser = () => {
    activateUserAccount(user_id).then((res) => {
      if (res.status === 200) {
        // raise success message and close the activate modal
        closeModal();
      } else {
        // raise error message
        console.log(res.data);
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
                    Activate User's Account
                  </h1>
                  <div className="flex justify-center ">
                    <img
                      src="/assets/activate.jpg"
                      alt=""
                      className="w-[100px] h-[100px]"
                    />
                  </div>
                  <p className=" text-center text-gray-700 text-sm mt-2 ">
                    Do you really want to activate this account?
                  </p>
                  <div className="flex flex-row gap-5 mt-10">
                    <button
                      onClick={() => adminActivateUser()}
                      className="bg-[#06BD0E] text-white font-bold w-[150px] py-2 px-2 rounded-md "
                    >
                      Yes, Activate
                    </button>
                    <button
                      onClick={closeModal}
                      className="border  border-black rounded-md w-[150px] py-2 px-2  "
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
