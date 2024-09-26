import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestValidationCode } from "../../../api/hackathons/hackathons";
import { selectCurrentHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import { selectLoggedInUserRef } from "../../../features/user/userSlice";
const EmailValidation = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const navigate = useNavigate();
  const hackathonDetails = useSelector(selectCurrentHackathonDetail);
  const user_ref = useSelector(selectLoggedInUserRef);
  const handleSubmit = (e) => {
    e.preventDefault();
    requestValidationCode(user_ref, hackathonDetails.id, email)
      .then((res) => {
        if (res.status === 200) {
          navigate("/organizer/hackathons/create/validate");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.error);
      });
  };
  return (
    <div className="bg-white min-h-screen right-side">
      <div className="ml-80">
        <h1 className=" text-gray-600 font-bold  text-[24px] mb-2 mt-10">
          Email Validation
        </h1>{" "}
        <p className="text-xs text-gray-500 flex flex-row mb-6">
          <span>Hackathons</span>
          <img
            src="/assets/chevron-right-solid.svg"
            className="w-2 h-2 mt-[4px] m-1"
            alt="chevron"
          />
          <span>Create a hackathon</span>
          <img
            src="/assets/chevron-right-solid.svg"
            className="w-2 h-2 mt-[4px] m-1"
            alt="chevron"
          />
          <span>Email validation</span>
        </p>
        {errorMessage && (
          <div className="text-red-500 text-xs">{errorMessage}</div>
        )}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-xs mt-5 mb-3">Enter email</label>
          <input
            type="text"
            placeholder="Enter email"
            className="border border-gray-400 rounded-md px-3 py-2 w-[300px]
            focus:outline-none focus:border-custom-blue"
            value={email}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="py-2 px-2 bg-custom-blue rounded-md text-white  w-[150px] mt-10"
          >
            Send Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailValidation;
