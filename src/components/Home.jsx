import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import CreatePost from "./CreatePost";
import EventsList from "./EventsList";

function Home() {
  const navigate = useNavigate();
  const { logout, currentUser, userData } = useAuth();
  const { displayName, avatarURL } = userData;
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="navbar">
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
      <div className="content">
        <CreatePost />
        <EventsList />
      </div>
      <div className="status">Followed users</div>
    </div>
  );
}

export default Home;
