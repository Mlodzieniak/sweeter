import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { updateParentEvent } from "./CreateComment";
import { formateTimestamp } from "./EventBasic";

// Simple event data to display on EventList
export default function Comment({ data }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [menuClasses, setMenuClasses] = useState("hide");

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

  // const date = postedAt.toDate(); // Convert timestamp to Date object
  // const formattedDate = date.toLocaleDateString("en-GB"); // Format date as dd/mm/yyyy
  // const formattedTime = date.toLocaleTimeString("en-US", { hour12: false }); // Format time as 24-hour format
  // const formattedTimestamp = `${formattedDate} ${formattedTime}`;
  const formattedTimestamp = formateTimestamp(postedAt);

  const showMenu = () => {
    if (menuClasses === "hide") {
      setMenuClasses("event-dropdown-menu");
    } else {
      setMenuClasses("hide");
    }
  };

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
    <div className="event">
      <div className="event-top">
        <div className="event-author-wrapper">
          <Avatar src={authorAvatarURL} />
          <button
            type="button"
            className="author-name"
            onClick={() => {
              navigate(`/user/${authorId}`);
            }}
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
          <button
            type="button"
            className="delete-button"
            onClick={deleteComment}
          >
            Delete
          </button>
        )}
        <button type="button" onClick={showMenu}>
          Close
        </button>
      </div>

      <div className="event-text">{text}</div>
    </div>
  );
}
