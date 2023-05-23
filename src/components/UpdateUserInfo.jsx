import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { TextField, Alert } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../firebase";

export const isNameTaken = async (newName) => {
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("displayName", "==", newName));
  const usersSnapshot = await getDocs(usersQuery);
  return !!usersSnapshot.size;
};

export default function UpdateUserInfo() {
  const nameRef = useRef();
  const aboutRef = useRef();
  const [file, setFile] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [error, setError] = useState();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, userData } = useAuth();
  const { uid } = currentUser;
  const { displayName, about } = userData;

  const changeNameGlobally = async (newName) => {
    // update name inside events collection
    const eventsRef = collection(db, "events");
    const eventsQuery = query(eventsRef, where("authorId", "==", uid));
    const eventsSnapshot = await getDocs(eventsQuery);
    eventsSnapshot.forEach((event) => {
      const eventData = event.data();
      eventData.authorDisplayName = newName;
      updateDoc(doc(db, `events/${event.id}`), eventData);
    });
    // update name inside comments collection
    const commentsRef = collection(db, "comments");
    const commentsQuery = query(commentsRef, where("authorId", "==", uid));
    const commentsSnapshot = await getDocs(commentsQuery);
    commentsSnapshot.forEach((event) => {
      const commentData = event.data();
      commentData.authorDisplayName = newName;
      updateDoc(doc(db, `comments/${event.id}`), commentData);
    });
  };

  const loadFile = async (event) => {
    await setFile(event.target.files[0]);
  };

  const updateAvatarGlobally = async (newURL) => {
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

  const updateUser = async (newName, newAbout) => {
    await updateDoc(doc(db, `users/${uid}`), {
      displayName: newName,
      about: newAbout,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError();

    if (nameRef.current.value.length < 4) {
      return setError("Name must be at least 4 characters long.");
    }
    if (nameRef.current.value.length > 15) {
      return setError("Name must be maximum 15 characters long.");
    }
    if (displayName !== nameRef.current.value) {
      if (await isNameTaken(nameRef.current.value)) {
        return setError("Name is already taken.");
      }
    }

    setLoading(true);
    try {
      if (file) {
        const result = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(result.ref);
        updateAvatarGlobally(url);
      }
      if (displayName !== nameRef.current.value) {
        changeNameGlobally(nameRef.current.value);
      }
      await updateUser(nameRef.current.value, aboutRef.current.value);
      setMessage("Updated!");
    } catch (resetError) {
      console.log(`Failed to update: ${resetError}`);
      setError("Failed to update");
    }
    return setLoading(false);
  };

  useEffect(() => {
    if (file) {
      setImageRef(ref(storage, `avatars/${uuidv4()}`));
    }
  }, [file]);
  useEffect(() => {
    nameRef.current.value = displayName;
    aboutRef.current.value = about;
  }, []);

  return (
    <div className="edit-window">
      <form action="post" className="register-form" onSubmit={handleSubmit}>
        <TextField label="Name" inputRef={nameRef} />
        <TextField label="About" inputRef={aboutRef} />
        <label htmlFor="loadFile">
          <input type="file" accept="image/*" onChange={loadFile} />
        </label>

        <button type="submit" disabled={loading}>
          Update
        </button>
        {message && <Alert>{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </form>
    </div>
  );
}
