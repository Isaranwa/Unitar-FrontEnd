import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import UserProfile from "../../participants/profile/UserProfile";
import { submitHackathonResponse } from "../../../api/hackathons/hackathons";
import { selectCurrentSubscriptionDetail } from "../../../features/subscription/subscriptionSlice";
import SubmitModal from "./SubmitModal";
const SubmitHackDetails = () => {
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    image: "",
    gh_link: "",
    demo_link: "",
    live_url: "",
    blog: "",
  });
  const subscription = useSelector(selectCurrentSubscriptionDetail);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHackathonResponse(subscription.id, formData).then((res) => {
      if (res.status === 200) {
        setSubmitModalOpen(true);
        setTimeout(() => {
          setSubmitModalOpen(false);
          navigate(-1);
        }, 2000);
      }
    });
  };
  useEffect(() => {
    setFormData(subscription);
  }, []);

  const handleModalClose = () => {
    setSubmitModalOpen(false);
  };

  return (
    <div className="ml-[260px]">
      <div className="flex justify-between">
        <h1 className="mt-5 text-gray-600 font-bold  text-[24px]">
          Hackathons
        </h1>
        <UserProfile />
      </div>
      <p className="text-xs text-gray-500 flex mb-10 flex-row">
        <span>Hackathons</span>
        <img
          src="/assets/chevron-right-solid.svg"
          className="w-2 h-2 mt-[4px] m-1"
          alt="chevron"
        />
        <span>Build4SDGs</span>
        <img
          src="/assets/chevron-right-solid.svg"
          className="w-2 h-2 mt-[4px] m-1"
          alt="chevron"
        />
        <span>Submit a project</span>
      </p>
      <h3 className="text-sm font-semibold mb-3 text-[15px]">
        Submit a project
      </h3>
      <form className="flex gap-[100px]" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mt-5 mb-2 text-xs" name="projectName">
            Project title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-[400px] px-3 py-2 border border-gray-400 rounded text-xs
              focus:outline-none focus:border-custom-blue "
            placeholder=""
          />
          <span className="text-xs text-gray-500 mt-2">
            Do not exceed 20 characters writing the project name
          </span>

          <label className="mt-5 mb-2 text-xs" name="projectDescription">
            Project description
          </label>
          <TextField
            id="outlined-multiline-static"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            label=""
            multiline
            rows={4}
            defaultValue=""
          />

          <label className="mt-5 mb-2 text-xs" name="projectImage">
            Project image url
          </label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-[400px] px-3 py-2 border border-gray-400 rounded text-xs
              focus:outline-none focus:border-custom-blue "
            placeholder=""
          />
        </div>
        <div className="flex-col flex">
          <div className="flex flex-col">
            <label className="mt-5 mb-2 text-xs">Project link</label>
            <input
              type="text"
              name="gh_link"
              value={formData.gh_link}
              onChange={handleChange}
              className="w-[300px] px-3 py-2 border border-grey-600 rounded text-xs
        focus:outline-none focus:border-custom-blue "
              placeholder=""
            />
            <span className="text-gray-400 text-xs mt-2">Must be a URL</span>

            <label className="mt-5 mb-2 text-xs">
              Project Demo Presentation link
            </label>
            <input
              type="text"
              name="demo_link"
              value={formData.demo_link}
              onChange={handleChange}
              className="w-[300px] px-3 py-2 border border-grey-600 rounded text-xs
        focus:outline-none focus:border-custom-blue "
              placeholder=""
            />

            <label className="mt-5 mb-2 text-xs">Project live link</label>
            <input
              type="text"
              name="live_url"
              value={formData.live_url}
              onChange={handleChange}
              className="w-[300px] px-3 py-2 border border-grey-600 rounded text-xs
        focus:outline-none focus:border-custom-blue"
              placeholder=""
            />

            <label className="mt-5 mb-2 text-xs">
              Project Blog link(optional)
            </label>
            <input
              type="text"
              name="blog"
              value={formData.blog}
              onChange={handleChange}
              className="w-[300px] px-3 py-2 border border-grey-600 rounded text-xs
        focus:outline-none focus:border-custom-blue"
              placeholder=""
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white mr-10 text-xs font-semibold bg-custom-blue  rounded-md p-2 w-[150px] mt-[20px]"
              >
                Submit project
              </button>
            </div>
          </div>
        </div>
      </form>
      <SubmitModal
        handleClose={handleModalClose}
        openModal={isSubmitModalOpen}
      />
    </div>
  );
};

export default SubmitHackDetails;
