import React from "react";
import './tabs.css'
const Tabs = ({activeSection}) => {
  return (
    <div className="profile-tabs">

      <button className={`tab ${activeSection==='upcoming'?'active':''}`}>
        Upcoming
      </button>

      <button className={`tab ${activeSection==='past'?'active':''}`}>
        Past
      </button>

    </div>
  );
};

export default Tabs;