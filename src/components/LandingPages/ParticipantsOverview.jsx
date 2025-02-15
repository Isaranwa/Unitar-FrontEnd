import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/unitar-logo.svg";
import {
  align,
  gift,
  layers,
  line1,
  users,
  clip,
  grid,
  thumbs,
  help,
  waves,
  circle,
  need,
} from "../../assets";

const ParticipantsOverview = () => {
  return (
    <>
      <div className=" h-[1077.5px]  w-[246.5px]  overflow-y-auto pb-10 bg-[#fff]">
        <>
          <div className="flex justify-between items-center">
            <img src={logo} />
          </div>{" "}
          <img src={line1} className="mt-3" />
          <NavLink
            to=""
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#089BD9" : "",
            })}
          >
            {" "}
            <div className="mt-6 flex items-center ml-6">
              {" "}
              <img src={align} />
              <p className="ml-4 text-gray-400 text-[14px] ">Overview</p>{" "}
            </div>{" "}
            <div className="mt-6 flex items-center ml-6">
              {" "}
              <img src={layers} />
              <p className="ml-4 text-gray-400 text-[14px]">Hachathons</p>{" "}
            </div>{" "}
            <div className="mt-6 flex items-center ml-6">
              {" "}
              <img src={gift} />
              <p className="ml-4 text-gray-400 text-[14px]">Prizes</p>{" "}
            </div>{" "}
            <div className="mt-6 flex items-center ml-6">
              {" "}
              <img src={users} />
              <p className="ml-4 text-gray-400 text-[14px]">
                Participants
              </p>{" "}
            </div>{" "}
          </NavLink>
          <h3 className="ml-5 text-[#2D3748] font-semi-bold mt-6">GUIDES</h3>
          <NavLink
            to=""
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#089BD9" : "",
            })}
          >
            <div className="mt-6 flex items-center ml-6">
              {" "}
              <img src={clip} />
              <p className="ml-4 text-gray-400 text-[14px] ">Rules</p>{" "}
            </div>{" "}
            <div className="mt-6 flex items-center ml-6">
              {" "}
              <img src={grid} />
              <p className="ml-4 text-gray-400 text-[14px]">Category</p>{" "}
            </div>{" "}
            <div className="mt-6 flex items-center ml-6">
              {" "}
              <img src={thumbs} />
              <p className="ml-4 text-gray-400 text-[14px]"> Judges</p>{" "}
            </div>{" "}
            <div className="mt-6 flex items-center ml-6">
              {" "}
              <img src={help} />
              <p className="ml-4 text-gray-400 text-[14px]">FAQs</p>{" "}
            </div>{" "}
          </NavLink>
          <div className="bg-[#089BD9] p-[5px] mt-4  ml-3 w-[220.5px] h-[169.5px] rounded-md ">
            {" "}
            {/* <img src={waves} className="w-[100px]  " /> */}{" "}
            <img src={circle} className=" bg-white rounded-full  p-2 ml-3 " />{" "}
            <div className="text-white ml-3 ">
              <p className=" font-semibold ">Need Help ?</p>
              <p className="mb-3">Please check our docs</p>
              <button className=" bg-[white] text-black w-[186px] h-[35px] rounded-[12px] ">
                Documentation
              </button>
            </div>{" "}
          </div>
        </>
      </div>
    </>
  );
};

export default ParticipantsOverview;
