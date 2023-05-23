import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function NewUsersList() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNewestUsers = async () => {
    try {
      const q = query(
        collection(db, "users"),
        orderBy("joinedAt", "desc"),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const newestUsers = querySnapshot.docs.map((snap) => snap.data());
      setUsers(newestUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching newest users:", error);
    }
  };

  const handleRedirect = (path) => {
    if (currentUser) {
      navigate(path);
    } else {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    fetchNewestUsers();
  }, []);

  return (
    !loading && (
      <div>
        {users.length !== 0 && (
          <ul className="following-list">
            <h3>New users</h3>
            {users.map((follow) => (
              <li
                key={follow.uid}
                className="event-author-wrapper following-name"
              >
                <Avatar src={follow.avatarURL} />
                <button
                  type="button"
                  className="author-name following-name"
                  onClick={() => handleRedirect(`/user/${follow.uid}`)}
                >
                  <div>{follow.displayName}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  );
}
