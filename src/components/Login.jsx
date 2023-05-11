import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
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

        <button type="button" onClick={handleSubmit} disabled={loading}>
          Login
        </button>
        <div>
          Dont you have an account?{" "}
          <button type="button" onClick={() => navigate("/signup")}>
            Register
          </button>
        </div>
        {error ? <div className="error">{error}</div> : null}
      </form>
    </div>
  );
}

export default Signup;
