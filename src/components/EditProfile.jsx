import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <div className="home">
        <div className="navbar">
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
              navigate("/edit-profile/name");
            }}
          >
            Change name
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/edit-profile/avatar");
            }}
          >
            Upload avatar
          </button>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
