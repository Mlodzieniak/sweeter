import React from "react";
import { ReactComponent as DuckLogo } from "../assets/duck.svg";

export default function LoadingPage() {
  return (
    <div className="loading-page">
      <div className="loading-ball">
        <DuckLogo className="loading-duck" />
      </div>
      <div className="clouds">
        <div id="cloud1">
          <div className="cloud" />
        </div>
        <div id="cloud2">
          <div className="cloud" />
        </div>
        <div id="cloud3">
          <div className="cloud" />
        </div>
      </div>
    </div>
  );
}
