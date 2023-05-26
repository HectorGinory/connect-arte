import React from "react";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { firstToUpperCase } from "../../services/functions";
import "./Navbar.css";
import { BiHome, BiMessageAltCheck } from "react-icons/bi";
import { FiHash } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import profilePicture from "../../assets/profile_picture.jpg";
import BtnNavbar from "../Btn-navbar/Btn-navbar";

const Navbar = () => {
  const userRdxData = useSelector(userData);

  return (
    <div className="flex align-c f-column side-nav navbar-container">
      <div className="flex align-c title">
        <h1>Connect-Arte</h1>
        <span>C</span>
      </div>
      <div className="flex align-c justify-c navigation-container">
        <div className="flex align-c f-column justify-c hamburguer-container">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="flex f-column menu-container">
          {userRdxData.user.data ? (
            <>
              <BtnNavbar
                ReactIcon={BiHome}
                text={"Inicio"}
                path={""}
              ></BtnNavbar>
              <BtnNavbar
                ReactIcon={FiHash}
                text={"Descubre"}
                path={""}
              ></BtnNavbar>
              <BtnNavbar
                ReactIcon={BsBell}
                text={"Notificaciones"}
                path={""}
              ></BtnNavbar>
              <BtnNavbar
                ReactIcon={BiMessageAltCheck}
                text={"Mensajes"}
                path={""}
              ></BtnNavbar>
              <BtnNavbar
                ReactIcon={CgProfile}
                text={"Perfil"}
                path={""}
              ></BtnNavbar>
            </>
          ) : (
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
          )}
        </div>
      </div>
	  {userRdxData.user.name && (

      <div className="flex align-c justify-c profile-navigation">
        <div className="image-container">
          <img src={profilePicture} className="img" />
        </div>
        <div className="flex f-column justify-c username-container">
            <>
              <p>
                {firstToUpperCase(userRdxData.user.name) +
                  " " +
                  firstToUpperCase(userRdxData.user.surnames[0])}
              </p>
              <p>{"@" + firstToUpperCase(userRdxData.user.username)}</p>
            </>
        </div>
      </div>
	  )}

    </div>
  );
};

export default Navbar;
