import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUserRef } from "../../../features/user/userSlice";
import { createTag } from "../../../api/hackathons/hackathons";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";
import AdminLogOut from "../AdminLogOut";

const CreateCategory = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    category: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { category } = values;
  const created_by = useSelector(selectLoggedInUserRef);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createTag(category, created_by).then((res) => {
      if (res.status === 201) {
        setModalOpen(true);
        setTimeout(() => {
          closeModal();
          navigate("/admin/categories");
        }, 3000);
      } else {
        setErrorMessage("Error Creating Category");
      }
    });
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white right-side">
      <div className=" flex items-center justify-center mt-10  ">
        <div className="ml-60">
          <div className="flex  mb-10 ml-[800px]">
            <AdminLogOut />
          </div>
          <div className="w-[600px] h-[400px] rounded-lg shadow-md  items-center border border-gray-100">
            <h1 className=" text-[20px] text-center font-bold mt-6 text-custom-blue">
              Create a new hackathon category
            </h1>
            {errorMessage && (
              <p className="text-red-500 text-xs">{{ errorMessage }}</p>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="m-4">
                <label className="block text-sm m-2">Category Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-grey-600 rounded text-xs"
                  placeholder="Financial Inclusion"
                  value={category}
                  onChange={handleChange("category")}
                />
                <button
                  type="submit"
                  className="w-full bg-custom-blue text-white py-2 mt-10 rounded hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue "
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SuccessModal openModal={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default CreateCategory;
