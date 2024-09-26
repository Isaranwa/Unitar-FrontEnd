import React from "react";
import moment from "moment";
import { selectCurrentHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import AdminProfile from "../AdminLogOut";
import { useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookIcon from "@mui/icons-material/Book";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const ViewHackDetail = ({ hackathonId }) => {
  const hackathon = useSelector(selectCurrentHackathonDetail);
  return (
    <div className="bg-[#FAF9F6] p-8  min-h-screen right-side">
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
      <p className="text-xs text-gray-500  flex flex-row mb-10 ml-60">
        <span>Hackathons</span>
        <img
          src="/assets/chevron-right-solid.svg"
          className="w-2 h-2 mt-[4px]"
          alt="chevron"
        />
        <span>{hackathon.title}</span>
      </p>
      <div className="ml-60">
        <h1 className="mb-4 font-semibold text-gray-700">{hackathon.title}</h1>
        <div className="flex flex-row gap-[150px] shadow-lg bg-white p-8  border rounded-md">
          <div className="relative">
            {" "}
            <img
              className="shadow-lg"
              src={
                hackathon.cover_image_url
                  ? hackathon.cover_image_url
                  : "/assets/no image (1).jpg"
              }
              alt=""
              style={{
                borderRadius: "50%",
                marginLeft: "30px",
                width: "350px",
                height: "350px",
                objectFit: "fill",
              }}
            />
          </div>
          <div className="flex flex-col w-[500px] ">
            <div>
              <p className="text-[16px]  font-semibold mt-5 ">Highlights</p>
              <p className="text-xs mt-5">{hackathon.highlight}</p>
            </div>
            <div>
              <p className="text-[16px] font-semibold mt-5">Description</p>
              <p className="text-xs mt-5">{hackathon.description}</p>
            </div>
            <div>
              <p className="text-[16px]  font-semibold mt-5">Deliverables</p>
              <p className="text-xs mt-5">{hackathon.deliverables}</p>
            </div>
            <div>
              <p className=" font-semibold mt-5 text-[16px]">Goals</p>
              <p className="mt-2 text-xs">{hackathon.goals}</p>
            </div>
          </div>
        </div>
        <div className="mt-[80px] ml-[30px]">
          <div className="flex flex-row justify-around">
            <div className="bg-white shadow-lg w-[200px] h-[100px] border rounded-md p-5 flex flex-row gap-10">
              <div className="flex justify-center">
                {" "}
                <LocationOnIcon
                  style={{
                    color: "#089BD9",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </div>
              <div className="flex-col">
                <p className="font-semibold  text-[18px]">Location</p>
                <p className="mt-4 text-sm text-center">{hackathon.location}</p>
              </div>
            </div>
            <div className="bg-white shadow-lg w-[200px] h-[100px] border rounded-md p-5 flex flex-row gap-10">
              <div className="flex justify-center">
                <BookIcon
                  style={{
                    color: "#089BD9",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </div>
              <div className="flex-col">
                <p className="font-semibold  text-[18px]">Status</p>
                <p className="text-green-500 mt-2 text-[10px] py-1 border border-green-500 rounded-[20px] px-3">
                  {hackathon.status}
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg w-[300px] h-[100px] border rounded-md p-5 flex flex-row gap-10">
              <div className="flex justify-center">
                <DateRangeIcon
                  style={{
                    color: "#089BD9",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </div>{" "}
              <div className="flex-col">
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
          </div>
          <div className="flex flex-row ml-[100px] gap-[150px] mb-10 items-center mt-10">
            <div className="bg-white shadow-lg w-[400px] h-[100px] border rounded-md  gap-10 px-5">
              <p className="font-semibold  text-[18px] mb-2 mt-4">Tags</p>
              <div className=" flex gap-5">
                {hackathon.tags &&
                  hackathon.tags.map((field, index) => (
                    <span
                      key={index}
                      className="border border-custom-blue rounded-[40px] py-2 flex px-2 text-custom-blue text-xs"
                    >
                      {field.tag_name}
                    </span>
                  ))}
              </div>
            </div>

            <div className="bg-white shadow-lg w-[300px] h-[100px] border rounded-md p-5 flex flex-row gap-10">
              <div className="flex justify-center">
                <MilitaryTechIcon
                  style={{
                    color: "#089BD9",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </div>
              <div className="flex-col">
                <p className="font-semibold mb-2 text-[18px] ">Prizes</p>
                <p className="text-sm"> {hackathon.prize}</p>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ViewHackDetail;
