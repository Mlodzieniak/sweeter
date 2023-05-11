import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signin = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = async () => auth.signOut();

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  const changePassword = async (newPassword) => {
    await updatePassword(currentUser, newPassword);
  };

  const value = useMemo(
    () => ({
      currentUser,
      signup,
      signin,
      logout,
      resetPassword,
      changePassword,
    }),
    [currentUser]
  );

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

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
