import React, { useEffect, useState } from "react";
import "./Footer.css";
import { userList } from "../../services/provisionalStuff";
import { firstToUpperCase } from "../../services/functions";
import profilePicture from "../../assets/profile-picture.png";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import BtnNavbar from "../ButtonIcon/ButtonIcon";
import { FaUsers } from "react-icons/fa";
import { RiLoginCircleLine, RiLogoutCircleLine } from "react-icons/ri";
import {
  getUsersByInterests,
  getUsersByRegExp,
  getVacancies,
} from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const [usersRecommended, setUsersRecommended] = useState([]);
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    let criteria;
    if (userRdxData.user.interests) {
      criteria = userRdxData.user.interests.join("|");
    } else {
      criteria = "";
    }
    getUsersByInterests(criteria, userRdxData.token)
      .then((res) => {
        setUsersRecommended(res.users);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userRdxData.user]);

  const criteriaHandler = (e) => {
    setCriteria(e.target.value);
  };

  useEffect(() => {
    if(criteria !== "") {
      const bringUsers = setTimeout(() => {
        getUsersByRegExp(criteria, userRdxData.token)
          .then((res) => {
            setUsersRecommended(res.user);
          })
          .catch((error) => console.log(error));
      }, 375);
      return () => clearTimeout(bringUsers);
    } else {
      getUsersByInterests(criteria, userRdxData.token)
      .then((res) => {
        setUsersRecommended(res.users);
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }, [criteria]);

  return (
    <div className="flex f-column align-c footer">
      {!userRdxData.user.name ? (
        <div className="flex f-column align-c justify-c btn-footer">
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
        </div>
      ) : (
        <div className="flex f-column align-c searchUsers-container">
          <p>Busca a otros usuarios</p>
          <input
            type="text"
            placeholder="Buscar a un usuario"
            onChange={(e) => criteriaHandler(e)}
            name="criteria"
          />
          <div className="usersFiltered">
            {usersRecommended.length !== 0 &&
              usersRecommended.map((user, index) => {
                if(user.username !== userRdxData.user.username) {
                  return (
                  <div
                    className="flex align-c f-column user-container"
                    key={index}
                    onClick={() => navigate(`/user/${user.username}`)}
                  >
                    <p>{user.name}</p>
                    <p>{user.username}</p>
                  </div>
                );
                }
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
