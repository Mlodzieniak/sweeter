import React from "react";

export default function About() {
  return (
    <div>
      <h1>Shortly about this project</h1>
      <p>
        Welcome to our Twitter clone! I have recreated the core functionality
        and user experience of Twitter using React.js.
      </p>
      <h2>Features</h2>
      <ul>
        <li>User Registration and Authentication</li>
        <li>Tweeting and Interacting</li>
        <li>User Profiles</li>
      </ul>
      <p>
        We hope you enjoy our Twitter clone. Feel free to provide any feedback.
        Happy tweeting!
      </p>
      <div className="about-buttons">
        <button type="button">Go back</button>
        <button type="button">Visit github</button>
      </div>
    </div>
  );
}
