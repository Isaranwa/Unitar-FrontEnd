import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { axiosApi } from "../../../api";
import { selectLoggedInUserRef } from "../../../features/user/userSlice";

const CreateOrgProfile = () => {
  const org_ref = useSelector(selectLoggedInUserRef);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    industry: "",
    // profile_image: "",
    user_id: org_ref,
  });
  const fileInputRef = useRef(null);
  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPic = reader.result;
        // setFormData((prevData) => ({
        //   ...prevData,
        //   profile_image: newPic,
        // }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosApi.post("/organizers", formData);
      if (res.status === 201) {
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="right-side min-h-screen bg-pattern">
      <form className="ml-80 mt-8" onSubmit={handleSubmit}>
        <h1 className="text-gray-600 text-[24px] font-bold">Profile Details</h1>
        <div className="w-[500px] h-[140px] rounded-md shadow-lg bg-[#f0f6ff] mt-5 mb-5">
          <div className="flex items-center ml-4 justify-between">
            <Avatar
              alt="Profile pic"
              // src={formData.profile_image}
              sx={{
                width: "100px",
                height: "100px",
                marginTop: "20px",
                marginBottom: "50px",
              }}
            />
            <div>
              <label
                className=" mr-5  bg-transparent w-[120px]   text-xs border text-custom-blue border-custom-blue  px-2 py-2 rounded-md cursor-pointer"
                onClick={handleChooseFile}
              >
                Add an Image
                <input type="file" style={{ display: "none" }} />
              </label>
            </div>
          </div>
        </div>
        <h1 className="mb-5 text-gray-600 font-semibold">
          Profile Information here
        </h1>
        <div className="px-10 w-[500px]  h-[400px] rounded-md shadow-lg bg-[#f0f6ff] mt-5 mb-5">
          {" "}
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700 text-xs">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-600 bg-inherit rounded-md focus:outline-none focus:border-custom-blue"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700 text-xs">Indutry</span>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-600 bg-inherit rounded-md focus:outline-none focus:border-custom-blue"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700 text-xs">Location</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-600 bg-inherit rounded-md focus:outline-none focus:border-custom-blue"
              />
            </label>

            <button
              type="submit"
              className="bg-custom-blue text-white p-2 rounded-md hover:bg-blue-500"
            >
              Save Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateOrgProfile;
