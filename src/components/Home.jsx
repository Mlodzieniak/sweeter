import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    navigate("/");
    logout();
  };
  return (
    <div className="dashboard">
      <div className="navbar">
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
      <div className="content">XD</div>
      <div className="status">LIST</div>
    </div>
  );
}

export default Home;
