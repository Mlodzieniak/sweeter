import React, { useRef, useState } from "react";
import { TextField, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { validateEmail } from "./Signup";

export default function EditProfile() {
  const emailRef = useRef();
  const [error, setError] = useState();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { changeEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!validateEmail(emailRef.current.value)) {
      return setError("Invalid email");
    }
    setLoading(true);
    try {
      await changeEmail(emailRef.current.value);
      setMessage("Email changed!");
    } catch (resetError) {
      console.log(`Failed to change email: ${resetError}`);
      setError("Failed to change email");
    }
    return setLoading(false);
  };
  return (
    <div className="edit-window">
      <form action="post" className="register-form" onSubmit={handleSubmit}>
        <TextField label="Email*" inputRef={emailRef} />
        <button type="button" disabled={loading}>
          Change email
        </button>
        {message && <Alert>{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </form>
    </div>
  );
}
