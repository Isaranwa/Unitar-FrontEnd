import React, { useState, useEffect } from "react";
import Avatars from "../common/Avatars";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedHackathonDetail } from "../../features/hackathon/hackathonSlice";
import { getAllHackathons } from "../../api/hackathons/hackathons";
import HackathonMedia from "../common/utils/HackathonMedia";

const HackathonsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hackathonsPayload, setHackathonsPayload] = useState([]);

  const fetchHackathons = () => {
    getAllHackathons()
      .then((res) => {
        if (res.status === 200) {
          setHackathonsPayload(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  const handleViewClick = (hackathonDetails) => {
    dispatch(
      setSelectedHackathonDetail({ selectedHackathonDetail: hackathonDetails })
    );
    navigate("/participant/hackathons/detail");
  };

  return (
    <div className="flex flex-wrap space-x-4 mt-5 ml-4">
      {hackathonsPayload.length > 0 &&
        hackathonsPayload.map((field, index) => (
          <div
            key={index}
            className="relative overflow-hidden border border-gray-100 rounded-[20px] shadow-xl mb-4 w-[300px] h-[400px] transition-transform transform hover:-translate-y-1"
          >
            {" "}
            <HackathonMedia
              cover_image_url={field.cover_image_url}
              avatar_url={field.avatar_url}
            />
            <div className="relative">
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-white p-4 rounded-[20px]">
                <p className="text-sm font-bold">{field.title}</p>
                <p className="text-sm text-gray-700">{field.highlight}</p>
                <p className="text-xs text-gray-500  mt-2">
                  {field.description}
                </p>{" "}
              </div>
            </div>
            <div className="flex gap-5 mt-[90px]  ml-[20px] items-center">
              <button
                onClick={() => handleViewClick(field)}
                className="border border-blue-500 rounded-md py-2 hover:bg-custom-blue hover:text-white text-blue-500 w-[120px] text-xs "
              >
                View project
              </button>
              <div className="mb-5">
                <Avatars />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HackathonsPage;
