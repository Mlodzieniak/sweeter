import { getDocs, query, where, collection } from "firebase/firestore";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { Avatar } from "@mui/material";
import { db } from "../firebase";
import Events from "./Events";

export async function loader({ params }) {
  let user = null;
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("displayName", "==", params.userId));
  const userSnapshot = await getDocs(usersQuery);
  userSnapshot.forEach((result) => {
    user = result.data();
  });
  return { user };
}

export default function User() {
  const { user } = useLoaderData();
  const { displayName, avatarURL, uid } = user;
  return (
    <div className="dashboard">
      <div className="navbar">
        <h3>{displayName}</h3>
        <Avatar src={avatarURL} />
      </div>
      <div className="content">
        <Events userId={uid} />
      </div>
      <div className="status">LIST</div>
    </div>
  );
}
