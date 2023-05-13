import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

// Simple event data to display on EventList
export default function EventBasic({ data }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const { currentUser } = useAuth();
  const {
    authorDisplayName,
    authorAvatarURL,
    authorId,
    postedAt,
    text,
    imageURL,
    id: postId,
  } = data;
  const navigate = useNavigate();
  const date = postedAt.toDate(); // Convert timestamp to Date object
  const formattedDate = date.toLocaleDateString("en-GB"); // Format date as dd/mm/yyyy
  const formattedTime = date.toLocaleTimeString("en-US", { hour12: false }); // Format time as 24-hour format
  const formattedTimestamp = `${formattedDate} ${formattedTime}`;

  const deletePost = async () => {
    await deleteDoc(doc(db, `events/${postId}`));
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
    <div>
      <button
        type="button"
        className="event"
        onClick={() => {
          navigate(`/user/${authorDisplayName}/${postId}`);
        }}
      >
        Go to event
      </button>
      <Avatar src={authorAvatarURL} />
      {isAuthor ? (
        <button type="button" onClick={deletePost}>
          Delete post
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => {
          navigate(`/user/${authorDisplayName}`);
        }}
      >
        <div className="author">{authorDisplayName}</div>
      </button>
      <div className="post-time">{formattedTimestamp}</div>
      <div className="post-text">{text}</div>
      {imageURL ? <img src={imageURL} alt="#" /> : null}
    </div>
  );
}
