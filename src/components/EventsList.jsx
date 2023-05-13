import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import { db } from "../firebase";
import EventBasic from "./EventBasic";

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
  const { loadedEvents } = useLoaderData();

  return (
    <div className="events">
      {loadedEvents.map((event) => (
        <EventBasic key={event.id} data={event} />
      ))}
    </div>
  );
}
