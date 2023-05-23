import React, { useRef, useState } from "react";
import { TextField, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function EditProfile() {
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { changePassword } = useAuth();
  const [error, setError] = useState();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match.");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("New Password must be atleast 6 characters long..");
    }
    if (passwordRef.current.value.length > 20) {
      return setError("New Password must be maximum 20 characters long..");
    }
    setLoading(true);
    try {
      await changePassword(passwordRef.current.value);
      setMessage("Password changed!");
    } catch (resetError) {
      console.log(`Failed to change password: ${resetError}`);
      setError(resetError);
    }
    return setLoading(false);
  };
  return (
    <div className="edit-window">
      <form action="post" className="register-form" onSubmit={handleSubmit}>
        <TextField
          label="New password*"
          type="password"
          inputRef={passwordRef}
        />

        <TextField
          label="Confirm new password*"
          type="password"
          inputRef={passwordConfirmationRef}
        />
        <button type="submit" disabled={loading}>
          Change password
        </button>

        {message && <Alert>{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </form>
    </div>
  );
}
