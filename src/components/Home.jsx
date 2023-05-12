import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import CreatePost from "./CreatePost";
import Event from "./Event";

function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { logout, currentUser, userData } = useAuth();
  const { displayName, avatarURL } = userData;
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const fetchEvents = async () => {
    const loadedEvents = [];
    const snapshot = await getDocs(collection(db, "events"));
    snapshot.forEach((e) => {
      loadedEvents.push({ ...e.data(), id: e.id });
    });
    setEvents(loadedEvents);
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="dashboard">
      <div className="navbar">
        <h3>{currentUser.email}</h3>
        <h3>{displayName}</h3>
        <Avatar src={avatarURL} />

        <button
          type="button"
          onClick={() => {
            navigate("/edit-profile");
          }}
        >
          Edit profile
        </button>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="content">
        <CreatePost />
        {events.map((event) => (
          <Event key={event.id} data={event} />
        ))}
      </div>
      <div className="status">LIST</div>
    </div>
  );
}

export default Home;
