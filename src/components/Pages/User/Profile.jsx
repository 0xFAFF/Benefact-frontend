import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Profile.scss";

const Profile = () => {
  return (
    <div id="user-profile">
      <div id="user-demographics">
        <div className="user-avatar-container">
          <div />
          <div className="user-avatar">
            <FontAwesomeIcon icon="poo" />
          </div>
        </div>
        <div className="user-details">
          <div className="user-details-input user-name">PoopPoop</div>
          <div className="user-details-input user-email">poopoo@poopoo.poopoo</div>
        </div>
      </div>
      <div id="user-content">
        <div className="user-content-selectables" />
        <div className="user-content-display" />
      </div>
    </div>
  );
};

export default Profile;
