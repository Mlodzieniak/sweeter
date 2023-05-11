import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await resetPassword(emailRef.current.value);
      setMessage("Check your email to reset password");
    } catch (loginError) {
      setError("Failed to reset password.");
      console.log(loginError);
    }

    setLoading(false);
  };
  return (
    <div className="signup-page">
      <form action="post" className="register-form">
        <label htmlFor="email">
          Email:
          <input type="text" name="email" id="email" ref={emailRef} />
        </label>

        <button type="button" onClick={handleSubmit} disabled={loading}>
          Recover password
        </button>
        <div>
          <button type="button" onClick={() => navigate("/login")}>
            Go back to login page
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to dashboard
        </button>
        {message ? <div className="message">{message}</div> : null}

        {error ? <div className="error">{error}</div> : null}
      </form>
    </div>
  );
}
