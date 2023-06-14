import React, { useEffect, useState } from "react";
import profilePicture from "../../assets/profile-picture.png";
import profileBanner from "../../assets/banner-profile.png";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  firstToUpperCase,
  formatedDate,
  printDateProfile,
} from "../../services/functions";
import "./Profile.css";
import {
  editEducationByUserName,
  getJobVacanciesByUserId,
  getUserByUserName,
  removeEducationByUserName,
  removeExperienceByUserName,
} from "../../services/apiCalls";
import { toast } from "sonner";
RiDeleteBin6Fill
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPencilAlt, FaUserPlus } from "react-icons/fa";
import ButtonIcon from "../../common/ButtonIcon/ButtonIcon";
import Spinner from "../../common/Spinner/Spinner";

const Profile = () => {
  const location = useLocation();
  const params = useParams();
  const [ownerProfile, setOwnerProfile] = useState(false);
  const [jobVacancies, setJobVacancies] = useState([]);
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    if (!userRdxData.user.name) {
      navigate("/");
    }
    let username;
    if (!params.username || params.username === userRdxData.user.username) {
      setOwnerProfile(true);
      username = userRdxData.user.username;
    } else {
      setOwnerProfile(false);
      username = params.username;
    }
    getUserByUserName(username)
      .then(async (res) => {
        await setUser(res.user);
        if (res.user.rol === "company") {
          getJobVacanciesByUserId(res.user._id).then((res) => {
            setJobVacancies(res.data);
          });
        }
      })
      .catch((err) => {
        toast.error("Cant get your user info, try again.");
        navigate("/");
      });
  }, []);

  const removeEducation = (education) => {
    removeEducationByUserName(userRdxData.user.username, education).then((res)=>{
      setUser(res.user);
    })
  }

  const removeExperience = (experience) => {
    removeExperienceByUserName(userRdxData.user.username, experience).then((res)=>{
      setUser(res.user);
    })
  }

  return (
    <div className="flex justify-c profile-container">
      {user ? (
        <div className="flex align-c f-column profile-info ">
          <div className="profile-img">
          <div className="banner-profile purpleGradient-box "/>
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
                  onClick={() => navigate("./editInfo")}
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
            </div>
            {user.description !== "" &&
            <div className="about-container">
                <div className="flex align-c title purpleGradient-box">
                <h3>Acerca de</h3>
                </div>
                <p>{user.description}</p>
              </div>}
              {user.rol === "user" ? (
                <>
                  <div className="flex justify-c f-column info-section">
                    <div className="flex align-c justify-sb info-title">
                  <div className="flex justify-sb align-c title purpleGradient-box">
                      <h3>Educación</h3>
                      {ownerProfile && (
                        <ButtonIcon
                          ReactIcon={FaPencilAlt}
                          onClick={() => navigate("./EditEducation")}
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
                                <p>
                                  {education.title} - {education.school}
                                </p>
                                <p>{education.discipline}</p>
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
                            <button onClick={() => removeEducation(education)}>
                                  <RiDeleteBin6Fill />
                                </button>
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
                          onClick={() => navigate("./EditExperience")}
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
  
                                <p>
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
                            <button onClick={() => removeExperience(experience)}>
                                  <RiDeleteBin6Fill />
                                </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex justify-c f-column info-section">
                  <div className="flex align-c justify-sb info-title">
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
                          >
                            <p>{vacancie.charge_name}</p>
                            <p>
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
