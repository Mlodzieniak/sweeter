import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { updateParentEvent } from "./CreateComment";

// Simple event data to display on EventList
export default function Comment({ data }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    authorDisplayName,
    authorAvatarURL,
    authorId,
    postedAt,
    text,
    eventId,
    commentId,
  } = data;
  const date = postedAt.toDate(); // Convert timestamp to Date object
  const formattedDate = date.toLocaleDateString("en-GB"); // Format date as dd/mm/yyyy
  const formattedTime = date.toLocaleTimeString("en-US", { hour12: false }); // Format time as 24-hour format
  const formattedTimestamp = `${formattedDate} ${formattedTime}`;

  const deleteComment = async () => {
    await deleteDoc(doc(db, `comments/${commentId}`));
    await updateParentEvent(eventId, -1);
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.uid === authorId) {
        return setIsAuthor(true);
      }
      return setIsAuthor(false);
    }
  }, [currentUser]);

  return (
    <div className="comment">
      <Avatar src={authorAvatarURL} />
      {isAuthor ? (
        <button type="button" onClick={deleteComment}>
          Delete comment
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => {
          navigate(`/user/${authorId}`);
        }}
      >
        <div className="author">{authorDisplayName}</div>
      </button>
      <div className="post-time">{formattedTimestamp}</div>
      <div className="post-text">{text}</div>
    </div>
  );
}
