import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import { db } from "../firebase";
import EventBasic from "./EventBasic";

export default function UserEventsList() {
  const { user } = useLoaderData();
  const [loadedEvents, setLoadedEvents] = useState([]);

  useEffect(() => {
    const eventsQuery = query(
      collection(db, "events"),
      where("authorId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(
      eventsQuery,
      (snapshot) => {
        const events = [];
        snapshot.forEach((e) => {
          events.push({ ...e.data(), id: e.id });
        });
        events.sort((a, b) => b.postedAt - a.postedAt);
        setLoadedEvents(events);
      },
      (error) => {
        console.log(error);
      }
    );
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
