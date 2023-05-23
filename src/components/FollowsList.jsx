import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function FollowsList() {
  const { userData, currentUser } = useAuth();
  const { follows } = userData;
  const [loadedFollows, setFollows] = useState([]);
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    if (currentUser) {
      navigate(path);
    } else {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    if (follows.length !== 0) {
      const fetchUsers = async () => {
        const userDocs = await Promise.all(
          follows.map(async (userId) => {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            return { id: docSnap.id, ...docSnap.data() };
          })
        );
        setFollows(userDocs);
      };

      fetchUsers();
    }
  }, []);
  return (
    <div>
      {loadedFollows.length !== 0 && (
        <ul className="following-list">
          <h3>Following</h3>
          {loadedFollows.map((follow) => (
            <li key={follow.id} className="event-author-wrapper following-name">
              <Avatar src={follow.AvatarURL} />
              <button
                type="button"
                className="author-name following-name"
                onClick={() => handleRedirect(`/user/${follow.id}`)}
              >
                <div>{follow.displayName}</div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
