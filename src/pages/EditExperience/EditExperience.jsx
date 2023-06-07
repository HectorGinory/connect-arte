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

import { InputText } from "../../common/InputText/InputText";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "sonner";
import { firstToUpperCase } from "../../services/functions";

const EditExperience = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);

  const [user, setUser] = useState({});
  const [countries, setCountries] = useState([]);
  const [countrieList, setCountrieList] = useState([]);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    username: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    getContriesList().then((res) => {
      const countriesName = res.map((res) => res.name.common.toLowerCase());
      setCountries(countriesName);
    });
    getUserByUserName(userRdxData.user.username)
      .then(async (res) => {
        await setUser(res.user);
      })
      .catch((err) => {
        toast.error("Cant get your user info, try again.");
        navigate("/");
      });
  }, []);

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
    console.log(countrieList);
  };

  const submitInfo = async () => {
    if(credentials.description.length > 150) {
      return toast.error('La descripcion debe tener un máximo de 150 caracteres')
    }
    if(credentials.name.length > 20) {
      return toast.error('El nombre debe tener un máximo de 20 caracteres')
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

export default EditExperience;
