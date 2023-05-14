import { getDocs, query, where, collection } from "firebase/firestore";
import React from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import { Avatar } from "@mui/material";
import { db } from "../firebase";

export async function loader({ params }) {
  let user = null;
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("displayName", "==", params.userId));
  const userSnapshot = await getDocs(usersQuery);
  userSnapshot.forEach((result) => {
    user = result.data();
  });
  const loadedEvents = [];
  const eventsRef = collection(db, "events");
  const eventsQuery = query(eventsRef, where("authorId", "==", user.uid));
  const snapshot = await getDocs(eventsQuery);
  snapshot.forEach((e) => {
    loadedEvents.push({ ...e.data(), id: e.id });
  });
  // sort events by timestamp
  loadedEvents.sort((a, b) => b.postedAt - a.postedAt);
  return { user, loadedEvents };
}

export default function User() {
  const { user } = useLoaderData();
  const { displayName, avatarURL } = user;
  return (
    <div className="dashboard">
      <div className="navbar">
        <h3>{displayName}</h3>
        <Avatar src={avatarURL} />
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="status">LIST</div>
    </div>
  );
}
