import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import { TextField, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export const isNameTaken = async (newName) => {
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("displayName", "==", newName));
  const usersSnapshot = await getDocs(usersQuery);
  return !!usersSnapshot.size;
};

export default function ChangeDisplayName() {
  const nameRef = useRef();
  const [error, setError] = useState();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const changeName = async (newName) => {
    // update name inside user document
    await updateDoc(doc(db, `users/${uid}`), {
      displayName: newName,
    });
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
    if (await isNameTaken(nameRef.current.value)) {
      return setError("Name is already taken.");
    }
    setLoading(true);
    try {
      await changeName(nameRef.current.value);
      setMessage("Name changed!");
    } catch (resetError) {
      console.log(`Failed to change name: ${resetError}`);
      setError("Failed to change name");
    }
    return setLoading(false);
  };
  return (
    <div className="signup-page">
      <form action="post" className="register-form" onSubmit={handleSubmit}>
        <TextField label="New name*" inputRef={nameRef} />
        <button type="submit" disabled={loading}>
          Change name
        </button>
        {message && <Alert>{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </form>
    </div>
  );
}
