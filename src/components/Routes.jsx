import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const credentials = useAuth();
  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      const unsubscribe = onSnapshot(
        doc(db, `users/${currentUser.uid}`),
        (userDoc) => {
          if (userDoc.exists()) {
            credentials.userData = userDoc.data();
          }
          setLoading(false);
        }
      );
      return () => {
        unsubscribe();
      };
    }
    setLoading(false);
  }, [currentUser]);
  return currentUser ? !loading && children : <Navigate to="/login" />;
}
export function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/home" />;
}
