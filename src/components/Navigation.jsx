import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { useAuth } from "../contexts/AuthContext";
import { ReactComponent as DuckLogo } from "../assets/duck.svg";

export default function Navigation() {
  const navigate = useNavigate();
  const { logout, userData, currentUser } = useAuth();
  const { displayName, avatarURL } = userData;
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="navigation">
      <div className="navbar">
        <button
          type="button"
          className="navbar-button"
          onClick={() => {
            navigate("/home");
          }}
        >
          <DuckLogo className="logo-icon" />
          <span className="button-description">Sweeter</span>
        </button>

        <button
          type="button"
          className="navbar-button followed-button"
          onClick={() => {
            navigate("/followed");
          }}
        >
          <GroupsIcon sx={{ width: 36, height: 36 }} />
          <span className="button-description">Followed</span>
        </button>

        <button
          type="button"
          className="navbar-button"
          onClick={() => {
            navigate(`/user/${currentUser.uid}`);
          }}
        >
          <Avatar src={avatarURL} sx={{ width: 36, height: 36 }} />
          <span className="button-description">{displayName}</span>
        </button>
        <button
          type="button"
          className="navbar-button"
          onClick={() => {
            navigate("/edit-profile");
          }}
        >
          <EditIcon sx={{ width: 36, height: 36 }} />
          <span className="button-description">Edit profile</span>
        </button>
        <button
          type="button"
          className="navbar-button"
          onClick={() => {
            navigate("/about");
          }}
        >
          <ImportContactsIcon sx={{ width: 36, height: 36 }} />
          <span className="button-description">About</span>
        </button>
        <button type="button" className="navbar-button" onClick={handleLogout}>
          <LogoutIcon sx={{ width: 36, height: 36 }} />
          <span className="button-description">Logout</span>
        </button>
      </div>
      <Outlet />
    </div>
  );
}
