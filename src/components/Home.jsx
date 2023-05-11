import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CreatePost from "./CreatePost";

function Home() {
  const navigate = useNavigate();
  const { logout, currentUser, userData } = useAuth();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div className="dashboard">
      <div className="navbar">
        <h3>{currentUser.email}</h3>
        <h3>{userData.displayName}</h3>

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
      </div>
      <div className="status">LIST</div>
    </div>
  );
}

export default Home;
