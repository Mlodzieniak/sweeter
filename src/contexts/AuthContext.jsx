import { uuidv4 } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// import { getDownloadURL, ref } from "firebase/storage";
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

  // const getDefAvatarURL = async () => {
  //   const avatarRef = ref(storage, "images/defaults/avatar.png");
  //   const url = await getDownloadURL(avatarRef);
  //   return url;
  // };

  const logout = async () => {
    await auth.signOut();
  };
  const signup = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // const avatarURL = await getDefAvatarURL();
    const defaultUserData = {
      uid: result.user.uid,
      displayName: result.user.displayName || `user${uuidv4().slice(0, 7)}`,
      email: result.user.email,
      avatarURL: "",
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

  const value = useMemo(
    () => ({
      currentUser,
      signup,
      signin,
      logout,
      resetPassword,
      changePassword,
      changeEmail,
      userData: null,
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
