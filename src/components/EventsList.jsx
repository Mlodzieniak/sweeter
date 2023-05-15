import React, { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
// import { useLoaderData } from "react-router-dom";
import { db } from "../firebase";
import EventBasic from "./EventBasic";

// NOT USED CURRENTLY, old way of fetching data but i leave it here if newone has problems
export const fetchAllEvents = async () => {
  const loadedEvents = [];
  const snapshot = await getDocs(collection(db, "events"));
  snapshot.forEach((e) => {
    loadedEvents.push({ ...e.data(), id: e.id });
  });
  // sort events by timestamp
  loadedEvents.sort((a, b) => b.postedAt - a.postedAt);
  return { loadedEvents };
};

export default function EventsList() {
  // const { loadedEvents, unsubscribe } = useLoaderData();
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
