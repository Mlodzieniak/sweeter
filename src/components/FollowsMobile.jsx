import React from "react";
import FollowsList from "./FollowsList";
import NewUsersList from "./NewUsersList";
import { useAuth } from "../contexts/AuthContext";

export default function FollowsMobile() {
  const { currentUser } = useAuth();

  return (
    <div className="follows-mobile">
      {currentUser && <FollowsList />}
      <NewUsersList />
    </div>
  );
}
