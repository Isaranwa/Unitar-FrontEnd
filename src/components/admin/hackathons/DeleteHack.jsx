import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { selectSelectedHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import AdminProfile from "../AdminLogOut";
import DeleteHackModal from "./DeleteHackModal";

const DeleteHack = () => {
  const hackathon = useSelector(selectSelectedHackathonDetail);
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
        <div>
          {" "}
          <AdminProfile />
        </div>
      </div>
      <p className="text-xs text-gray-500  flex flex-row mb-6 ml-60">
        <span>Hackathons</span>
        <img
          src="/assets/chevron-right-solid.svg"
          className="w-2 h-2 mt-[4px] "
          alt="chevron"
        />
        <span>{hackathon.title}</span>
      </p>
      <div className="ml-60">
        <div className="flex flex-row gap-[150px]">
          <div className="relative">
            <img
              className="shadow-lg"
              src={
                hackathon.cover_image_url
                  ? hackathon.cover_image_url
                  : "/assets/no image (1).jpg"
              }
              alt=""
              style={{
                borderRadius: "6px",
                marginLeft: "30px",
                width: "450px",
                height: "350px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex flex-col w-[500px] ">
            <div>
              <p className="text-[18px]  font-semibold mt-5 ">Highlights</p>
              <p className="text-sm mt-5">{hackathon.highlight}</p>
            </div>
            <div>
              <p className="text-[18px] font-semibold mt-5">Description</p>
              <p className="text-sm mt-5">{hackathon.description}</p>
            </div>
            <div>
              <p className="text-[18px]  font-semibold mt-5">Deliverables</p>
              <p className="text-sm mt-5">{hackathon.deliverables}</p>
            </div>
            <div>
              <p className=" font-semibold mt-5 text-[18px]">Goals</p>
              <p className="mt-2 text-sm">{hackathon.goals}</p>
            </div>
          </div>
        </div>

        <div className="mt-[80px] ml-[30px]">
          <hr className="mb-10 border-t border-gray-300  " />
          <div className="flex flex-row justify-around">
            <div>
              <p className="font-semibold  text-[18px]">Location</p>
              <p className="mt-2 text-sm">{hackathon.location}</p>
            </div>
            <div>
              <p className="font-semibold  text-[18px]">Status</p>
              <p className="text-green-500 mt-2 text-[10px] py-1 border border-green-500 rounded-[20px] px-3">
                {hackathon.status}
              </p>
            </div>
            <div>
              <p className="font-semibold  text-[18px]">Timelines</p>
              <div className="mb-5 gap-5">
                {hackathon.timelines &&
                  hackathon.timelines.map((field, index) => (
                    <p className="text-xs mt-2" key={index}>
                      {field.period_name}: Start{" "}
                      {moment(field.start_date).format("Do MMM YYYY")}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <hr className="mb-10 border-t border-gray-300  " />
          <div className="flex flex-row ml-[100px] gap-[150px] mb-10 items-center">
            <div>
              <p className="font-semibold  text-[18px] mb-2">Tags</p>
              <div className=" flex gap-5">
                {hackathon.tags &&
                  hackathon.tags.map((field, index) => (
                    <span
                      key={index}
                      className="bg-custom-light-grey rounded-[40px] p-3 text-white text-xs"
                    >
                      {field.tag_name}
                    </span>
                  ))}
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2 text-[18px] ">Prizes</p>
              <p className="text-sm"> {hackathon.prize}</p>
            </div>
          </div>
          <hr className="mb-10 border-t border-gray-300  " />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleClick}
            className="bg-[#D40C0C] mb-5  text-white px-3 py-2 rounded-md  w-[150px] hover:bg-red-700 "
          >
            Delete
          </button>
        </div>
      </div>
      <DeleteHackModal
        openModal={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </div>
  );
};

export default DeleteHack;
