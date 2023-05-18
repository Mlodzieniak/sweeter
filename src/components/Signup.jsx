import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export function validateEmail(email) {
  const pattern = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
  return pattern.test(email);
}
function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(emailRef.current.value)) {
      return setError("Email is not valid");
    }
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match.");
    }
    setLoading(true);

    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/home");
    } catch (registrationError) {
      console.log(`failed to create account${registrationError}`);
    }
    return setLoading(false);
  };
  return (
    <div className="signup-page">
      <form action="post" className="register-form" onSubmit={handleSubmit}>
        <h1 className="page-title">Create account</h1>
        <TextField label="Email*" inputRef={emailRef} />
        <TextField label="Password*" type="password" inputRef={passwordRef} />
        <TextField
          label="Password confirmation*"
          type="password"
          inputRef={passwordConfirmationRef}
        />
        <button type="submit" disabled={loading} className="register-button">
          Register
        </button>
        {error && <Alert severity="error">{error}</Alert>}
      </form>
      <div className="register-nav">
        <div>Already have an account?</div>
        <button type="button" onClick={() => navigate("/login")}>
          Login with existing account
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to dashboard
        </button>
      </div>
    </div>
  );
}

export default Signup;
