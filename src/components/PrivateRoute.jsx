// import React from "react";
// import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  //   const navigate = useNavigate();
  //   const redirect = () => navigate("/login");
  return currentUser ? children : <Login />;
}

export default PrivateRoute;
