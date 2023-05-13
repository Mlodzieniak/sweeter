import React from "react";
import "../App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
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
import User, { loader as userLoader } from "./User";
import EventsList, { fetchAllEvents } from "./EventsList";
import EventFull, { loader as eventLoader } from "./EventFull";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          loader={fetchAllEvents}
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
          loader={fetchAllEvents}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/user/:userId" loader={userLoader} element={<User />}>
          <Route
            index
            path="/user/:userId/"
            loader={userLoader}
            element={<EventsList />}
          />
          <Route
            path="/user/:userId/:eventId"
            loader={eventLoader}
            element={
              <PrivateRoute>
                <EventFull />
              </PrivateRoute>
            }
          />
        </Route>
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
      </>
    )
  );
  return <RouterProvider router={router} />;
}
export default App;
