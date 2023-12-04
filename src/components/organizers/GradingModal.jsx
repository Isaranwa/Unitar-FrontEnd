import React, { useState } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { evaluateHackathon } from "../../api/hackathons/hackathons";
import { selectCurrentSubscriptionDetail } from "../../features/subscription/subscriptionSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #089BD9",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const customStyles = {
  fontFamily: "Lexend, sans-serif",
  marginTop: 0,
  fontSize: "24px",
};

export default function GradingModal({ openModal, handleClose }) {
  const subscription = useSelector(selectCurrentSubscriptionDetail);
  const [grade, setGrade] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    evaluateHackathon(subscription.id, grade).then((res) => {
      if (res.status === 200) {
        alert("Submission graded");
        handleClose()
      }
    });
  };
  function handleChange (e){
    setGrade(e.target.value)
  }
  return (
    <Box>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className=" flex ">
            <Box>
              <Typography variant="h6" component="h2" sx={customStyles}>
                Grade Hachathon Project{" "}
              </Typography>
              <Box className="flex space-x-4 ">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col mt-10"
                >
                  <label>Grade project(out of 100)</label>
                  <input
                    type="number"
                    placeholder="Enter a grade"
                    required
                    onChange={handleChange}
                    className="border py-3 px-2 border-gray-400 mt-4 "
                  />{" "}
                  <button
                    type="submit"
                    className="py-3 px-2 bg-custom-blue rounded-md text-white text-xs w-[100px] mt-10"
                  >
                    {" "}
                    Submit Grade
                  </button>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
