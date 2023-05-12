import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function EditProfile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <div className="edit-profile-page">
      <h3>{currentUser.email}</h3>
      <button
        type="button"
        onClick={() => {
          navigate("/home");
        }}
      >
        Go back to dashboard
      </button>
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
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
