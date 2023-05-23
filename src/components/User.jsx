import { getDoc, doc } from "firebase/firestore";
import React from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import { db } from "../firebase";

export async function loader({ params }) {
  const userSnapshot = await getDoc(doc(db, `users/${params.userId}`));
  return { user: userSnapshot.data() };
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Pad single digits with leading zeros
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
};
export default function User() {
  const { user } = useLoaderData();
  const { displayName, avatarURL, joinedAt, events } = user;
  const joinedAtDate = formatDate(joinedAt);

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
              <div className="label">About</div>
              <div className="about-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                deleniti iusto soluta labore similique rem adipisci commodi eius
                quasi, obcaecati optio non voluptatum pariatur, suscipit nemo
                minima ad id animi!
              </div>
            </div>
            <div className="data">
              <div className="label">Joined at</div>
              <div className="value">{joinedAtDate}</div>
            </div>
            <div className="data">
              <div className="label">Tweets</div>
              <div className="value">{events.length}</div>
            </div>
            <div className="data">
              <div className="label">Followers</div>
              <div className="value">0</div>
            </div>
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
