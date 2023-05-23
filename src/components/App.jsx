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
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import User, { loader as userLoader } from "./User";
import EventFull, { loader as eventLoader } from "./EventFull";
import ErrorPage from "./ErrorPage";
import Navigation from "./Navigation";
import UserEventsList from "./UserEventsList";
import About from "./About";
import UpdateUserInfo from "./UpdateUserInfo";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          errorElement={<ErrorPage />}
          element={
            <PublicRoute>
              <Dashboard />
            </PublicRoute>
          }
        />
        <Route path="/about" element={<About />} />
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
          element={
            <PrivateRoute>
              <Navigation />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route
            path="/user/:userId"
            loader={userLoader}
            element={<User />}
            errorElement={<ErrorPage />}
          >
            <Route errorElement={<ErrorPage />}>
              <Route index loader={userLoader} element={<UserEventsList />} />
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
              <Route path="/edit-profile/info" element={<UpdateUserInfo />} />
            </Route>
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}
export default App;
