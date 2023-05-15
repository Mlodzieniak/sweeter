import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import EventBasic from "./EventBasic";
import Comments from "./Comments";
import { db } from "../firebase";
import CreateComment from "./CreateComment";

// fetches event data from db
export async function loader({ params }) {
  const eventSnap = await getDoc(doc(db, `events/${params.eventId}`));
  const event = eventSnap.data();
  event.id = eventSnap.id;
  return { event };
}
// load all possible data associated with event
export default function EventFull() {
  const { event } = useLoaderData();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsRef = collection(db, "comments");
    const commentsQuery = query(commentsRef, where("eventId", "==", event.id));
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const newComments = [];
      snapshot.forEach((com) => {
        newComments.push(com.data());
      });
      newComments.sort((a, b) => b.postedAt - a.postedAt);
      setComments(newComments);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <EventBasic data={event} commentsLength={comments.length} />
      <CreateComment data={event} />
      <Comments data={comments} />
    </div>
  );
}
