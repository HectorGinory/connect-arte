import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";
import { useState } from "react";
import { useEffect } from "react";
import {
  editEducationByUserName,
  editExperienceByUserName,
  getContriesList,
  getUserByUserName,
} from "../../services/apiCalls";

import { InputText } from "../../common/InputText/InputText";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "sonner";
import { checkNoInfoEmpty, firstToUpperCase } from "../../services/functions";

const EditEducation = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const [credentials, setCredentials] = useState({
    position: "",
    company: "",
    location: "",
    date_start: "",
    date_end: "",
    description: "",
  });
  const today = new Date().toISOString().split("T")[0];
  const credentialsHandler = async (e) => {
    await setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitInfo = async () => {
    if(checkNoInfoEmpty(credentials)) {
      editExperienceByUserName(
        userRdxData.user.username,
        credentials,
        userRdxData.token
      )
        .then((res) => {
          toast.error("Información añadida con éxito");
          navigate("/profile");
        })
        .catch(() => {
          toast.error("Ups, something go wrong");
        });
    }
  };

  useEffect(() => {
    if (!userRdxData.user.name) {
      navigate("/");
    } else if(userRdxData.user.rol !== "user") {
      toast.error("Tu rol debe ser usuario para editar esta información")
      navigate("/");
    }
  }, []);

  return (
    <div className="flex align-c f-column edit-container ">
      <h1>Añade tu experiencia</h1>
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
        <div className="flex f-column justify-c original-info">
          <p>Cargo:</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Ej.: Actor principal"}
          name={"position"}
          handler={credentialsHandler}
          required={true}
          value={credentials.position}
        />
      </label>
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
        <div className="flex f-column justify-c original-info">
          <p>Empresa:</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Ej.: Netflix"}
          name={"company"}
          handler={credentialsHandler}
          required={true}
          value={credentials.company}
        />
      </label>
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
        <div className="flex f-column justify-c original-info">
          <p>Ubicación:</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Ej.: Madrid, España"}
          name={"location"}
          handler={credentialsHandler}
          required={true}
          value={credentials.location}
        />
      </label>
      <div className="flex align-c justify-sb date-label-container">
        <label className="flex f-column align-c justify-sb date-label purpleGradient-box">
          <div className="flex f-column align-c justify-c original-info">
            <p>Fecha de incio:</p>
          </div>
          <input
            type="date"
            name="date_start"
            onChange={(e) => credentialsHandler(e)}
            max={today}
          />
        </label>
        <label className="flex f-column align-c justify-sb date-label purpleGradient-box">
          <div className="flex f-column align-c justify-c original-info">
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
          <p>Descripcion del cargo:</p>
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
