import React, { useState, useEffect } from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { getParticipants } from "../../../api/admins/admins";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import AdminProfile from "../AdminLogOut";
import { useDispatch } from "react-redux";
import { setCurrentParticipantDetail } from "../../../features/participant/participantSlice";
import { LinearProgress } from "@mui/material";
const AllParticipants = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [participantsPayload, setParticipantsPayload] = useState([]);
  const fetchParticipants = () => {
    getParticipants().then((res) => {
      if (res.status === 200) {
        setParticipantsPayload(res.data);
        setLoading(false);
      }
    });
  };
  const handleActionClick = (params) => {
    dispatch(setCurrentParticipantDetail({ currentParticipantDetail: params }));
  };

  useEffect(() => {
    fetchParticipants();
  }, []);
  const columns = [
    {
      field: "full_name",
      headerName: "Full Name",
      width: 150,
    },
    { field: "email", headerName: "Email", width: 150 },
    { field: "city", headerName: "City", width: 160 },
    { field: "gender", headerName: "Gender", width: 160 },
    { field: "date_of_birth", headerName: "DOB", width: 160 },
    {
      field: "action",
      headerName: "Actions",
      width: 110,
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
            <MenuItem onClick={() => navigate("/admin/participants/detail")}>
              View participant
            </MenuItem>

            <MenuItem onClick={() => navigate("/admin/participants/delete")}>
              Delete participant
            </MenuItem>
          </Menu>
        </Dropdown>
      ),
    },
  ];
  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full ">
      <div className="ml-60">
        {" "}
        <div className="flex justify-end">
          <AdminProfile />
        </div>
        <h1 className="text-[24px] font-bold text-gray-600">
          All Participants
        </h1>
        {loading && <LinearProgress />}
        {!loading && (
          <CustomDataGrid
            sx={{ mt: 3 }}
            rows={participantsPayload}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default AllParticipants;
