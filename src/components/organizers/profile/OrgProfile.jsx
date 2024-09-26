import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectLoggedInUserRef } from "../../../features/user/userSlice";
import {
  setCurrentOrganizerDetail,
  setOrganizerCode,
} from "../../../features/organizer/organizerSlice";
import { store } from "../../../store/store";
import { fetchOrganizerProfile } from "../../../api/accounts/accounts";
import ProfilePrompt from "../modals/ProfilePrompt";
const OrgProfile = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openProfilePrompt, setopenProfilePrompt] = useState(false);
  const [orgProfile, setOrgProfile] = useState("");
  const openProfileMenu = () => setAnchorElNav(true);
  const closeProfileMenu = () => setAnchorElNav(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const org_ref = useSelector(selectLoggedInUserRef);
  const USER_LOGOUT = "USER_LOGOUT";
  const logOut = () => {
    return {
      type: USER_LOGOUT,
    };
  };
  const handleLogOut = () => {
    store.dispatch(logOut());
  };

  const closeModal = () => {
    setopenProfilePrompt(false);
    handleLogOut();
  };
  const fetchProfile = () => {
    fetchOrganizerProfile(org_ref)
      .then((res) => {
        if (res.status === 200) {
          setOrgProfile(res.data);
          dispatch(
            setCurrentOrganizerDetail({ currentOrganizerDetail: res.data })
          );
          dispatch(setOrganizerCode({ organizerCode: res.data.id }));
        }
      })
      .catch((err) => {
        setopenProfilePrompt(true);
      });
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="relative inline-block ">
      <ProfilePrompt openModal={openProfilePrompt} handleClose={closeModal} />
      <div className="flex  border p-1 border-custom-grey rounded-lg space-x-2 shadow-md transition-transform transform hover:-translate-y-1 cursor-pointer">
        {orgProfile !== "" ? (
          <div
            onClick={() => openProfileMenu()}
            className="flex  gap-5 items-center"
          >
            <Avatar
              alt="Profile pic"
              src={orgProfile.profile_image_url}
              sx={{ width: "24px", height: "24px" }}
            />
            <p className="text-xs mr-3">{orgProfile.name}</p>
          </div>
        ) : null}
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={closeProfileMenu}
          sx={{ pt: 4 }}
        >
          <MenuItem onClick={() => navigate("/organizer/profile")}>
            Profile
          </MenuItem>
          {/* <MenuItem>Settings</MenuItem> */}
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default OrgProfile;
