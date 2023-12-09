import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { getOrganizers } from "../../../api/admins/admins";
const AllOrganizers = () => {
  const navigate = useNavigate();
  const customBorder = {
    border: "none",
    borderBottom: "1px solid #0e0e0e",
  };
  const [organizersPayload, setOrganizersPayload] = useState([]);
  const fetchOrganizers = () => {
    getOrganizers().then((res) => {
      if (res.status === 200) {
        setOrganizersPayload(res.data);
      }
    });
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);
  const columns = [
    {
      field: "name",
      headerName: "Organization",
      width: 300,
    },
    { field: "industry", headerName: "Industry", width: 300 },
    { field: "location", headerName: "Location", width: 300 },
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
            <MenuItem onClick={() => navigate("/admin/organizers/view")}>
              View Hackathons
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/organizers/create")}>
              Create Hackathon
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/organizers/activate")}>
              Activate Organization
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/organizers/deactivate")}>
              Deactivate Organization
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/organizers/delete")}>
              Delete Organization
            </MenuItem>
          </Menu>
        </Dropdown>
      ),
    },
  ];
  const getCellClassName = (params) => {
    return `small-text-cell ${params.field}`;
  };

  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full ">
      <div className="ml-60">
        <h1 className="text-[24px] font-bold text-gray-600">All Organizers</h1>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            sx={customBorder}
            getCellClassName={getCellClassName}
            rows={organizersPayload}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
    </div>
  );
};

export default AllOrganizers;
