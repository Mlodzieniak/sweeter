import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation() {
  const navigate = useNavigate();
  const { logout, currentUser, userData } = useAuth();
  const { displayName, avatarURL } = userData;
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="navigation">
      <div className="navbar">
        <button
          type="button"
          onClick={() => {
            navigate("/home");
          }}
        >
          Go back to dashboard
        </button>
        <h3>{currentUser.email}</h3>
        <h3>{displayName}</h3>
        <Avatar src={avatarURL} />

        <button
          type="button"
          onClick={() => {
            navigate("/edit-profile");
          }}
        >
          Edit profile
        </button>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
