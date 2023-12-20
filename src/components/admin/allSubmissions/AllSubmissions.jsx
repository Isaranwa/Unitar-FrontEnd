import React, { useState, useEffect } from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import { getSubmissions } from "../../../api/admins/admins";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import AdminProfile from "../AdminLogOut";
import { LinearProgress } from "@mui/material";

const AllSubmissions = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [submissionsPayload, setSubmissionsPayload] = useState([]);
  const fetchSubmissions = () => {
    getSubmissions().then((res) => {
      if (res.status === 200) {
        setSubmissionsPayload(res.data);
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const columns = [
    {
      field: "live_url",
      headerName: "Submissions",
      width: 250,
      renderCell: (params) => (
        <a
          href={params.row.live_url}
          target="_blank"
          className="text-custom-blue underline"
          rel="noopener noreferrer"
        >
          {params.row.live_url}
        </a>
      ),
    },
    {
      field: "participantFullName",
      headerName: "Participant",
      width: 250,
      valueGetter: (params) =>
        `${params.row.participant.first_name} ${params.row.participant.last_name}`,
    },
    { field: "title", headerName: "Project Name", width: 320 },
    {
      field: "action",
      headerName: "Actions",
      width: 90,
      renderCell: () => (
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => navigate("/admin/submissions/view")}>
              View Submission
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/submissions/edit")}>
              Edit Submission
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/submissions/delete")}>
              Delete Submission
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
        <h1 className="text-[24px] font-bold text-gray-600">All Submissions</h1>
        {loading && <LinearProgress />}
        {!loading && (
          <CustomDataGrid
            sx={{ mt: 3 }}
            rows={submissionsPayload}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default AllSubmissions;
