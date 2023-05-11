import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function EditProfile() {
  //   const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { changePassword } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match.");
    }
    setLoading(true);

    try {
      //   await signup(emailRef.current.value, passwordRef.current.value);
      await changePassword(passwordRef.current.value);
    } catch (resetError) {
      console.log(`Failed to change password: ${resetError}`);
    }
    return setLoading(false);
  };
  return (
    <div className="signup-page">
      <form action="post" className="register-form">
        {/* <label htmlFor="password">
          Old password:
          <input
            type="password"
            name="password"
            id="oldPassword"
            ref={oldPasswordRef}
            required
          />
        </label> */}
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
        <button type="button" onClick={handleSubmit} disabled={loading}>
          Change password
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/home");
          }}
        >
          Go back to dashboard
        </button>
        {error ? <div className="error">{error}</div> : null}
      </form>
    </div>
  );
}
