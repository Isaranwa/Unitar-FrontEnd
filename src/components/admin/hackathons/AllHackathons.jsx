import React, { useState, useEffect } from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { getAllHackathons } from "../../../api/hackathons/hackathons";
import { Chip } from "@mui/material";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import AdminProfile from "../AdminLogOut";
import { useDispatch } from "react-redux";
import { setSelectedHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import { LinearProgress } from "@mui/material";
import { green, red } from "@mui/material/colors";

function getChipProps(params) {
  if (params.value === "ACTIVE") {
    return {
      label: params.value,
      style: {
        width: "200px",
        color: green[600],
        borderColor: green[100],
        backgroundColor: green[100],
        borderRadius: 5,
      },
    };
  } else {
    return {
      label: params.value,
      style: {
        width: "200px",
        color: red[600],
        borderColor: red[100],
        backgroundColor: red[100],
        borderRadius: 5,
      },
    };
  }
}
const AllHackathons = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [hackathonsPayload, setHackathonsPayload] = useState([]);
  const dispatch = useDispatch();
  const fetchHackathons = () => {
    getAllHackathons().then((res) => {
      if (res.status === 200) {
        setHackathonsPayload(res.data);
        setLoading(false);
      }
    });
  };
  const handleActionClick = (params) => {
    dispatch(setSelectedHackathonDetail({ selectedHackathonDetail: params }));
  };
  useEffect(() => {
    fetchHackathons();
  }, []);

  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "location", headerName: "Location", width: 130 },
    { field: "highlight", headerName: "Highlight", width: 180 },
    { field: "prize", headerName: "Prizes", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => (
        <Chip variant="outlined" size="medium" {...getChipProps(params)} />
      ),
    },

    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Dropdown>
          <MenuButton
            onClick={() => handleActionClick(params.row)}
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => navigate("view")}>View Hackathon</MenuItem>
            <MenuItem onClick={() => navigate("delete")}>
              Delete Hackathon
            </MenuItem>
          </Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full ">
      <div className="ml-60">
        <div className="flex justify-end">
          <AdminProfile />
        </div>
        <h1 className="text-[24px] font-bold text-gray-600">All Hackathons</h1>
        {loading && <LinearProgress />}
        {!loading && (
          <div className="flex-grow">
            <CustomDataGrid
              sx={{ mt: 3 }}
              rows={hackathonsPayload}
              columns={columns}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllHackathons;
