import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import EventBasic from "./EventBasic";
import Comments from "./Comments";
import { db } from "../firebase";

export async function loader({ params }) {
  const eventSnap = await getDoc(doc(db, `events/${params.eventId}`));
  const event = eventSnap.data();
  return { event };
}
// detailed event with comments
export default function EventFull() {
  const { event } = useLoaderData();
  return (
    <div>
      <EventBasic data={event} />
      <Comments />
    </div>
  );
}
