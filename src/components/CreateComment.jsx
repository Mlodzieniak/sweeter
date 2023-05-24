/* eslint-disable no-param-reassign */
import { setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { Alert, Avatar } from "@mui/material";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export const updateParentEvent = async (eventId, value) => {
  // value should be a number +1 or -1 that indicates in which direction to change commentsSize
  const eventRef = doc(db, `events/${eventId}`);
  const eventSnap = await getDoc(eventRef);
  const currentCommentsSize = eventSnap.data().commentsSize || 0;
  const newCommentsSize = currentCommentsSize + value;
  await updateDoc(doc(db, `events/${eventId}`), {
    commentsSize: newCommentsSize,
  });
};

export default function CreateComment({ data: eventData }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { currentUser, userData } = useAuth();
  const { uid } = currentUser;
  const { displayName, avatarURL } = userData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = eventData;
    setError(null);
    setMessage(null);
    const isEmptyOrSpaces = /^\s*$/.test(text);
    if (isEmptyOrSpaces) return setError("You cannot post empty message.");
    if (text.length !== 0) {
      try {
        const postData = {
          authorId: uid,
          authorDisplayName: displayName,
          authorAvatarURL: avatarURL,
          text,
          eventId: id,
          commentId: uuidv4(),
          postedAt: Date.now(),
        };
        await setDoc(doc(db, `comments/${postData.commentId}`), postData);
        updateParentEvent(postData.eventId, 1);
        setText("");
        setMessage("You have replied");
      } catch (newError) {
        setError(newError);
      }
    } else {
      setError("You cannot send empty post.");
    }
  };
  const handleTextareaChange = (event) => {
    setText(event.target.value);
    // adjusting textare height
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    // prevents from sending empty or too long tweet
    setSubmitDisabled(!event.target.value || event.target.value.length > 100);
    if (text !== 0) {
      setError(null);
      setMessage(null);
    }
  };

  return (
    <div className="create-post-wrapper">
      <Avatar src={avatarURL} />
      <form action="post" onSubmit={handleSubmit} className="create-post-form">
        <div>Replying to {eventData.authorDisplayName} </div>
        <div className="create-post-textarea-button-wrapper">
          <label htmlFor="postText" className="comment-textarea-label">
            <textarea
              rows={1}
              type="text"
              name="postText"
              id="post-text"
              className="event-text comment-textarea"
              placeholder="Tweet your reply!"
              onChange={(event) => handleTextareaChange(event)}
              value={text}
              spellCheck="false"
            />
          </label>
          <button
            type="submit"
            className="tweet-button"
            disabled={submitDisabled}
          >
            Reply
          </button>
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert>{message}</Alert>}
      </form>
    </div>
  );
}
