import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserProfile from "./profile/UserProfile";
import { getParticipantHackathonSubscriptions } from "../../api/hackathons/hackathons";
import { selectCurrentParticipantDetail } from "../../features/participant/participantSlice";
import { setCurrentSubscriptionDetail } from "../../features/subscription/subscriptionSlice";
const MyHackathons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const participantDetails = useSelector(selectCurrentParticipantDetail);
  const [subscriptionsPayload, setSubscriptionsPayload] = useState([]);
  const images = [{ name: "project #1", url: "image1.svg" }];

  const fetchHackathons = () => {
    getParticipantHackathonSubscriptions(participantDetails.id)
      .then((res) => {
        if (res.status === 200) {
          setSubscriptionsPayload(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchHackathons();
  }, []);
  const handleViewClick = (subscriptionDetails) => {
    dispatch(
      setCurrentSubscriptionDetail({
        currentSubscriptionDetail: subscriptionDetails,
      })
    );
    navigate("/participant/hackathons/submit");
  };
  return (
    <div className="bg-white right-side min-h-screen  ">
      <div className=" ml-[280px]">
        <div className="flex justify-between mt-8">
          <h1 className="text-gray-600 font-bold text-[24px]">My Hackathons</h1>
          <div className="mr-10 ">
            <UserProfile />{" "}
          </div>
        </div>
        <div className="flex space-x-4 mt-5 ml-4">
          {subscriptionsPayload > 0 &&
            subscriptionsPayload.map((field, index) => (
              <div
                key={index}
                className="flex flex-col iems-center mb-4 w-[400px] h-[350px]"
              >
                <img
                  className="rounded-md"
                  key={index}
                  src={`/assets/${field.cover_image_url}`}
                  alt={`image ${index + 1}`}
                  width="250"
                  height="200"
                />
                <p className="mt-2 text-sm text-gray-500">{field.name}</p>
                <p className="mt-2 text-sm  font-bold">{field.highlight}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {field.description}
                </p>

                <div className="flex gap-5">
                  <button
                    onClick={() => handleViewClick(field)}
                    className="border border-blue-500 rounded-md text-blue-500 w-[150px] text-xs mt-4 py-1"
                  >
                    Make a Submission
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyHackathons;
