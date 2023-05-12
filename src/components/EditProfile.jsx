import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import ChangePassword from "./ChangePassword";

export default function EditProfile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <div className="edit-profile-page">
      <h3>{currentUser.email}</h3>
      <div className="navbar">
        <button
          type="button"
          onClick={() => {
            navigate("/edit-profile/change-password");
          }}
        >
          Change password
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/edit-profile/change-email");
          }}
        >
          Change email
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/edit-profile/change-name");
          }}
        >
          Change name
        </button>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
