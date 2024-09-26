import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { getSubmissions } from "../../../api/admins/admins";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import AdminProfile from "../AdminLogOut";
import { LinearProgress } from "@mui/material";
import { setCurrentSubscriptionDetail } from "../../../features/subscription/subscriptionSlice";
const AllSubmissions = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
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
  const handleActionClick = (params) => {
    dispatch(
      setCurrentSubscriptionDetail({ currentSubscriptionDetail: params })
    );
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
      valueGetter: (params) => `${params.row.participant.full_name} `,
    },
    { field: "title", headerName: "Project Name", width: 320 },
    {
      field: "action",
      headerName: "Actions",
      width: 90,
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
            <MenuItem onClick={() => navigate("view")}>
              View Submission
            </MenuItem>
            <MenuItem onClick={() => navigate("edit")}>
              Edit Submission
            </MenuItem>
            <MenuItem onClick={() => navigate("delete")}>
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
