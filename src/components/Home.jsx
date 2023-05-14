import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
import CreatePost from "./CreatePost";
import EventsList from "./EventsList";

function Home() {
  // const navigate = useNavigate();
  // const { logout, currentUser, userData } = useAuth();
  // const { displayName, avatarURL } = userData;
  // const handleLogout = async () => {
  //   await logout();
  //   navigate("/");
  // };

  return (
    <div className="dashboard">
      <div className="content">
        <CreatePost />
        <EventsList />
      </div>
      <div className="status">Followed users</div>
    </div>
  );
}

export default Home;
