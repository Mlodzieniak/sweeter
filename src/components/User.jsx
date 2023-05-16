import {
  // getDocs,
  // query,
  // where,
  // collection,
  getDoc,
  doc,
} from "firebase/firestore";
import React from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import { Avatar } from "@mui/material";
import { db } from "../firebase";

export async function loader({ params }) {
  const userSnapshot = await getDoc(doc(db, `users/${params.userId}`));
  return { user: userSnapshot.data() };
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
