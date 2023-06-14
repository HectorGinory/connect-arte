import React from "react";
import "./Footer.css";
import { userList } from "../../services/provisionalStuff";
import { firstToUpperCase } from "../../services/functions";
import profilePicture from "../../assets/profile-picture.png";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import BtnNavbar from "../ButtonIcon/ButtonIcon";
import { FaUsers } from "react-icons/fa";
import { RiLoginCircleLine, RiLogoutCircleLine} from "react-icons/ri";
const Footer = () => {
  const users = userList;
  const userRdxData = useSelector(userData);
  return (
    <div className="flex f-column align-c footer">
      {!userRdxData.user.name ? (
        <>
          <BtnNavbar
            ReactIcon={FaUsers}
            text={"Register"}
            path={"register"}
          ></BtnNavbar>
          <BtnNavbar
            ReactIcon={RiLoginCircleLine}
            text={"Login"}
            path={"login"}
          ></BtnNavbar>
        </>
      ) : (
        <div className="searchUsers-container">
          <input type="text" placeholder="Buscar a un usuario" />
          <div className="usersFiltered"></div>
        </div>
      )}
    </div>
  );
};

export default Footer;
