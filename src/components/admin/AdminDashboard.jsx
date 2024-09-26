import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { layers, users } from "../../assets";
import { getPlatformStats } from "../../api/admins/admins";
import AdminLogOut from "./AdminLogOut";
import OrganizersChart from "./charts/OrganisersChart";
import HackathonChart from "./charts/HackathonCharts";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.55),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    getPlatformStats().then((res) => {
      setStats(res.data);
    });
  }, []);
  return (
    <div className="bg-[#F5F5F5] p-8 right-side min-h-screen min-w-full ">
      <div className="ml-60">
        <div className="flex justify-end ">
          <AdminLogOut />
        </div>
        <div className="bg-custom-blue h-[120px] rounded-md mt-3  ">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-white font-bold py-4 pl-5 text-[24px]">
                Dashboard
              </h1>
              <div className="mb-3">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </div>
            </div>
            <img
              src="/assets/unitarblue.png"
              className="h-[120px] mr-[100px] w-[200px]"
            />
          </div>
        </div>
        <div className="flex flex-row gap-[30px]">
          <div className=" rounded-md bg-white shadow-md mt-[30px] w-[700px]">
            <h1 className="text-gray-700 font-semibold text-md mb-5 mt-10 ml-5">
              Top Five Most Participated in Hackathons
            </h1>
            <HackathonChart />
            {/* <div className="ml-5 text-xs mb-5">
              <p>Y-axis: Participants</p>
              <p>X-axis: Hackathons</p>
            </div> */}
          </div>
          <div className="flex flex-col">
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <img
                  src={users}
                  className="mt-5  ml-5 bg-[#CEEBF7] p-3 rounded"
                />
                <p className=" mt-4">Total Participants</p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold">
                {stats.participant}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <img
                  src={users}
                  className="mt-5  ml-5 bg-[#CEEBF7] p-3 rounded"
                />
                <p className=" mt-4">Total Organisers</p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold">
                {stats.organizer}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <img
                  src={layers}
                  className="mt-5  ml-5 bg-[#CEEBF7] p-3 rounded"
                />
                <p className=" mt-4">Total Hackathons</p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold">
                {stats.hackathon}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-white shadow-md mt-10 py-2">
          <h1 className="text-gray-700 font-semibold text-md mb-5 mt-10 ml-5">
            The Organizations with the most submitted hackathons
          </h1>
          <OrganizersChart />
          {/* <div className="ml-5 text-xs mb-5">
            <p>Y-axis: Hackathons</p>
            <p>X-axis: Organizations</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
