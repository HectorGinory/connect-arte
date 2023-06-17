import React, { useEffect, useState } from "react";
import profilePicture from "../../assets/profile-picture.png";
import { login, updateUserRdx, userData } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import {
  firstToUpperCase,
  formatedDate,
  printDateProfile,
} from "../../services/functions";
import "./Profile.css";
import {
  editEducationByUserName,
  followUser,
  getJobVacanciesByUserId,
  getUserByUserName,
  removeEducationByUserName,
  removeExperienceByUserName,
  unfollowUser,
} from "../../services/apiCalls";
import { toast } from "sonner";
RiDeleteBin6Fill;
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPencilAlt, FaUserPlus } from "react-icons/fa";
import ButtonIcon from "../../common/ButtonIcon/ButtonIcon";
import Spinner from "../../common/Spinner/Spinner";
import jwt_decode from 'jwt-decode';

const Profile = () => {
  const params = useParams();
  const [ownerProfile, setOwnerProfile] = useState(false);
  const [jobVacancies, setJobVacancies] = useState([]);
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(userRdxData.user)
    if (!userRdxData.user.name) {
      navigate("/");
    }
    let username;
    if (!params.id || params.id === userRdxData.user.username) {
      setOwnerProfile(true);
      username = userRdxData.user.username;
    } else {
      setOwnerProfile(false);
      username = params.id;
    }
    getUserByUserName(username, userRdxData.token)
      .then(async (res) => {
        await setUser(res.user);
        console.log(res.user)
        if (res.user.rol === "company") {
          getJobVacanciesByUserId(res.user._id, userRdxData.token)
            .then((res) => {
              setJobVacancies(res.data);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              navigate("/");
            });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/");
      });
  }, [params, userRdxData]);

  const removeEducation = (education) => {
    removeEducationByUserName(
      userRdxData.user.username,
      education,
      userRdxData.token
    ).then((res) => {
      setUser(res.user);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      navigate("/");
    })
  };

  const removeExperience = (experience) => {
    removeExperienceByUserName(
      userRdxData.user.username,
      experience,
      userRdxData.token
    ).then((res) => {
      setUser(res.user);
    });
  };

  const followUserBtn = () => {
    followUser(userRdxData.token, params.id).then((res)=>{
      const user = jwt_decode(res.token)
      dispatch(updateUserRdx(user))
      dispatch(login(res))
    }).catch((e)=>{
      console.log(e)
      toast.error("No ha sido posible seguir a este usuario")
    })
  }

  const unfollowUserBtn = () => {
    unfollowUser(userRdxData.token, params.id).then((res)=>{
      const user = jwt_decode(res.token)
      console.log(user)
      dispatch(updateUserRdx(user))
      dispatch(login(res))
    }).catch(()=>{
      toast.error("No ha sido posible seguir a este usuario")
    })
  }

  return (
    <div className="flex justify-c profile-container">
      {user ? (
        <div className="flex align-c f-column profile-info ">
          <div className="profile-img">
            <div className="banner-profile purpleGradient-box " />
            <img
              src={profilePicture}
              alt="profile-picture"
              className="profile-picture"
            />
          </div>
          <div className="profile-text">
            <div className="flex align-c justify-e edit-profile">
              {ownerProfile && (
                <ButtonIcon
                  ReactIcon={FaPencilAlt}
                  onClick={() => navigate("/profile/editInfo")}
                  text={"Editar Perfil"}
                ></ButtonIcon>
              )}
            </div>
            <div className="user-info">
              <div className="generalInfo-container">
                <h1>{firstToUpperCase(user.name)}</h1>
                <h2>@{firstToUpperCase(user.username)}</h2>
                <p>{firstToUpperCase(user.location)}</p>
                <p>{printDateProfile(user.dateOfCreation)}</p>
                <p>{user.followers.length === 1 ? "Tiene " + user.followers.length + " seguidor" : "Tiene " + user.followers.length + " seguidores"}</p>
                <div className="common-contacts"></div>
                <div className="contact-section">
                  {!ownerProfile && 
                  <>
                  {!userRdxData.user.following.includes(user._id) ?
                      <ButtonIcon
                      ReactIcon={FaUserPlus}
                      onClick={() =>followUserBtn()}
                      text={"Seguir"}
                    ></ButtonIcon>:
                                        <ButtonIcon
                      ReactIcon={FaUserPlus}
                      onClick={() =>unfollowUserBtn()}
                      text={"Dejar de seguir"}
                    ></ButtonIcon>
                    }
                  </>

                  }
                </div>
              </div>
              {user.description !== "" && (
                <div className="about-container">
                  <div className="flex align-c title purpleGradient-box">
                    <h3>Acerca de</h3>
                  </div>
                  <p>{user.description}</p>
                </div>
              )}
              {user.rol === "user" ? (
                <>
                  <div className="flex justify-c f-column info-section">
                    <div className="flex align-c justify-sb info-title">
                      <div className="flex justify-sb align-c title purpleGradient-box">
                        <h3>Educación</h3>
                        {ownerProfile && (
                          <ButtonIcon
                            ReactIcon={FaPencilAlt}
                            onClick={() => navigate("/profile/EditEducation")}
                            text={"Añadir educación"}
                          ></ButtonIcon>
                        )}
                      </div>
                    </div>
                    <div className="data-container">
                      {user.education.map((education, index) => {
                        return (
                          <div className="flex f-column data" key={index}>
                            <div className="flex f-column principal-info">
                              <div>
                                <p className="name-data">
                                  {education.title} - {education.school}
                                </p>
                                <p className="extra-data">
                                  {education.discipline}
                                </p>
                              </div>
                              <div>
                                <p>
                                  Desde: {formatedDate(education.date_start)}
                                </p>
                                <p>Hasta: {formatedDate(education.date_end)}</p>
                              </div>
                            </div>
                            <div className="description">
                              <p>{education.description}</p>
                            </div>
                            {ownerProfile && (
                              <ButtonIcon
                                ReactIcon={RiDeleteBin6Fill}
                                text="Eliminar"
                                onClick={() => removeEducation(education)}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-c f-column info-section">
                    <div className="flex align-c justify-sb info-title">
                      <div className="flex justify-sb align-c title purpleGradient-box">
                        <h3>Experiencia</h3>
                        {ownerProfile && (
                          <ButtonIcon
                            ReactIcon={FaPencilAlt}
                            onClick={() => navigate("/profile/EditExperience")}
                            text={"Añadir experiencia"}
                          ></ButtonIcon>
                        )}
                      </div>
                    </div>
                    <div className="data-container">
                      {user.experience.map((experience, index) => {
                        return (
                          <div className="flex f-column data" key={index}>
                            <div className="flex f-column principal-info">
                              <div>
                                <p className="name-data">
                                  {experience.position} - {experience.company}
                                </p>
                                <p>{experience.location}</p>
                              </div>
                              <div>
                                <p>
                                  Desde: {formatedDate(experience.date_start)}
                                </p>
                                <p>
                                  Hasta: {formatedDate(experience.date_end)}
                                </p>
                              </div>
                            </div>
                            <div className="description">
                              <p>{experience.description}</p>
                            </div>
                            {ownerProfile && (
                              <ButtonIcon
                                ReactIcon={RiDeleteBin6Fill}
                                text="Eliminar"
                                onClick={() => removeExperience(experience)}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex justify-c f-column info-section">
                  <div className="flex align-c justify-sb info-title title purpleGradient-box">
                    <h3>Ofertas de empleo activas</h3>
                    {ownerProfile && (
                      <ButtonIcon
                        ReactIcon={FaPencilAlt}
                        onClick={() => navigate("/newvacancie")}
                        text={"Añadir oferta"}
                      ></ButtonIcon>
                    )}
                  </div>
                  {jobVacancies ? (
                    <div className="data-container">
                      {jobVacancies.map((vacancie, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() =>
                              navigate(`/vacancieDetail/${vacancie._id}`)
                            }
                            className="data"
                          >
                            <p className="name-data">
                              {vacancie.charge_name} - {vacancie.location}
                            </p>
                            <p className="extra-data">
                              {vacancie.user_postulated.length} usuarios
                              presentados
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <Spinner />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </div>
  );
};

export default Profile;
