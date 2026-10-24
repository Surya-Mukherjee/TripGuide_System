import React from "react";
import UserAvatar from "./UserAvatar";
import './ProfileHeader.css'
const ProfileHeader = () => {
  return (
    <section className="profile-header">

      <UserAvatar />

      <div className="profile-info">
        <h1>Surya Mukherjee</h1>

        <span className="profile-role">
          Traveler
        </span>

        <p>surya.mukherjee@example.com</p>

        <p>Member since 26 Sep 2024</p>
      </div>

      <button className="edit-profile-btn">
        Edit Profile
      </button>

    </section>
  );
};

export default ProfileHeader;