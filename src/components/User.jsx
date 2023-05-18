import { getDoc, doc } from "firebase/firestore";
import React from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import { db } from "../firebase";

export async function loader({ params }) {
  const userSnapshot = await getDoc(doc(db, `users/${params.userId}`));
  return { user: userSnapshot.data() };
}

export default function User() {
  const { user } = useLoaderData();
  const { displayName, avatarURL, joinedAt } = user;
  return (
    <div className="home">
      <div className="content">
        <div className="user-profile">
          <div className="basic-data-wrapper">
            {avatarURL && (
              <div className="avatar-wrapper">
                <img src={avatarURL} alt="user avatar" className="avatar" />
              </div>
            )}
            <h3 className="user-name">{displayName}</h3>
          </div>

          <div className="detailed-data-wrapper">
            <div className="about">
              <div className="about-label">About:</div>
              <div className="about-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                deleniti iusto soluta labore similique rem adipisci commodi eius
                quasi, obcaecati optio non voluptatum pariatur, suscipit nemo
                minima ad id animi!
              </div>
            </div>
            <div className="joined-at">
              <div className="joined-at-label">Joined at:</div>
              <div className="joined-at-date"> {joinedAt}</div>
            </div>
            <div className="events-count">Tweets: 0</div>
            <div className="followers-count">Followers 0</div>
            <button type="button" className="follow-button">
              Follow
            </button>
          </div>
        </div>
        <Outlet />
      </div>
      <div className="sidebar-wrapper">LIST</div>
    </div>
  );
}
