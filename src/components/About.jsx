import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
// import LoadingPage from "./LoadingPage";

export default function About() {
  return (
    <div>
      {/* <LoadingPage /> */}
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
        <button type="button" className="navbar-button">
          Go back
        </button>
        <button type="button" className="navbar-button">
          <span>Visit github</span>
          <GitHubIcon />
        </button>
      </div>
    </div>
  );
}
