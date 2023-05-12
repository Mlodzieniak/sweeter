import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Event from "./Event";

export default function Events() {
  const [events, setEvents] = useState([]);
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
    <div className="events">
      {events.map((event) => (
        <Event key={event.id} data={event} />
      ))}
    </div>
  );
}
