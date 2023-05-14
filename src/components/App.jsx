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
import UploadAvatar from "./UploadAvatar";
import ErrorPage from "./ErrorPage";
import Navigation from "./Navigation";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          loader={fetchAllEvents}
          errorElement={<ErrorPage />}
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
          element={
            <PrivateRoute>
              <Navigation />
            </PrivateRoute>
          }
        >
          <Route path="/home" loader={fetchAllEvents} element={<Home />} />
          <Route
            path="/user/:userId"
            loader={userLoader}
            element={<User />}
            errorElement={<ErrorPage />}
          >
            <Route errorElement={<ErrorPage />}>
              <Route index loader={userLoader} element={<EventsList />} />
              <Route
                path="/user/:userId/:eventId"
                loader={eventLoader}
                element={<EventFull />}
              />
            </Route>
          </Route>
          <Route
            path="/edit-profile"
            errorElement={<ErrorPage />}
            element={<EditProfile />}
          >
            <Route errorElement={<ErrorPage />}>
              <Route
                path="/edit-profile/password"
                element={<ChangePassword />}
              />
              <Route path="/edit-profile/email" element={<ChangeEmail />} />
              <Route
                path="/edit-profile/name"
                element={<ChangeDisplayName />}
              />
              <Route path="/edit-profile/avatar" element={<UploadAvatar />} />{" "}
            </Route>
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}
export default App;
