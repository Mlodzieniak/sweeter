import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./Routes";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Home from "./Home";
import ForgotPassword from "./ForgotPassword";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import ChangeDisplayName from "./ChangeDisplayName";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Dashboard />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/password-recovery"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        >
          <Route path="/edit-profile/password" element={<ChangePassword />} />
          <Route path="/edit-profile/email" element={<ChangeEmail />} />
          <Route path="/edit-profile/name" element={<ChangeDisplayName />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
