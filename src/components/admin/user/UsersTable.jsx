import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../api/admins/admins";
import { Chip } from "@mui/material";
const UsersTable = () => {
  const navigate = useNavigate();
  const [usersPayload, setUsersPayload] = useState([]);
  const fetchUsers = () => {
    getAllUsers().then((res) => {
      if (res.status === 200) {
        setUsersPayload(res.data);
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const customBorder = {
    border: "none",
    borderBottom: "1px solid #0e0e0e",
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "rgba(0, 128, 0, 0.80)";
      case "PENDING":
        return "rgba(255, 165, 0, 0.80)";
      case "DEACTIVATED":
        return "rgba(255, 0, 0, 0.80)";
      default:
        return "rgba(169, 169, 169, 0.5)";
    }
  };
  const columns = [
    {
      field: "username",
      headerName: "Username",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
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
      width: 200,
      renderCell: () => (
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => navigate("/admin/users/activate")}>
              Activate user
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/users/deactivate")}>
              Deactivate user
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/users/verify")}>
              Verify user
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/users/delete")}>
              Delete user
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
        <h1 className="text-[24px] font-bold text-gray-600">Users Table</h1>
        <button
          onClick={() => navigate("/admin/users/create")}
          className="bg-custom-blue w-[150px] rounded-md py-3 px-2 text-white font-semibold mt-5 hover:bg-white hover:text-custom-blue hover:border-custom-blue hover:border mb-4"
        >
          Create User
        </button>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            sx={customBorder}
            rows={usersPayload}
            getCellClassName={getCellClassName}
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

export default UsersTable;
