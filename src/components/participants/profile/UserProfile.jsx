import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectLoggedInUserRef } from "../../../features/user/userSlice";
import { setCurrentParticipantDetail } from "../../../features/participant/participantSlice";
import { store } from "../../../store/store";
import { fetchParticipantProfile } from "../../../api/accounts/accounts";
import ProfilePrompt from "../../organizers/modals/ProfilePrompt";

const UserProfile = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openProfilePrompt, setopenProfilePrompt] = useState(false);
  const [partProfile, setPartProfile] = useState("");
  const openProfileMenu = () => setAnchorElNav(true);
  const closeProfileMenu = () => setAnchorElNav(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const part_ref = useSelector(selectLoggedInUserRef);
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
    fetchParticipantProfile(part_ref)
      .then((res) => {
        if (res.status === 200) {
          setPartProfile(res.data);
          dispatch(
            setCurrentParticipantDetail({ currentParticipantDetail: res.data })
          );
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
    <div className="relative inline-block">
      <ProfilePrompt openModal={openProfilePrompt} handleClose={closeModal} />
      <div className="flex items-center border transition-transform transform hover:-translate-y-1 shadow-md p-1 border-custom-grey rounded-lg space-x-2 cursor-pointer">
        {partProfile !== "" ? (
          <div
            className="flex items-center gap-5"
            onClick={() => openProfileMenu()}
          >
            <Avatar
              alt="Profile pic"
              src={partProfile.profile_image_url}
              sx={{ width: "24px", height: "24px" }}
            />
            <span className="text-xs">{partProfile.full_name}</span>
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
          <MenuItem onClick={() => navigate("/participant/profile")}>
            Profile
          </MenuItem>
          {/* <MenuItem>Settings</MenuItem> */}
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default UserProfile;
