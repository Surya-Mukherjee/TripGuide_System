import React, { useRef } from "react";
import "./Account.css";

const Account = ({ onClose, user }) => {

    const fileInputRef = useRef(null);

    const handleProfilePicClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        console.log("Selected profile picture:", file);

        // Later:
        // upload this file to your backend / Cloudinary
    };

    return (
        <div className="settings-overlay">

            <div className="settings-modal">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2>Account Settings</h2>


                {/* Profile Picture */}
                <div className="profile-picture-section">

                    <div className="profile-picture-wrapper">

                        <img
                            src={user?.profilePic}
                            alt="Profile"
                            className="profile-picture"
                        />

                        <button
                            className="profile-picture-edit"
                            onClick={handleProfilePicClick}
                        >
                            ✎
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                        />

                    </div>

                    <div className="profile-picture-info">
                        <h3>Profile Picture</h3>
                        <p>Choose a new profile picture</p>
                    </div>

                </div>


                {/* Profile */}
                <div className="settings-section">

                    <h3>Profile</h3>

                    <div className="setting-row">
                        <span>Name</span>

                        <button>
                            Edit
                        </button>
                    </div>

                    <div className="setting-row">
                        <span>Email</span>

                        <button>
                            Edit
                        </button>
                    </div>

                </div>


                {/* Security */}
                <div className="settings-section">

                    <h3>Security</h3>

                    <div className="setting-row">
                        <span>Password</span>

                        <button>
                            Change
                        </button>
                    </div>

                </div>


                {/* Account */}
                <div className="settings-section">

                    <h3>Account</h3>

                    <div className="setting-row">
                        <span>Logout</span>

                        <button>
                            Logout
                        </button>
                    </div>

                    <div className="setting-row danger">
                        <span>Delete Account</span>

                        <button>
                            Delete
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Account;