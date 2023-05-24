import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { isNameTaken } from "./UpdateUserInfo";

export function validateEmail(email) {
  const pattern = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
  return pattern.test(email);
}

function Signup() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameCheckResult = await isNameTaken(usernameRef.current.value);
    if (usernameRef.current.value.includes(" ")) {
      return setError("Empty spaces are not allowed in name.");
    }
    if (usernameRef.current.value.length < 4) {
      return setError("Username must be atleast 4 characters long");
    }
    if (usernameRef.current.value.length > 15) {
      return setError("Username must be maximum 15 characters long");
    }
    if (!validateEmail(emailRef.current.value)) {
      return setError("Email is not valid");
    }
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }
    if (nameCheckResult) {
      return setError("This username is already taken");
    }
    setLoading(true);

    try {
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
      navigate("/home");
    } catch (registrationError) {
      console.log(registrationError.code);
      if (registrationError.code === "auth/email-already-in-use") {
        setError("Email is already taken");
      }
    }
    return setLoading(false);
  };
  return (
    <div className="signup-page">
      <form action="post" className="register-form" onSubmit={handleSubmit}>
        <h1 className="page-title">Create account</h1>
        <TextField label="Username*" inputRef={usernameRef} />
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
