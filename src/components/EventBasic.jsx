import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

// Simple event data to display on EventList
export default function EventBasic({ data, commentsLength }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEventPageLoaded, setIsEventPageLoaded] = useState(false);
  const { currentUser } = useAuth();
  const {
    authorDisplayName,
    authorAvatarURL,
    authorId,
    postedAt,
    text,
    imageURL,
    commentsSize,
    id: postId,
  } = data;
  const navigate = useNavigate();
  const location = useLocation();
  const date = postedAt.toDate(); // Convert timestamp to Date object
  const formattedDate = date.toLocaleDateString("en-GB"); // Format date as dd/mm/yyyy
  const formattedTime = date.toLocaleTimeString("en-US", { hour12: false }); // Format time as 24-hour format
  const formattedTimestamp = `${formattedDate} ${formattedTime}`;

  const deletePost = async () => {
    await deleteDoc(doc(db, `events/${postId}`));
  };
  const handleRedirect = (path) => {
    if (currentUser) {
      navigate(path);
    } else {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.uid === authorId) {
        return setIsAuthor(true);
      }
      return setIsAuthor(false);
    }
  }, [currentUser]);

  useEffect(() => {
    // loads button only current page is not event page
    if (location.pathname === `/user/${authorId}/${postId}`)
      setIsEventPageLoaded(true);
  }, [data]);

  return (
    <div className="event">
      {!isEventPageLoaded && (
        <button
          type="button"
          className="event"
          onClick={() => handleRedirect(`/user/${authorId}/${postId}`)}
        >
          Go to event
        </button>
      )}

      <Avatar src={authorAvatarURL} />
      {isAuthor ? (
        <button type="button" onClick={deletePost}>
          Delete post
        </button>
      ) : null}
      <button type="button" onClick={() => handleRedirect(`/user/${authorId}`)}>
        <div className="author">{authorDisplayName}</div>
      </button>
      <div className="post-time">{formattedTimestamp}</div>
      <div className="post-text">{text}</div>
      {/* depending on location of rendering different variable is chosen, 
      commentsLength is provided from fetched event data,
      commentsSize is array.length of comments array */}
      <div className="comments-size">
        Comments: {isEventPageLoaded ? commentsLength : commentsSize}
      </div>
      {imageURL ? <img src={imageURL} alt="#" /> : null}
    </div>
  );
}
