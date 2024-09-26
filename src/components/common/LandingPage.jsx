import React, { useState } from "react";
import { frame, man1, man2, views } from "../../assets";
import Banner from "./Banner";
import ForParticipants from "./ForParticipants";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import BasicModal from "./SignUpModal";
const LandingPage = () => {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const openModal = () => setOpenSignUpModal(true);
  const closeModal = () => setOpenSignUpModal(false);
  const navigate = useNavigate();
  return (
    <div>
      <Navbar openModal={openModal} />
      <BasicModal openModal={openSignUpModal} handleClose={closeModal} />
      <div className="w-full h-screen text-center  ">
        <div className="w-full h-screen text-center relative ">
          <div className=" mx-auto p-2 flex justify-center">
            <div className="mt-[60px]">
              <h1 className=" text-[12141D] items-center text-center font-Lexend-Exa lg:text-6xl font-extrabold leading-11 tracking-wider  ">
                Unleashing Innovation, <br /> One Hackathon at a Time!
              </h1>
              <p className="text-center lg:w-[588px] mt-7 ml-20 font-normal">
                Join a global community of thinkers, dreamers, and doers.
                Whether you're here to conquer challenges or host groundbreaking
                hackathons, this is where innovation takes center stage.
              </p>
            </div>
          </div>{" "}
          <div className="flex gap-10 items-center justify-center md:w-full mt-[100px]">
            <button
              onClick={() => navigate("/part-signup")}
              className="bg-[#089BD9] rounded-[10px]  text-white py-4 px-[20px] lg:w-[239px]  transition-transform transform hover:-translate-y-1"
            >
              For Participants
            </button>

            <button
              onClick={() => navigate("/org-signup")}
              className="py-4 px-[20px]  rounded-[10px] border-2 lg:w-[239px] border-[#089BD9]  transition-transform transform hover:-translate-y-1"
            >
              For Organisers
            </button>
          </div>
          <div className="absolute hidden lg:block rounded-full  filter bottom-[230px]  right-[180px]  ">
            <img
              src={man2}
              className="rounded-full hidden lg:block  bg-[#00609E]  border-white border-4 opacity-4 w-[80px] "
            />
          </div>
          <div className="absolute hidden lg:block  w-269 h-269 flex-shrink-0  border-white border-4 rounded-full opacity-4 bg-blue-500  filter left-[150px]  bottom-[50px] ">
            <img src={man1} />
          </div>
          <div className="absolute lg:flex  left-[400px] mt-[120px]  hidden  flex-col justify-center items-center gap-4 p-4 w-[163px] transform -rotate-5 border-2 border-solid border-transparent rounded-10  ">
            <img src={frame} />
          </div>
          <div className="absolute  left-[760px] mt-[24px]   w-[400px]  rounded-10  ">
            <img src={views} />
          </div>
        </div>
        <Banner />
        <ForParticipants />
      </div>
    </div>
  );
};

export default LandingPage;
