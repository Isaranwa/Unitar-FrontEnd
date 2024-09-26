import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentSubscriptionDetail } from "../../features/subscription/subscriptionSlice";

const ViewDetailsPage = ({ openModal }) => {
  const subscription = useSelector(selectCurrentSubscriptionDetail);

  return (
    <div className="bg-white border shadow-lg mt-10 p-8 rounded-md">
      {subscription && (
        <div className="flex gap-[80px] mt-10">
          <img
            src={
              subscription.image
                ? subscription.image
                : "/assets/no image (1).jpg"
            }
            alt=""
            className="w-[400px] rounded-[10px] h-[350px]"
          />
          <div>
            <p className="font-semibold ">{subscription.title}</p>
            <p className="mt-6 text-xs w-[400px]">{subscription.desc}</p>{" "}
            <div className="flex flex-col gap-[10px] mt-10">
              <div>
                <p className="text-xs font-bold">Demo Presentation Link</p>
                <a
                  href={subscription.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs  text-custom-blue hover:underline"
                >
                  {subscription.demo_link}
                </a>
              </div>
              <div>
                <p className="text-xs font-bold mt-2">Blog Link</p>
                <a
                  href={subscription.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs  text-custom-blue hover:underline"
                >
                  {subscription.blog}
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] mt-5">
              <div>
                <p className="text-xs font-bold mt-2">Live Link</p>
                <a
                  href={subscription.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-custom-blue hover:underline"
                >
                  {subscription.live_url}
                </a>
              </div>
              <div>
                <p className="text-xs font-bold mt-2">GitHub Link</p>
                <a
                  href={subscription.gh_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-custom-blue hover:underline"
                >
                  {subscription.gh_link}
                </a>
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <p className="text-xs font-bold">Submitted by</p>
              <p className="text-xs text-[#6E7079] mt-2">
                {subscription.participant.first_name}{" "}
                {subscription.participant.last_name}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-custom-blue rounded-md w-[100px] text-white text-xs px-3 py-2 hover:bg-white hover:text-custom-blue hover:border hover:border-custom-blue"
                onClick={() => openModal()}
              >
                Grade Hackathon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetailsPage;
