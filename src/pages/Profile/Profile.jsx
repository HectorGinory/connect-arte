import React, { useEffect, useState } from "react";
import profilePicture from "../../assets/profile-picture.png";
import profileBanner from "../../assets/banner-profile.png";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { firstToUpperCase, printDateProfile } from "../../services/functions";
import "./Profile.css";
import { getUserByUserName } from "../../services/apiCalls";
import { toast } from "sonner";
import { FaPencilAlt, FaUserPlus } from "react-icons/fa";
import ButtonIcon from "../../common/Btn-navbar/Btn-navbar";
import Spinner from "../../common/Spinner/Spinner";

const Profile = () => {
  const location = useLocation();
  const params = useParams();
  const [ownerProfile, setOwnerProfile] = useState(false);
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    if (!userRdxData.user.name) {
      navigate("/");
    }
    if (!params.username || params.username === userRdxData.user.username) {
      getUserByUserName(userRdxData.user.username)
        .then(async (res) => {
          setOwnerProfile(true);
          await setUser(res.user);
        })
        .catch((err) => {
          toast.error("Cant get your user info, try again.");
          navigate("/");
        });
    } else {
      getUserByUserName(params.username)
        .then(async (res) => {
          setOwnerProfile(false);
          await setUser(res.user);
          console.lo
        })
        .catch((err) => {
          toast.error("Cant get your user info, try again.");
          navigate("/");
        });
    }
  }, []);
  
  return (
    <div className="flex justify-c profile-container">
      {user ? (
        <div className="flex align-c f-column profile-info ">
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
            <div className="flex align-c justify-e edit-profile">
              {ownerProfile && (
                <ButtonIcon
                  ReactIcon={FaPencilAlt}
                  onClick={() => navigate('./editInfo')}
                  text={"Editar Perfil"}
                ></ButtonIcon>
              )}
            </div>
            <div className="user-info">
              <h1>{firstToUpperCase(user.name)}</h1>
              <h2>@{firstToUpperCase(user.username)}</h2>
              <p>{user.location}</p>
              <p>{printDateProfile(user.dateOfCreation)}</p>
              <p>{"Tiene " + user.contacts.length + " contactos"}</p>
              <div className="common-contacts"></div>
              <div className="contact-section">
                {!ownerProfile && (
                  <ButtonIcon
                    ReactIcon={FaUserPlus}
                    onClick={() => console.log()}
                    text={"Contactar"}
                  ></ButtonIcon>
                )}
              </div>
              <div className="about-container">
              <h3>Acerca de</h3>
              <p>{user.description}</p>
            </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Spinner/>
        </>
      )}
    </div>
  );
};

export default Profile;
