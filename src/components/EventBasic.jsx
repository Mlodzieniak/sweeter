/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export const formateTimestamp = (postedAt) => {
  const currentTime = Date.now();
  const timeDiff = currentTime - postedAt;
  const milliseconds = timeDiff;
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  }
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
  if (seconds > 0) {
    return `${seconds} seconds ago`;
  }
  return "Just now";
};

// Simple event data to display on EventList
export default function EventBasic({ data, commentsLength }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [menuClasses, setMenuClasses] = useState("hide");
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
  const formattedTimestamp = formateTimestamp(postedAt);
  formateTimestamp(postedAt);

  const deletePost = async (e) => {
    e.stopPropagation();
    await deleteDoc(doc(db, `events/${postId}`));
    const userRef = await getDoc(doc(db, `users/${currentUser.uid}`));
    const userEvents = userRef.data().events;
    const index = userEvents.indexOf(postId);
    if (index !== -1) {
      userEvents.splice(index, 1);
    }

    await updateDoc(doc(db, `users/${currentUser.uid}`), {
      events: [...userEvents],
    });
  };
  const handleRedirect = (path, e) => {
    e.stopPropagation();
    if (currentUser) {
      navigate(path);
    } else {
      navigate(`/login`);
    }
  };
  const showMenu = (e) => {
    e.stopPropagation();
    if (menuClasses === "hide") {
      setMenuClasses("event-dropdown-menu");
    } else {
      setMenuClasses("hide");
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
    <div
      className="event event-button-wrapper"
      onClick={(e) => handleRedirect(`/user/${authorId}/${postId}`, e)}
    >
      <div className="event-top">
        <div className="event-author-wrapper">
          <Avatar src={authorAvatarURL} />
          <button
            className="author-name"
            type="button"
            onClick={(e) => handleRedirect(`/user/${authorId}`, e)}
          >
            <div>{authorDisplayName}</div>
          </button>
          <div className="event-timestamp">{formattedTimestamp}</div>
        </div>
        <button type="button" className="menu-drop-button" onClick={showMenu}>
          <MoreHorizOutlinedIcon />
        </button>
      </div>
      <div className={menuClasses}>
        {isAuthor && (
          <button type="button" className="delete-button" onClick={deletePost}>
            Delete
          </button>
        )}
        {!isEventPageLoaded && (
          <button
            type="button"
            className=""
            onClick={(e) => handleRedirect(`/user/${authorId}/${postId}`, e)}
          >
            Comments
          </button>
        )}
        <button type="button" onClick={showMenu}>
          Close
        </button>
      </div>
      <div className="event-text">{text}</div>
      {/* depending on location of rendering different variable is chosen,
        commentsLength is provided from fetched event data,
        commentsSize is array.length of comments array */}
      {imageURL && <img src={imageURL} alt="#" className="event-image" />}
      <div className="event-attribute">
        <ModeCommentOutlinedIcon />
        {isEventPageLoaded ? commentsLength : commentsSize}
      </div>
    </div>
  );
}
