import React from "react";
import CreatePost from "./CreatePost";
import EventsList from "./EventsList";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="home">
      <div className="content">
        <CreatePost />
        <EventsList />
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
