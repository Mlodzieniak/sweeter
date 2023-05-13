import React from "react";
import Comment from "./Comment";

export default function Comments({ data }) {
  return (
    <div className="comments">
      {data.map((com) => (
        <Comment key={com.id} data={com} />
      ))}
    </div>
  );
}
