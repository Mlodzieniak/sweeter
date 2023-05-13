import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function CreateComment({ data: eventData }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { currentUser, userData } = useAuth();
  const { uid } = currentUser;

  const handleSubmit = async () => {
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
          postedAt: Timestamp.fromDate(new Date()),
        };
        await addDoc(collection(db, `comments`), postData);
        setText("");
        setMessage("Posted.");
      } catch (e) {
        setError(e);
      }
    } else {
      setError("You cannot send empty post.");
    }
  };

  return (
    <form action="post">
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

      <button type="button" onClick={handleSubmit}>
        Post comment
      </button>
      {error ? <div className="error">{error}</div> : null}
      {message ? <div className="message">{message}</div> : null}
    </form>
  );
}
