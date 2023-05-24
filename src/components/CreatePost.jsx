/* eslint-disable no-param-reassign */
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { uuidv4 } from "@firebase/util";
import { Alert, Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { storage, db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [imageRef, setImageRef] = useState(null);
  const { currentUser, userData } = useAuth();
  const { uid } = currentUser;
  const { displayName, avatarURL } = userData;

  const reader = new FileReader();
  reader.onload = () => {
    setImagePreview(reader.result);
  };
  const resetForm = () => {
    setFile(null);
    setText("");
    setImageRef(null);
    setImagePreview(null);
    setSubmitDisabled(true);
  };
  const loadFile = async (event) => {
    await setFile(event.target.files[0]);
  };
  const handleTextareaChange = (event) => {
    setText(event.target.value);
    // adjusting textare height
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    // prevents from sending empty or too long tweet
    setSubmitDisabled(!event.target.value || event.target.value.length > 500);
  };
  const handleCancel = () => {
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const isEmptyOrSpaces = /^\s*$/.test(text);
    if (isEmptyOrSpaces) return setError("You cannot post empty message.");
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
        postedAt: Date.now(),
      };
      const eventRef = await addDoc(collection(db, "events"), postData);
      const userRef = await getDoc(doc(db, `users/${uid}`));
      const userEvents = userRef.data().events;
      await updateDoc(doc(db, `users/${uid}`), {
        events: [...userEvents, eventRef.id],
      });
      resetForm();
    } catch (newError) {
      setError(newError);
    }
  };
  useEffect(() => {
    if (file) {
      setImageRef(ref(storage, `images/${uuidv4()}`));
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="create-post-wrapper">
      <Avatar src={avatarURL} sx={{ width: 36, height: 36 }} />
      <form action="post" className="create-post" onSubmit={handleSubmit}>
        <label htmlFor="eventText">
          <textarea
            rows={1}
            type="text"
            name="eventText"
            className="event-text"
            onChange={handleTextareaChange}
            value={text}
            placeholder="What is happening?!"
            spellCheck="false"
          />
        </label>
        {imagePreview && (
          <div className="loaded-image-wrapper">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              <ClearOutlinedIcon />
            </button>
            <img src={imagePreview} alt="Selected" className="loaded-image" />
          </div>
        )}
        <div className="event-buttons">
          <label htmlFor="loadFile">
            <ImageIcon />
            <input
              name="loadFile"
              id="loadFile"
              type="file"
              accept="image/*"
              className="upload-image-input"
              onChange={loadFile}
            />
          </label>
          <button
            type="submit"
            disabled={submitDisabled}
            className="tweet-button"
          >
            Tweet
          </button>
        </div>
        {error && <Alert severity="error">{error}</Alert>}
      </form>
    </div>
  );
}
