import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import EventBasic from "./EventBasic";

export default function EventsList() {
  const [loadedEvents, setLoadedEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const events = [];
      snapshot.forEach((e) => {
        events.push({ ...e.data(), id: e.id });
      });
      events.sort((a, b) => b.postedAt - a.postedAt);
      setLoadedEvents(events);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="events">
      {loadedEvents.map((event) => (
        <EventBasic key={event.id} data={event} />
      ))}
    </div>
  );
}
