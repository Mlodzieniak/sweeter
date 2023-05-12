import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Event from "./Event";

export default function Events({ userId }) {
  const [events, setEvents] = useState([]);

  const fetchAllEvents = async () => {
    const loadedEvents = [];
    const snapshot = await getDocs(collection(db, "events"));
    snapshot.forEach((e) => {
      loadedEvents.push({ ...e.data(), id: e.id });
    });
    // sort events by timestamp
    loadedEvents.sort((a, b) => b.postedAt - a.postedAt);
    setEvents(loadedEvents);
  };

  const fetchUserEvents = async () => {
    const loadedEvents = [];
    const eventsRef = collection(db, "events");
    const eventsQuery = query(eventsRef, where("authorId", "==", userId));
    const snapshot = await getDocs(eventsQuery);
    snapshot.forEach((e) => {
      loadedEvents.push({ ...e.data(), id: e.id });
    });
    // sort events by timestamp
    loadedEvents.sort((a, b) => b.postedAt - a.postedAt);
    setEvents(loadedEvents);
  };
  useEffect(() => {
    if (userId) {
      fetchUserEvents();
    } else {
      fetchAllEvents();
    }
    return setEvents([]);
  }, []);
  return (
    <div className="events">
      {events.map((event) => (
        <Event key={event.id} data={event} />
      ))}
    </div>
  );
}
