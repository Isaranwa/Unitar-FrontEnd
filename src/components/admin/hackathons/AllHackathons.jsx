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
const AllHackathons = () => {
  const navigate = useNavigate();
  const [hackathonsPayload, setHackathonsPayload] = useState([]);
  const fetchHackathons = () => {
    getAllHackathons().then((res) => {
      if (res.status === 200) {
        setHackathonsPayload(res.data);
      }
    });
  };
  useEffect(() => {
    fetchHackathons();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "CREATION STAGE":
        return "rgba(8, 155, 217, 0.80)";
      case "ACTIVE":
        return "rgba(0, 128, 0, 0.80)";
      case "PENDING VALIDATION":
        return "rgba(255, 165, 0, 0.80)";
      case "DEACTIVATED":
        return "rgba(255, 0, 0, 0.80)";
      default:
        return "rgba(169, 169, 169, 0.5)";
    }
  };

  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "location", headerName: "Location", width: 130 },
    { field: "highlight", headerName: "Highlight", width: 160 },
    { field: "prize", headerName: "Prizes", width: 160 },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => (
        <Chip
          label={params.value}
          style={{
            backgroundColor: getStatusColor(params.value),
            color: "white",
          }}
        />
      ),
    },

    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: () => (
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => navigate("/admin/hackathons/view")}>
              View Hackathon
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/hackathons/activate")}>
              Activate Hackathon
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/hackathons/deactivate")}>
              Deactivate Hackathon
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/hackathons/delete")}>
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

        <div className="flex-grow">
          <CustomDataGrid
            sx={{ mt: 3 }}
            rows={hackathonsPayload}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
};

export default AllHackathons;
