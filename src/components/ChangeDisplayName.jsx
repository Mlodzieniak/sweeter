import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function EditProfile() {
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
      setDoc(doc(db, `events/${event.id}`), eventData);
    });
    // update name inside comments collection
    const commentsRef = collection(db, "comments");
    const commentsQuery = query(commentsRef, where("authorId", "==", uid));
    const commentsSnapshot = await getDocs(commentsQuery);
    commentsSnapshot.forEach((event) => {
      const commentData = event.data();
      commentData.authorDisplayName = newName;
      setDoc(doc(db, `comments/${event.id}`), commentData);
    });
  };
  const isNameTaken = async (newName) => {
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("displayName", "==", newName));
    const usersSnapshot = await getDocs(usersQuery);
    return !!usersSnapshot.size;
  };
  const handleSubmit = async () => {
    setMessage(null);
    setError();

    if (nameRef.current.value.length < 3) {
      return setError("Name must be at least 4 characters long.");
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
      <form action="post" className="register-form">
        <label htmlFor="email">
          New name:
          <input
            type="email"
            name="email"
            id="new-email"
            ref={nameRef}
            required
          />
        </label>

        <button type="button" onClick={handleSubmit} disabled={loading}>
          Change name
        </button>
        {message ? <div className="messages">{message}</div> : null}
        {error ? <div className="error">{error}</div> : null}
      </form>
    </div>
  );
}
