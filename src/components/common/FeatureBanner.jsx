// FeatureBanner.jsx
import React from "react";

const FeatureBanner = ({ icon, heading, text }) => {
  return (
    <div className="ml-20  ">
      <img src={icon} alt="Feature Icon" className="w-15 h-10 " />
      <h4 className="text-white text-lg text-left font-inter font-bold mt-4">
        {heading}
      </h4>
      <p className="text-white w-[314px] text-left mt-2">{text}</p>
    </div>
  );
};

export default FeatureBanner;
