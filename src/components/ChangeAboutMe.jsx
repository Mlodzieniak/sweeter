import { doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { TextField, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function ChangeAboutMe() {
  const inputRef = useRef();
  const [error, setError] = useState();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const changeAbout = async (newAbout) => {
    await updateDoc(doc(db, `users/${uid}`), {
      about: newAbout,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError();
    if (inputRef.current.value.length > 100) {
      return setError("Name must be maximum 100 characters long.");
    }

    setLoading(true);
    try {
      await changeAbout(inputRef.current.value);
      setMessage("Updated");
    } catch (resetError) {
      console.log(`Failed to update: ${resetError}`);
      setError("Failed to update");
    }
    return setLoading(false);
  };
  return (
    <div className="signup-page">
      <form action="post" className="register-form" onSubmit={handleSubmit}>
        <TextField label="New name*" inputRef={inputRef} />
        <button type="submit" disabled={loading}>
          Update
        </button>
        {message && <Alert>{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </form>
    </div>
  );
}
