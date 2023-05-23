import { getDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "./Sidebar";

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
  const { currentUser, userData } = useAuth();
  const { follows: currUserFollows } = userData;
  const [followed, setFollowed] = useState(false);

  const { user } = useLoaderData();
  const {
    displayName,
    avatarURL,
    joinedAt,
    events,
    about,
    followers: viewedUserFollowers,
    uid: viewedUid,
  } = user;
  const joinedAtDate = formatDate(joinedAt);

  const followUser = async () => {
    // add viewed user to current user follows
    if (!currUserFollows.includes(viewedUid)) {
      try {
        await updateDoc(doc(db, `users/${currentUser.uid}`), {
          follows: [...currUserFollows, viewedUid],
        });
        setFollowed(true);
      } catch (error) {
        console.log(error);
      }
    }
    // add current users to viewed user followers
    if (!viewedUserFollowers.includes(currentUser.uid)) {
      await updateDoc(doc(db, `users/${viewedUid}`), {
        followers: [...viewedUserFollowers, currentUser.uid],
      });
    }
  };

  const unfollowUser = async () => {
    try {
      // delete viewed ux`ser from current user follows
      const currUserRef = await getDoc(doc(db, `users/${currentUser.uid}`));
      const currUserFreshFollows = currUserRef.data().follows;
      const index1 = currUserFreshFollows.indexOf(viewedUid);
      if (index1 !== -1) {
        currUserFreshFollows.splice(index1, 1);
      }
      await updateDoc(doc(db, `users/${currentUser.uid}`), {
        follows: [...currUserFreshFollows],
      });
      setFollowed(false);

      // delete current users from viewed user followers
      const viewedUserRef = await getDoc(doc(db, "users", viewedUid));
      const viewedUserFreshFollowers = viewedUserRef.data().followers;
      const index2 = viewedUserFreshFollowers.indexOf(currentUser.uid);
      if (index2 !== -1) {
        viewedUserFreshFollowers.splice(index2, 1);
      }
      await updateDoc(doc(db, `users/${viewedUid}`), {
        followers: [...viewedUserFreshFollowers],
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setFollowed(currUserFollows.includes(viewedUid));
  }, []);

  return (
    <div className="home">
      <div className="content">
        <div className="user-profile">
          <div className="basic-data-wrapper">
            {avatarURL ? (
              <div className="avatar-wrapper">
                <img src={avatarURL} alt="user avatar" className="avatar" />
              </div>
            ) : (
              <div className="avatar-wrapper">
                <div className="avatar">
                  <AccountBoxSharpIcon
                    sx={{ fontSize: "200px", color: "#AAB8C2" }}
                  />
                </div>
              </div>
            )}
            <h3 className="user-name">{displayName}</h3>
          </div>

          <div className="detailed-data-wrapper">
            <div className="about">
              <div className="label">About</div>
              <div className="about-text">{about}</div>
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
              <div className="value">{viewedUserFollowers.length}</div>
            </div>
            {followed ? (
              <button
                type="button"
                className="follow-button"
                onClick={unfollowUser}
              >
                Unfollow
              </button>
            ) : (
              <button
                type="button"
                className="follow-button"
                onClick={followUser}
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <Outlet />
      </div>
      {/* <div className="sidebar-wrapper">
        <FollowsList />
        
      </div> */}
      <Sidebar />
    </div>
  );
}
