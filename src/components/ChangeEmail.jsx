import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { validateEmail } from "./Signup";

export default function EditProfile() {
  const emailRef = useRef();
  const [error, setError] = useState();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { changeEmail } = useAuth();

  const handleSubmit = async () => {
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
    <div className="signup-page">
      <form action="post" className="register-form">
        <label htmlFor="email">
          New email:
          <input
            type="email"
            name="email"
            id="new-email"
            ref={emailRef}
            required
          />
        </label>

        <button type="button" onClick={handleSubmit} disabled={loading}>
          Change email
        </button>
        {message ? <div className="messages">{message}</div> : null}
        {error ? <div className="error">{error}</div> : null}
      </form>
    </div>
  );
}
