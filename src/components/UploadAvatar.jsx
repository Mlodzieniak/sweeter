import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../firebase";

export default function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [error, setError] = useState();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const loadFile = async (event) => {
    await setFile(event.target.files[0]);
  };

  const updateDatabase = async (newURL) => {
    // update name inside user document
    await updateDoc(doc(db, `users/${uid}`), {
      avatarURL: newURL,
    });
    // update name inside events collection
    const eventsRef = collection(db, "events");
    const eventsQuery = query(eventsRef, where("authorId", "==", uid));
    const eventsSnapshot = await getDocs(eventsQuery);
    eventsSnapshot.forEach((event) => {
      const eventData = event.data();
      eventData.authorAvatarURL = newURL;
      updateDoc(doc(db, `events/${event.id}`), eventData);
    });
    // update name inside comments collection
    const commentsRef = collection(db, "comments");
    const commentsQuery = query(commentsRef, where("authorId", "==", uid));
    const commentsSnapshot = await getDocs(commentsQuery);
    commentsSnapshot.forEach((event) => {
      const commentData = event.data();
      commentData.authorAvatarURL = newURL;
      updateDoc(doc(db, `comments/${event.id}`), commentData);
    });
  };

  const handleSubmit = async () => {
    setMessage(null);
    setError();
    setLoading(true);
    try {
      const result = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(result.ref);
      await updateDatabase(url);
      setMessage("Avatar uploaded!");
    } catch (resetError) {
      console.log(`Failed to upload: ${resetError}`);
      setError("Failed to upload");
    }
    return setLoading(false);
  };
  useEffect(() => {
    if (file) {
      setImageRef(ref(storage, `avatars/${uuidv4()}`));
    }
  }, [file]);
  return (
    <div className="signup-page">
      <form action="post" className="register-form">
        <label htmlFor="loadFile">
          <input type="file" accept="image/*" onChange={loadFile} />
        </label>

        <button type="button" onClick={handleSubmit} disabled={loading}>
          Upload
        </button>
        {message ? <div className="messages">{message}</div> : null}
        {error ? <div className="error">{error}</div> : null}
      </form>
    </div>
  );
}
