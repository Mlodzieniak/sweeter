import React from "react";
import CreatePost from "./CreatePost";
import EventsList from "./EventsList";

function Home() {
  return (
    <div className="home">
      <div className="content">
        <CreatePost />
        <EventsList />
      </div>
      <div className="followed-wrapper">Followed users</div>
    </div>
  );
}

export default Home;
