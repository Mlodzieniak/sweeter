import React from "react";
import { useNavigate } from "react-router-dom";
import Events from "./EventsList";

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
    </div>
  );
}

export default Dashboard;
