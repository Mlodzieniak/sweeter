import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import EventBasic from "./EventBasic";
import Comments from "./Comments";
import { db } from "../firebase";
import CreateComment from "./CreateComment";

export async function loader({ params }) {
  const eventSnap = await getDoc(doc(db, `events/${params.eventId}`));
  const event = eventSnap.data();
  event.id = eventSnap.id;
  return { event };
}
// detailed event with comments
export default function EventFull() {
  const { event } = useLoaderData();
  return (
    <div>
      <EventBasic data={event} />
      <CreateComment data={event} />
      <Comments />
    </div>
  );
}
