import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfile from "./profile/UserProfile";
import { getParticipantHackathonSubscriptions } from "../../api/hackathons/hackathons";
import { selectCurrentParticipantDetail } from "../../features/participant/participantSlice";
import { setCurrentSubscriptionDetail } from "../../features/subscription/subscriptionSlice";
import { LinearProgress } from "@mui/material";

const MyHackathons = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const participantDetails = useSelector(selectCurrentParticipantDetail);
  const [subscriptionsPayload, setSubscriptionsPayload] = useState([]);

  const fetchSubscriptions = () => {
    getParticipantHackathonSubscriptions(participantDetails.id)
      .then((res) => {
        if (res.status === 200) {
          setSubscriptionsPayload(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSubscriptions();
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
    <div className="bg-white right-side min-h-screen min-w-full">
      <div className="ml-[280px]">
        <div className="flex justify-between mt-8">
          <h1 className="text-gray-600 font-bold text-[24px]">My Hackathons</h1>
          <div className="mr-10">
            <UserProfile />
          </div>
        </div>
        {loading && <LinearProgress />}
        {!loading && (
          <div className="flex flex-wrap space-x-4 mt-5 ml-4">
            {subscriptionsPayload.length > 0 &&
              subscriptionsPayload.map((field, index) => (
                <div
                  key={index}
                  className="flex rounded-[6px] shadow border border-[#C7C7C7] flex-col  hover:border-custom-blue mb-4 w-[300px] h-[380px] transition-transform transform hover:-translate-y-1"
                >
                  <img
                    className="rounded-t-md w-[300px] h-[200px]"
                    key={index}
                    src={
                      field.hackathon.cover_image_url ||
                      "/assets/no image (1).jpg"
                    }
                    alt={`image ${index + 1}`}
                  />
                  <div className="relative">
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-white p-4 border-[#7C7C7C] border-t rounded-t-[20px]">
                      <p className="mt-2 text-sm ml-4 text-gray-500">
                        {field.hackathon.name}
                      </p>
                      <p className="mt-2 text-sm ml-4 font-bold">
                        {field.hackathon.highlight}
                      </p>
                      <p className="mt-2 text-[12px] ml-4 h-[50px] overflow-hidden  text-gray-500">
                        {field.hackathon.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-[100px]">
                    <button
                      onClick={() => handleViewClick(field)}
                      className="border ml-[22px] mb-5 border-blue-500 rounded-md text-blue-500 hover:bg-custom-blue hover:text-white w-[250px] text-xs mt-4 py-2"
                    >
                      Make a Submission
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHackathons;
