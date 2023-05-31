import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { firstToUpperCase } from "../../services/functions";
import "./Navbar.css";
import { BiHome, BiMessageAltCheck } from "react-icons/bi";
import { FiHash } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { RiLoginCircleLine, RiLogoutCircleLine} from "react-icons/ri";
import profilePicture from "../../assets/profile_picture.jpg";
import ButtonIcon from "../Btn-navbar/Btn-navbar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userRdxData = useSelector(userData);
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
          {userRdxData.user.email ? (
            <>
              <ButtonIcon
                ReactIcon={BiHome}
                text={"Inicio"}
                path={""}
              ></ButtonIcon>
              <ButtonIcon
                ReactIcon={FiHash}
                text={"Descubre"}
                path={""}
              ></ButtonIcon>
              <ButtonIcon
                ReactIcon={BsBell}
                text={"Notificaciones"}
                path={""}
              ></ButtonIcon>
              <ButtonIcon
                ReactIcon={BiMessageAltCheck}
                text={"Mensajes"}
                path={""}
              ></ButtonIcon>
              <ButtonIcon
                ReactIcon={CgProfile}
                text={"Perfil"}
                path={"profile"}
              ></ButtonIcon>
              <ButtonIcon
                ReactIcon={RiLogoutCircleLine}
                text={"Logout"}
				onClick={()=> {
          dispatch(logout())
          navigate("/")
        }}
              ></ButtonIcon>
            </>
          ) : (
            <>
			<ButtonIcon
                ReactIcon={FaUsers}
                text={"Register"}
                path={"register"}
              ></ButtonIcon>
              <ButtonIcon
                ReactIcon={RiLoginCircleLine}
                text={"Login"}
                path={"login"}
              ></ButtonIcon>
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
                {firstToUpperCase(userRdxData.user.name)}
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
