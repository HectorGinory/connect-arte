import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { firstToUpperCase } from "../../services/functions";
import "./Navbar.css";
import { BiHome, BiMessageAltCheck } from "react-icons/bi";
import { FiHash } from "react-icons/fi";
import { BsBell } from "react-icons/bs";

const Navbar = () => {
  const dispatch = useDispatch();
  const userRdxDate = useSelector(userData);
  console.log(userRdxDate);
  return (
    <div className="flex align-c f-column side-nav navbar-container">
      <div className="flex align-c title">
        <h1>Connect-Arte</h1>
      </div>
      <div className="flex align-c justify-c navigation-container">
        <div className="flex f-column menu-container">
          <button className="flex align-c btn-navigation">
            <div className="flex align-c justify-c icon-btn"><BiHome /></div>
            <p>Inicio</p>
          </button>
          <button className="flex align-c btn-navigation">
            <div className="flex align-c justify-c icon-btn"><FiHash/></div>
            <p>Descubre</p>
          </button>
          <button className="flex align-c btn-navigation">
            <div className="flex align-c justify-c icon-btn"><BsBell/></div>
            <p>Notificaciones</p>
          </button>
          <button className="flex align-c btn-navigation">
            <div className="flex align-c justify-c icon-btn"><BiMessageAltCheck/></div>
            <p>Mensajes</p>
          </button>
        </div>
      </div>
      <div className="flex align-c justify-c profile-navigation">
        <div className="image-container"></div>
        <div className="username-container">
          {userRdxDate.user && (
            <>
              <p>
                {firstToUpperCase(userRdxDate.user.name) +
                  " " +
                  firstToUpperCase(userRdxDate.user.surnames[0]) +
                  " " +
                  firstToUpperCase(userRdxDate.user.surnames[1])}
              </p>
              <p>{"@" + firstToUpperCase(userRdxDate.user.username)}</p>
            </>
          )}
        </div>
        <div className="options-container"></div>
      </div>
    </div>
  );
};

export default Navbar;
