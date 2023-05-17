import { Timestamp, setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { uuidv4 } from "@firebase/util";
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
  const { currentUser, userData } = useAuth();
  const { uid } = currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { displayName, avatarURL } = userData;
    const { id } = eventData;
    setError(null);
    setMessage(null);
    if (text.length !== 0) {
      try {
        const postData = {
          authorId: uid,
          authorDisplayName: displayName,
          authorAvatarURL: avatarURL,
          text,
          eventId: id,
          commentId: uuidv4(),
          postedAt: Timestamp.fromDate(new Date()),
        };
        await setDoc(doc(db, `comments/${postData.commentId}`), postData);
        updateParentEvent(postData.eventId, 1);
        setText("");
        setMessage("Posted.");
      } catch (newError) {
        setError(newError);
      }
    } else {
      setError("You cannot send empty post.");
    }
  };

  return (
    <form action="post" onSubmit={handleSubmit}>
      <div>Make a comment</div>
      <label htmlFor="postText">
        <input
          type="text"
          name="postText"
          id="post-text"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={text}
        />
      </label>

      <button type="submit">Post comment</button>
      {error ? <div className="error">{error}</div> : null}
      {message ? <div className="message">{message}</div> : null}
    </form>
  );
}
