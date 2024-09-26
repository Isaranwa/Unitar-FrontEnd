import React, { useState } from "react";
import HackathonMedia from "../../common/utils/HackathonMedia";
import ActivateHackModal from "./ActivateHackModal";
import AdminProfile from "../AdminLogOut";

const ActivateHack = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    setModalOpen(true);
  };
  return (
    <div className="bg-white p-8  min-h-screen right-side">
      <div className="flex justify-between">
        <div className="ml-60 mb-2">
          {" "}
          <h1 className="mt-0 text-gray-600 font-bold  text-[20px] relative ">
            Hackathon
          </h1>
        </div>
        <AdminProfile />
      </div>
      <p className="text-xs text-gray-500  flex flex-row mb-10 ml-60">
        <span>Hackathons</span>
        <img
          src="/assets/chevron-right-solid.svg"
          className="w-2 h-2 mt-[4px] "
          alt="chevron"
        />
        <span>DevIT</span>
      </p>
      <div className="flex gap-[100px] ml-60">
        <div className="flex flex-col">
          <HackathonMedia
            cover_image_url="/assets/image2.png"
            avatar_url="/assets/image3.png"
          />
          <div className="flex flex-row gap-10 mt-[30px]">
            <div className="text-xs">
              <p className="font-semibold">Location</p>
              <p className="mt-2">Nairobi</p>
            </div>
            <div className="text-xs">
              <p className="font-semibold">Status</p>
              <p className="text-green-500 mt-2">Active</p>
            </div>
          </div>
          <div className="mt-[40px]">
            <p className="font-semibold text-xs">Timelines</p>
            <div className="mt-5  gap-5">
              <div className="mt-5 gap-5">
                {/* {hackathon.timelines &&
                  hackathon.timelines.map((field, index) => (
                    <p className="mt-2" key={index}>
                      {field.period_name}: Start{" "}
                      {moment(field.start_date).format("Do MMM YYYY ")}
                    </p>
                  ))} */}
              </div>
              <p className="font-semibold text-xs">Tags</p>
              <div className="mt-5 flex gap-5">
                {/* {hackathon.tags &&
                  hackathon.tags.map((field, index) => (
                    <span
                      key={index}
                      className="bg-custom-light-grey rounded-[40px] p-3 text-white text-xs"
                    >
                      {field.tag_name}
                    </span>
                  ))} */}
              </div>
            </div>
            <div className="flex flex-col text-xs mt-5">
              <p className="font-semibold mt-5 mb-2 ">Prizes</p>
              <p className="font-semibold ">3800$</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col w-[500px]">
            <h1 className="mt-0 text-gray-600 font-bold  text-[20px]">
              EdTechInnovation{" "}
            </h1>

            <div>
              <p className="text-sm  font-semibold mt-5">Highlights</p>
              <p className="text-xs mt-5">
                {" "}
                Redefining synchronous learning experiences.
              </p>
            </div>
            <div>
              <p className="text-sm  font-semibold mt-5">Description</p>
              <p className="text-xs mt-5">
                {" "}
                A revolutionary platform designed to empower educators with
                cutting-edge tools for immersive and engaging virtual
                classrooms.
              </p>
            </div>
            <div>
              <p className="text-sm  font-semibold mt-5">Deliverables</p>
              <p className="text-xs mt-5">
                Pitch Presentation, Prototype/MVP,Demo Video{" "}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mt-5">Goals</p>
              <div className="text-xs">
                1.Prototype Development: Goal: Create a functional prototype
                showcasing the core features of the EdTech solution. User
                2.Engagement: Goal: Collect valuable feedback from judges and
                potential users to enhance the project. 3.Effective Pitch: Goal:
                Deliver a compelling pitch presentation highlighting the
                problem, solution, and impact of the EdTechInnovation.
              </div>
            </div>

            <div>
              <button
                onClick={handleClick}
                className="bg-[#06BD0E] text-white px-3 py-2 rounded-md mt-5 w-[150px] hover:bg-green-700 "
              >
                Activate
              </button>
            </div>
          </div>
        </div>
      </div>
      <ActivateHackModal
        openModal={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ActivateHack;
