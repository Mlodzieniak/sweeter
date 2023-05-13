import { uuidv4 } from "@firebase/util";
import React from "react";
import Comment from "./Comment";

export default function Comments({ data }) {
  return (
    <div className="comments">
      {data.map((com) => (
        <Comment key={uuidv4()} data={com} />
      ))}
    </div>
  );
}
