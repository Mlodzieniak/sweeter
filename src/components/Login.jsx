import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signin(emailRef.current.value, passwordRef.current.value);
      navigate("/home");
    } catch (loginError) {
      setError("Failed to login.");
      console.log(loginError);
    }

    setLoading(false);
  };
  return (
    <div className="signup-page">
      <form action="post" className="register-form" onSubmit={handleSubmit}>
        <h1 className="page-title">Log in</h1>
        <TextField label="Email*" inputRef={emailRef} />
        <TextField label="Password*" type="password" inputRef={passwordRef} />
        <button type="submit" className="register-button" disabled={loading}>
          Login
        </button>
        {error && <Alert severity="error">{error}</Alert>}
      </form>

      <div className="register-nav">
        Dont you have an account?
        <button type="button" onClick={() => navigate("/signup")}>
          Register new account
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to dashboard
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/password-recovery");
          }}
        >
          Recover password
        </button>
      </div>
    </div>
  );
}

export default Signup;
