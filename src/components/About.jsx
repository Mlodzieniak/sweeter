import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate, Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <LoadingPage />
      <h1>Shortly about this project</h1>
      <p>
        Welcome to our Twitter clone! I have recreated the core functionality
        and user experience of Twitter using React.js.
      </p>
      <h2>Features</h2>
      <ul>
        <li>User Registration and Authentication</li>
        <li>Tweeting and commenting</li>
        <li>User Profiles</li>
        <li>Keeping track of follows, tweets and comments</li>
      </ul>
      <p>
        We hope you enjoy our Twitter clone. Feel free to provide any feedback.
        Happy tweeting!
      </p>
      <div className="about-page-buttons">
        <button
          type="button"
          className="about-page-button"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
        <Link to="https://github.com/Mlodzieniak/sweeter" target="_blank">
          <button type="button" className="about-page-button">
            <span>Visit github</span>
            <GitHubIcon />
          </button>
        </Link>
      </div>
    </div>
  );
}
