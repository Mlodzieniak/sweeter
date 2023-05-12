import React from "react";
import { Avatar } from "@mui/material";

export default function Event({ data }) {
  const { authorDisplayName, authorAvatarURL, postedAt, text, imageURL } = data;
  const date = postedAt.toDate(); // Convert timestamp to Date object
  const formattedDate = date.toLocaleDateString("en-GB"); // Format date as dd/mm/yyyy
  const formattedTime = date.toLocaleTimeString("en-US", { hour12: false }); // Format time as 24-hour format
  const formattedTimestamp = `${formattedDate} ${formattedTime}`;

  return (
    <div>
      <Avatar src={authorAvatarURL} />
      <div className="author">{authorDisplayName}</div>
      <div className="post-time">{formattedTimestamp}</div>
      <div className="post-text">{text}</div>
      {imageURL ? <img src={imageURL} alt="#" /> : null}
    </div>
  );
}
