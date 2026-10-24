import React from "react";
import './UserAvatar.css'
const UserAvatar = () => {
  return (
    <div className="user-avatar">

      <img
        src="https://i.pravatar.cc/300"
        alt="Profile"
      />

      <button className="change-avatar-btn">
        📷
      </button>

    </div>
  );
};

export default UserAvatar;