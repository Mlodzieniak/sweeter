import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validateEmail(email) {
    const pattern = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
    return pattern.test(email);
  }

  const handleSubmit = async () => {
    if (!validateEmail(emailRef.current.value)) {
      return setError("Email is not valid");
    }
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match.");
    }
    setLoading(true);

    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (registrationError) {
      console.log(`failed to create account${registrationError}`);
    }
    return setLoading(false);
  };
  return (
    <div className="signup-page">
      <form action="post" className="register-form">
        <label htmlFor="email">
          Email:
          <input type="text" name="email" id="email" ref={emailRef} />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
          />
        </label>
        <label htmlFor="passwordConfirmation">
          Password confirmation:
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            ref={passwordConfirmationRef}
          />
        </label>
        <button type="button" onClick={handleSubmit} disabled={loading}>
          Register
        </button>
        <div>
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
        {error ? <div className="error">{error}</div> : null}
      </form>
    </div>
  );
}

export default Signup;
