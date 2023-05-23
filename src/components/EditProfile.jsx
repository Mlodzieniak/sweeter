import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function EditProfile() {
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <div className="home">
        <div className="content">
          <div className="edit-nav-buttons">
            <button
              type="button"
              onClick={() => {
                navigate("/edit-profile/password");
              }}
            >
              Change password
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/edit-profile/email");
              }}
            >
              Change email
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/edit-profile/info");
              }}
            >
              Update user info
            </button>
          </div>
          <div className="outlet">
            <Outlet />
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
