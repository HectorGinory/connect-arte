import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";
import { useState } from "react";
import { useEffect } from "react";
import {
  editInfoByUserName,
  getContriesList,
  getUserByUserName,
} from "../../services/apiCalls";

import "./EditProfileInfo.css";
import { InputText } from "../../common/InputText/InputText";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "sonner";
import { firstToUpperCase } from "../../services/functions";

const EditProfileInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);

  const [user, setUser] = useState({});
  const [userRol, setUserRol] = useState("");
  const [countries, setCountries] = useState([]);
  const [countrieList, setCountrieList] = useState([]);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    username: "",
    description: "",
    location: "",
    rol: "",
  });

  useEffect(() => {
    getContriesList().then((res) => {
      const countriesName = res.map((res) => res.name.common.toLowerCase());
      setCountries(countriesName);
    });
    getUserByUserName(userRdxData.user.username)
      .then(async (res) => {
        await setUser(res.user);
        await setUserRol(res.user.rol);
      })
      .catch((err) => {
        toast.error("Cant get your user info, try again.");
        navigate("/");
      });
  }, []);

  useEffect(()=> {
    setCredentials((prev) => ({
      ...prev,
      rol: userRol,
    }));
  }, [userRol])

  const credentialsHandler = async (e) => {
    await setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const locationCredentialHandler = async (e) => {
    await setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    const regExp = new RegExp(e.target.value.toLowerCase());
    const newList = countries.filter((countrie) => countrie.match(regExp));
    await setCountrieList(newList);
  };

  const submitInfo = async () => {
    if (credentials.description.length > 150) {
      return toast.error(
        "La descripcion debe tener un máximo de 150 caracteres"
      );
    }
    if (credentials.name.length > 20) {
      return toast.error("El nombre debe tener un máximo de 20 caracteres");
    }
    editInfoByUserName(userRdxData.user.username, credentials)
      .then((res) => {
        dispatch(login(res));
        navigate("/profile");
      })
      .catch(() => {
        toast.error("Ups, something go wrong");
      });
  };

  const changerol = async () => {
    if (userRol === "user") {
      await setUserRol("company");
    } else {
      await setUserRol("user");
    }
  };

  return (
    <div className="flex align-c f-column edit-info-container">
      <h1>Change your profile info</h1>
      <label className="flex align-c f-column justify-c justify-sb">
        <div className="flex f-column justify-c original-info">
          <p>Actual name:</p>
          <p>{user.name}</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Insert name"}
          name={"name"}
          handler={credentialsHandler}
          required={true}
          value={credentials.name}
        />
        <p className="name-length">{credentials.name.length}/20</p>
      </label>
      <label className="flex align-c f-column justify-c justify-sb">
        <div className="flex f-column justify-c original-info">
          <p>Actual email:</p>
          <p>{user.email}</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Insert new email"}
          name={"email"}
          handler={credentialsHandler}
          required={true}
          value={credentials.email}
        />
      </label>
      <label className="flex align-c f-column justify-c justify-sb">
        <div className="flex f-column justify-c original-info">
          <p>Actual username:</p>
          <p>{user.username}</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Insert username"}
          name={"username"}
          handler={credentialsHandler}
          required={true}
          value={credentials.username}
        />
      </label>
      <label className="flex align-c f-column justify-c justify-sb">
        <div className="flex f-column justify-c original-info">
          <p>Actual description:</p>
          {user.description === "" ? (
            <br />
          ) : (
            <p className="descrition">{user.description}</p>
          )}
        </div>
        <div className="description-input">
          <div className="input-container">
            <textarea
              type="text"
              className="input"
              placeholder="Insert new description"
              name="description"
              onChange={(e) => credentialsHandler(e)}
              required
              value={credentials.description}
              style={{ width: 100 + "%" }}
            />
          </div>
          <p>{credentials.description.length}/150</p>
        </div>
      </label>
      <label className="flex align-c f-column justify-c justify-sb">
        <div className="flex f-column justify-c original-info">
          <p>Actual location:</p>
          {user.location === "" ? <br /> : <p>{user.location}</p>}
        </div>
        <div className="input-section">
          <InputText
            type={"text"}
            className={"input"}
            placeholder={"Insert location"}
            name={"location"}
            handler={locationCredentialHandler}
            required={true}
            value={firstToUpperCase(credentials.location)}
          />
          <div className="country-map">
            {credentials.location === "" ? (
              <br />
            ) : (
              countrieList.map((countrie, index) => {
                return (
                  <p
                    key={index}
                    onClick={() => {
                      setCredentials((prev) => ({
                        ...prev,
                        location: countrie,
                      }));
                    }}
                  >
                    {firstToUpperCase(countrie)}
                  </p>
                );
              })
            )}
          </div>
        </div>
      </label>
      <div className="change-rol-ontainer">
        <button onClick={() => changerol()} className="changerol-button">
          <div className="flex align-c justify-c icon-btn">
            {/* <ReactIcon /> */}
          </div>
          <p>
            {userRol === "user"
              ? "Tu rol actual es usuario"
              : "Tu rol actual es empresa"}
          </p>
        </button>
      </div>
      <div className="btn-container">
        <button onClick={() => submitInfo()} className="btn">
          Aceptar cambios
        </button>
        <button onClick={() => navigate("/profile")} className="btn">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditProfileInfo;
