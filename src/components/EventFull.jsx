import React from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import EventBasic from "./EventBasic";
import Comments from "./Comments";
import { db } from "../firebase";
import CreateComment from "./CreateComment";

export async function loader({ params }) {
  const eventSnap = await getDoc(doc(db, `events/${params.eventId}`));
  const event = eventSnap.data();
  event.id = eventSnap.id;
  const comments = [];
  const commentsRef = collection(db, "comments");
  const commentsQuery = query(commentsRef, where("eventId", "==", event.id));
  const commentsData = await getDocs(commentsQuery);
  commentsData.forEach((com) => {
    comments.push(com.data());
  });
  return { event, comments };
}
// detailed event with comments
export default function EventFull() {
  const { event, comments } = useLoaderData();
  return (
    <div>
      <EventBasic data={event} />
      <CreateComment data={event} />
      <Comments data={comments} />
    </div>
  );
}
