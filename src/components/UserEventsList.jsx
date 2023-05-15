/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import { db } from "../firebase";
import EventBasic from "./EventBasic";

export const userIdLoader = async ({ params }) => ({ userId: params.userId });

export default function UserEventsList() {
  const { userId } = useLoaderData();
  const [loadedEvents, setLoadedEvents] = useState([]);

  // messy function, first based on url it fetches correctUser to retieve uid, and then uid is used to fetch all user events
  const subscribeUserEvents = async () => {
    let user = null;
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("displayName", "==", userId));
    const userSnapshot = await getDocs(usersQuery);
    userSnapshot.forEach((result) => {
      user = result.data();
    });
    const eventsQuery = query(
      collection(db, "events"),
      where("authorId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const events = [];
      snapshot.forEach((e) => {
        events.push({ ...e.data(), id: e.id });
      });
      events.sort((a, b) => b.postedAt - a.postedAt);
      setLoadedEvents(events);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = subscribeUserEvents;
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
