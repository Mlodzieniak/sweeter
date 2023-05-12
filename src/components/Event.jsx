import React from "react";
import { Avatar } from "@mui/material";

export default function Event({ data }) {
  const { authorDisplayName, authorAvatarURL, postedAt, text, imageURL } = data;
  return (
    <div>
      <Avatar src={authorAvatarURL} />
      <div className="author">{authorDisplayName}</div>
      <div className="post-time">{postedAt.seconds}</div>
      <div className="post-text">{text}</div>
      {imageURL ? <img src={imageURL} alt="#" /> : null}
    </div>
  );
}
