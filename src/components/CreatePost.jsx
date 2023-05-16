import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { uuidv4 } from "@firebase/util";
import { Avatar } from "@mui/material";
import { storage, db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const { currentUser, userData } = useAuth();
  const { uid } = currentUser;
  const { displayName, avatarURL } = userData;

  const resetForm = () => {
    setFile(null);
    setText("");
    setImageRef(null);
  };
  const loadFile = async (event) => {
    await setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (text.length !== 0) {
      let url = "";
      try {
        if (file) {
          const result = await uploadBytes(imageRef, file);
          url = await getDownloadURL(result.ref);
        }
        const postData = {
          authorId: uid,
          authorDisplayName: displayName,
          authorAvatarURL: avatarURL,
          text,
          commentsSize: 0,
          imageURL: url || "",
          postedAt: Timestamp.fromDate(new Date()),
        };
        await addDoc(collection(db, "events"), postData);
        resetForm();
        setMessage("Posted.");
      } catch (newError) {
        setError(newError);
      }
    } else {
      setError("You cannot send empty post.");
    }
  };
  useEffect(() => {
    if (file) {
      setImageRef(ref(storage, `images/${uuidv4()}`));
    }
  }, [file]);

  return (
    <div className="create-post-wrapper">
      <Avatar src={avatarURL} sx={{ width: 36, height: 36 }} />
      <form action="post" className="create-post" onSubmit={handleSubmit}>
        <div>CreatePost</div>
        <label htmlFor="eventText">
          <input
            type="text"
            name="eventText"
            className="event-text"
            onChange={(event) => {
              setText(event.target.value);
            }}
            value={text}
          />
        </label>
        <label htmlFor="loadFile">
          <input type="file" accept="image/*" onChange={loadFile} />
        </label>
        <button type="button">Post</button>
        {error ? <div className="error">{error}</div> : null}
        {message ? <div className="message">{message}</div> : null}
      </form>
    </div>
  );
}
