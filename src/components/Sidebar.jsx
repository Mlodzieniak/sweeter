import React from "react";
import FollowsList from "./FollowsList";
import NewUsersList from "./NewUsersList";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { currentUser } = useAuth();

  return (
    <div className="sidebar-wrapper">
      {currentUser && <FollowsList />}
      <NewUsersList />
    </div>
  );
}
