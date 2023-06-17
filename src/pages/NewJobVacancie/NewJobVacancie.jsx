import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { InputText } from "../../common/InputText/InputText";
import { createVacancie } from "../../services/apiCalls";
import { AllVacancieInfoAdded } from "../../services/functions";
import { userData } from "../userSlice";
import "./NewJobVacancie.css";

const NewJobVacancie = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);

  const [credentials, setCredentials] = useState({
    created_by: "",
    charge_name: "",
    description: "",
    sector: "",
    last_day: "",
    location: "",
    question_one: "",
    question_two: "",
    question_three: "",
  });

  const credentialsHandler = async (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const today = new Date().toISOString().split("T")[0];

  const submitInfo = async () => {
    setCredentials((prevState) => ({
      ...prevState,
      created_by: userRdxData.user.id,
    }));
    if (AllVacancieInfoAdded(credentials)) {
      createVacancie(credentials, userRdxData.token)
        .then((res) => {
          navigate("/profile");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          navigate("/");
        });
    }
  };
  useEffect(() => {
    if (!userRdxData.user.name) {
      navigate("/");
    } else if (userRdxData.user.rol === "user") {
      toast.error("Tu rol debe ser empresa para crear un empleo");
      navigate("/");
    }
  }, []);

  return (
    <div className="flex align-c f-column edit-container">
      <h1>Crea una nueva oferta</h1>
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
        <div className="flex f-column justify-c original-info">
          <p>Nombre del cargo: *</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Ej.: Director de fotografía..."}
          name={"charge_name"}
          handler={credentialsHandler}
          required={true}
          value={credentials.charge_name}
        />
      </label>
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
        <div className="flex f-column justify-c original-info">
          <p>Sector del proyecto: *</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Ej.: Cine"}
          name={"sector"}
          handler={credentialsHandler}
          required={true}
          value={credentials.sector}
        />
      </label>
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
        <div className="flex f-column justify-c original-info">
          <p>Ubicación: *</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Ej.: Las Palmas de Gran Canaria"}
          name={"location"}
          handler={credentialsHandler}
          required={true}
          value={credentials.location}
        />
      </label>
      <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
        <div className="flex f-column justify-c original-info">
          <p>Descripcion del puesto: *</p>
        </div>
        <textarea
          type="text"
          className="input-textarea"
          placeholder="E.: Director de fotografía para videoclip ..."
          name="description"
          onChange={(e) => credentialsHandler(e)}
          required
          value={credentials.description}
          style={{ width: 100 + "%" }}
        />
      </label>
      <div className="flex f-column align-c justify-c questions-container">
        <p>Añade hasta 3 preguntas para los usuarios que se presenten</p>
        <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
          <div className="flex f-column justify-c original-info">
            <p>Primera pregunta:</p>
          </div>
          <InputText
            type={"text"}
            className={"input"}
            placeholder={"Ej.: ¿Cuentas con equipo propio?"}
            name={"question_one"}
            handler={credentialsHandler}
            required={true}
            value={credentials.question_one}
          />
        </label>
        <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
          <div className="flex f-column justify-c original-info">
            <p>Segunda pregunta:</p>
          </div>
          <InputText
            type={"text"}
            className={"input"}
            placeholder={"Ej.: ¿Cuánta experiencia tienes en el cargo?"}
            name={"question_two"}
            handler={credentialsHandler}
            required={true}
            value={credentials.question_two}
          />
        </label>
        <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
          <div className="flex f-column justify-c original-info">
            <p>Tercera pregunta:</p>
          </div>
          <InputText
            type={"text"}
            className={"input"}
            placeholder={"Ej.: ¿Algo que hayamos podido ver?"}
            name={"question_three"}
            handler={credentialsHandler}
            required={true}
            value={credentials.question_three}
          />
        </label>
      </div>
      <div className="flex align-c justify-c date-label-container">
        <label className="flex f-column align-c justify-c date-label purpleGradient-box">
          <div className="flex f-column align-c justify-c original-info">
            <p>Fecha máxima para presentarse: *</p>
          </div>
          <input
            type="date"
            name="last_day"
            onChange={(e) => credentialsHandler(e)}
            min={today}
          />
        </label>
      </div>
      <div className="flex btn-container">
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

export default NewJobVacancie;
