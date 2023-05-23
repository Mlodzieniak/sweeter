import React from "react";
import { useNavigate } from "react-router-dom";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import LoginIcon from "@mui/icons-material/Login";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Events from "./EventsList";
import Sidebar from "./Sidebar";
import { ReactComponent as DuckLogo } from "../assets/duck.svg";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <div className="navbar">
        <button
          type="button"
          className="navbar-button"
          onClick={() => {
            navigate("/");
          }}
        >
          <DuckLogo className="logo-icon" />
          <span className="button-description">Sweeter</span>
        </button>
        <button
          type="button"
          className="navbar-button"
          onClick={() => {
            navigate("/login");
          }}
        >
          <LoginIcon sx={{ width: 36, height: 36 }} />
          <span className="button-description">Login</span>
        </button>
        <button
          type="button"
          className="navbar-button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          <PlaylistAddCheckIcon sx={{ width: 36, height: 36 }} />
          <span className="button-description">Register</span>
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
      </div>

      <div className="content">
        <Events />
      </div>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
