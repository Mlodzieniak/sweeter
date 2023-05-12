import { getDoc, doc } from "firebase/firestore";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { Avatar } from "@mui/material";
import { db } from "../firebase";
import Events from "./Events";

export async function loader({ params }) {
  const user = await getDoc(doc(db, `users/${params.userId}`));
  return { user };
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
        <Events />
      </div>
      <div className="status">LIST</div>
    </div>
  );
}
