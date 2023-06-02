import React from "react";
import ReactTimeAgo from "react-time-ago";

export default function LastSeen({ date }) {
  return (
    <div>
     <ReactTimeAgo date={date} locale="en-US"  timeStyle="round"/>
    </div>
  );
}
