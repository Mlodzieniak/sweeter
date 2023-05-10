import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <div className="navbar">navbar</div>
      <div className="content">XD</div>
      <div className="status">
        <button
          type="button"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login In
        </button>
        <div>/</div>
        <button
          type="button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
