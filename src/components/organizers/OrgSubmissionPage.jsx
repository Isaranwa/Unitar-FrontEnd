import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatars from "../common/Avatars";
import { useNavigate } from "react-router-dom";
import OrgProfile from "./profile/OrgProfile";
import { selectOrganizerCode } from "../../features/organizer/organizerSlice";
import { setSelectedHackathonDetail } from "../../features/hackathon/hackathonSlice";
import { getOrganizerHackathons } from "../../api/hackathons/hackathons";
import HackathonMedia from "../common/utils/HackathonMedia";
const OrgSubmissionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hackathonsPayload, setHackathonsPalyload] = useState([]);
  const org_code = useSelector(selectOrganizerCode);
  const fetchHackathons = () => {
    getOrganizerHackathons(org_code)
      .then((res) => {
        if (res.status === 200) {
          setHackathonsPalyload(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleViewClick = (hackathonDetails) => {
    dispatch(
      setSelectedHackathonDetail({ selectedHackathonDetail: hackathonDetails })
    );
    navigate("details");
  };
  useEffect(() => {
    fetchHackathons();
  }, []);
  return (
    <div className="bg-white p-8 right-side min-h-screen ">
      <div className="ml-60">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px] mb-10 ">
            Submissions
          </h1>
          <OrgProfile />
        </div>
        <p className="text-gray-600 text-sm font-semibold">Our Hackathons</p>
        <div className="flex flex-wrap space-x-4 mt-5 ml-4">
          {hackathonsPayload.length > 0 &&
            hackathonsPayload.map((field, index) => (
              <div
                key={index}
                className="relative overflow-hidden border border-gray-100 rounded-[20px] shadow-xl mb-4 w-[300px] h-[400px] transition-transform transform hover:-translate-y-1"
              >
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
                <div className="flex gap-5 mt-[120px] ml-[22px]">
                  <button
                    onClick={() => handleViewClick(field)}
                    className="border border-blue-500 rounded-md text-blue-500 w-[150px] text-xs mt-4 py-1 hover:bg-custom-blue hover:text-white"
                  >
                    View submissions
                  </button>{" "}
                  <Avatars />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrgSubmissionPage;
