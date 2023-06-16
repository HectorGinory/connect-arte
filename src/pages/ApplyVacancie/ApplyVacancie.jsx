import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { InputText } from "../../common/InputText/InputText";
import Spinner from "../../common/Spinner/Spinner";
import {
  applyVacancie,
  getUserByUserName,
  getVacancieById,
} from "../../services/apiCalls";
import { userData } from "../userSlice";
import './ApplyVacancie.css'

const ApplyVacancie = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const [credentials, setCredentials] = useState({
    answer_one: "",
    answer_two: "",
    answer_three: "",
    presentation: "",
  });
  const vacancieId = useParams().id;
  const [vacancie, setVacancie] = useState({});

  const credentialsHandler = async (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!userRdxData.user.name) {
      navigate("/");
    } else if(userRdxData.user.rol !== "user") {
      toast.error("Tu rol debe ser usuario para aplicar a un empleo")
      navigate("/");
    }
    getVacancieById(vacancieId).then((res) => {
      setVacancie(res.data);
    });
    getUserByUserName(userRdxData.user.username).then((res) => {});
  }, []);

  useEffect(() => {
    setCredentials((prevState) => ({
      ...prevState,
      user_id: userRdxData.user.id,
      username: userRdxData.user.username,
    }));
  }, [userRdxData]);

  const submitInfo = async () => {
    applyVacancie(vacancieId, credentials)
      .then((res) => {
        navigate("/profile");
      })
      .catch((e) => {
        toast.error("Algo fue mal");
      });
  };
  return (
    <div className="flex align-c f-column vacancie-apply-container">
      {vacancie._id ? (
        <div className="flex f-column align-c vacancie-form-container">
          <h2>Rellena el formulario</h2>
          {vacancie.question_one && (
            <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
              <div className="flex f-column justify-c original-info">
                <p>{vacancie.question_one}</p>
              </div>
              <InputText
                type={"text"}
                className={"input"}
                placeholder={"Insert name"}
                name={"answer_one"}
                handler={credentialsHandler}
                required={true}
                value={credentials.answer_one}
              />
            </label>
          )}
          {vacancie.question_two && (
            <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
              <div className="flex f-column justify-c original-info">
                <p>{vacancie.question_two}</p>
              </div>
              <InputText
                type={"text"}
                className={"input"}
                placeholder={"Insert name"}
                name={"answer_two"}
                handler={credentialsHandler}
                required={true}
                value={credentials.answer_two}
              />
            </label>
          )}
          {vacancie.question_three && (
            <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
              <div className="flex f-column justify-c original-info">
                <p>{vacancie.question_three}</p>
              </div>
              <InputText
                type={"text"}
                className={"input"}
                placeholder={"Insert name"}
                name={"answer_three"}
                handler={credentialsHandler}
                required={true}
                value={credentials.answer_three}
              />
            </label>
          )}
          <label className="flex align-c f-column justify-c justify-sb purpleGradient-box">
            <div className="flex f-column justify-c original-info">
              <p>Aprovecha para presentarte!</p>
            </div>
            <textarea
              type="text"
              className="input-textarea"
              placeholder="E.: Mi nombre es X soy ..."
              name="presentation"
              onChange={(e) => credentialsHandler(e)}
              required
              value={credentials.presentation}
              style={{ width: 90 + "%" }}
            />
          </label>
          <div className="flex align-c btn-container">
            <button onClick={() => submitInfo()} className="btn">
              Enviar
            </button>
            <button onClick={() => navigate("/jobsearch")} className="btn">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex align-c justify-c">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ApplyVacancie;
