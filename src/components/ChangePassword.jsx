import React, { useRef, useState } from "react";
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
    <div className="signup-page">
      <form action="post" className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="password">
          New password:
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            required
          />
        </label>
        <label htmlFor="passwordConfirmation">
          Confirm new password:
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            ref={passwordConfirmationRef}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          Change password
        </button>

        {message ? <div className="messages">{message}</div> : null}
        {error ? <div className="error">{error}</div> : null}
      </form>
    </div>
  );
}
