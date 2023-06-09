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
import "./EditEducation.css";
import { toast } from "sonner";
import { checkNoInfoEmpty, firstToUpperCase } from "../../services/functions";

const EditEducation = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);

  const today = new Date().toISOString().split("T")[0];

  const [credentials, setCredentials] = useState({
    school: "",
    title: "",
    discipline: "",
    date_start: "",
    date_end: "",
    description: "",
  });

  const credentialsHandler = async (e) => {
    await setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitInfo = async () => {
    if(checkNoInfoEmpty(credentials)){
      editEducationByUserName(
        userRdxData.user.username,
        credentials,
        userRdxData.token
      )
        .then(() => {
          toast.success("Información añadida con éxito");
          navigate("/profile");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })
    }
  };
  useEffect(()=> {
    if (!userRdxData.user.name) {
      navigate("/");
    } else if(userRdxData.user.rol === "company") {
      toast.error("Tu rol debe ser usuario para editar esta información")
      navigate("/");
    }
},[]);
  return (
    <div className="flex align-c f-column edit-container ">
      <h1>Añade dónde te has formado</h1>
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
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
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
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
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
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
        <label className="flex f-column justify-c align-c date-label purpleGradient-box">
          <div className="flex f-column justify-c align-c original-info">
            <p>Fecha de incio:</p>
          </div>
          <input
            type="date"
            name="date_start"
            onChange={(e) => credentialsHandler(e)}
            max={today}
          />
        </label>
        <label className="flex f-column justify-c align-c date-label purpleGradient-box">
          <div className="flex f-column justify-c align-c original-info">
            <p>Fecha de fin:</p>
          </div>
          {credentials.date_start !== "" && (
            <input
              type="date"
              name="date_end"
              min={new Date(credentials.date_start).toISOString().split("T")[0]}
              onChange={(e) => credentialsHandler(e)}
              max={today}
            />
          )}
        </label>
      </div>
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
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
          style={{ width: 95 + "%" }}
        />
      </label>
      <div className="flex align-c justify-c btn-container">
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
