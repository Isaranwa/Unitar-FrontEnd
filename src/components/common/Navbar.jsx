import React from "react";
import logo from "../../assets/unitar-logo.svg";
import { useNavigate } from "react-router-dom";
import BasicModal from "./SignUpModal";

const Navbar = ({ openModal }) => {
  const navigate = useNavigate();
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="logo" className="ml-5 w-[200px]" />{" "}
      <div className=" sm:flex hidden justify-end items-center flex-1 gap-10">
        <button
          onClick={() => navigate("/login")}
          className=" btn-login  rounded-[8px]  mr-4  p-2 h-50 text-white text-[18px] transition-transform transform hover:-translate-y-1 "
        >
          Login
        </button>
        <button
          onClick={() => openModal()}
          className="inline-flex rounded-[8px] flex-col items-center justify-center mr-4 gap-10 p-2 h-50 text-white flex-shrink-0 rounded-10 bg-custom-blue transition-transform transform hover:-translate-y-1"
        >
          {" "}
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
