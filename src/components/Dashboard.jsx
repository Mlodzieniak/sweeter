import React from "react";
import { useNavigate } from "react-router-dom";
import Events from "./EventsList";
import Sidebar from "./Sidebar";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <div className="navbar">
        <button
          type="button"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Register
        </button>
      </div>
      <div className="content">
        <Events />
      </div>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
