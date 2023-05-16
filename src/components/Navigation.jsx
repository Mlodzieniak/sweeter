import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
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
            navigate("/about");
          }}
        >
          <DuckLogo className="icon" />
          <span className="button-description">Sweeter</span>
        </button>
        <button
          type="button"
          className="navbar-button"
          onClick={() => {
            navigate("/home");
          }}
        >
          <HomeIcon sx={{ width: 36, height: 36 }} />
          <span className="button-description">Home</span>
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
        <button type="button" className="navbar-button" onClick={handleLogout}>
          <LogoutIcon sx={{ width: 36, height: 36 }} />
          <span className="button-description">Logout</span>
        </button>
      </div>
      <Outlet />
    </div>
  );
}
