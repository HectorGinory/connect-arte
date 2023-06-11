import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";
import { useState } from "react";
import { useEffect } from "react";
import {
  editEducationByUserName,
  getUserByUserName,
} from "../../services/apiCalls";

import { InputText } from "../../common/InputText/InputText";
import './EditEducation.css'
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "sonner";
import { firstToUpperCase } from "../../services/functions";

const EditEducation = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);

  const [user, setUser] = useState({});
  const [credentials, setCredentials] = useState({
    school: "",
    title: "",
    discipline: "",
    date_start: "",
    date_end: "",
    description: ""
  });

  useEffect(() => {
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


  const submitInfo = async () => {
    editEducationByUserName(userRdxData.user.username, credentials)
      .then((res) => {
        navigate("/profile");
      })
      .catch(() => {
        toast.error("Ups, something go wrong");
      });
  };
  return (
    <div className="flex align-c justify-c f-column edit-container">
      <h1>Añade tu experiencia</h1>
      <label className="flex align-c f-column justify-c justify-sb">
        <div className="flex f-column justify-c original-info">
          <p>Escuela:</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Ej.: Escuela de baile..."}
          name={"school"}
          handler={credentialsHandler}
          required={true}
          value={credentials.school}
        />
      </label>
      <label className="flex align-c f-column justify-c justify-sb">
        <div className="flex f-column justify-c original-info">
          <p>Título:</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Ej.: Interpretación ante la cámara"}
          name={"title"}
          handler={credentialsHandler}
          required={true}
          value={credentials.title}
        />
      </label>
      <label className="flex align-c f-column justify-c justify-sb">
        <div className="flex f-column justify-c original-info">
          <p>Disciplina:</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Ej.: Bellas artes"}
          name={"discipline"}
          handler={credentialsHandler}
          required={true}
          value={credentials.discipline}
        />
      </label>
      <div className="flex align-c justify-sb date-label-container">
      <label className="flex f-column justify-c date-label">
        <div className="flex f-column justify-c original-info">
          <p>Fecha de incio:</p>
        </div>
        <input type="date" name="date_start" onChange={(e)=>credentialsHandler(e)}/>
      </label>
      <label className="flex f-column justify-c date-label">
        <div className="flex f-column justify-c original-info">
          <p>Fecha de fin:</p>
        </div>
        <input type="date" name="date_end" onChange={(e)=>credentialsHandler(e)}/>
      </label>
      </div>
      <label className="flex align-c f-column justify-c justify-sb">
        <div className="flex f-column justify-c original-info">
          <p>Descripcion de la educación:</p>
        </div>
        <textarea
              type="text"
              className="input-textarea"
              placeholder="E.: Baile contemporáneo, ..."
              name="description"
              onChange={(e) => credentialsHandler(e)}
              required
              value={credentials.description}
              style={{width: 100 + '%'}}
            />
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

export default EditEducation;
