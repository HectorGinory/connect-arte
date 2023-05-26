import React from "react";
import "./Footer.css";
import { userList } from "../../services/provisionalStuff";
import { firstToUpperCase } from "../../services/functions";
import profilePicture from "../../assets/profile_picture.jpg";

const Footer = () => {

  const users = userList;

  return (
    <div className="flex f-column align-c footer">
      <div className="searchUsers-container">
        <input type="text" placeholder="Buscar a un usuario" />
        <div className="usersFiltered">

        </div>
      </div>
    </div>
  );
};

export default Footer;
