import React, { useEffect } from "react";
import profilePicture from "../../assets/profile_picture.jpg";
import profileBanner from "../../assets/banner-profile.png";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firstToUpperCase } from "../../services/functions";
import "./Profile.css";
const Profile = () => {
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRdxData.user.name) {
      navigate("/");
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-img">
          <img
            src={profilePicture}
            alt="profile-picture"
            className="profile-picture"
          />
          <img
            src={profileBanner}
            alt="banner-profile"
            className="banner-profile"
          />
        </div>
        <div className="profile-text">
          <div className="user-info">
            <h1>{firstToUpperCase(userRdxData.user.name)}</h1>
            <h2>@{firstToUpperCase(userRdxData.user.username)}</h2>
            <p>Location ....</p>
            <p>Number of contact</p>
            <div className="common-contacts"></div>
            <div className="contact-section">
              <button className="connect-btn">Contactar</button>
            </div>
            <div className="about-container">
              <h3>Acerca de</h3>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
