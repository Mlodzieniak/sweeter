// import { uuidv4 } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth, db } from "../firebase";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await auth.signOut();
  };
  const signup = async (email, password, username) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const defaultUserData = {
      uid: result.user.uid,
      displayName: username,
      email: result.user.email,
      joinedAt: Date.now(),
      avatarURL: "",
      events: [],
    };
    await setDoc(doc(db, `users/${result.user.uid}`), defaultUserData, {
      merge: true,
    });
    return result;
  };

  const signin = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  const changePassword = async (newPassword) => {
    await updatePassword(currentUser, newPassword);
  };
  const changeEmail = async (newEmail) => updateEmail(currentUser, newEmail);
  const dummyUserData = {
    uid: "",
    displayName: "",
    email: "",
    avatarURL: "",
  };
  const value = useMemo(
    () => ({
      currentUser,
      signup,
      signin,
      logout,
      resetPassword,
      changePassword,
      changeEmail,
      userData: dummyUserData,
    }),
    [currentUser]
  );

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
