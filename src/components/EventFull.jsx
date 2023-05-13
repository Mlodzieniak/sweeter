import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import EventBasic from "./EventBasic";
import Comments from "./Comments";
import { db } from "../firebase";

export async function loader({ params }) {
  let event = null;
  // const usersRef = collection(db, "events");
  // const usersQuery = query(usersRef, where("displayName", "==", params.userId));
  // const userSnapshot = await getDocs(usersQuery);
  const eventSnap = await getDoc(doc(db, `events/${params.eventId}`));
  event = eventSnap.data();
  return { event };
}
// detailed event with comments
export default function EventFull() {
  const { event } = useLoaderData();
  console.log(event);
  return (
    <div>
      <EventBasic data={event} />
      <Comments />
    </div>
  );
}
