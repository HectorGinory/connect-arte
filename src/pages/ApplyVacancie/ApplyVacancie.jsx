import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { InputText } from "../../common/InputText/InputText";
import Spinner from "../../common/Spinner/Spinner";
import { getUserByUserName, getVacancieById } from "../../services/apiCalls";
import { userData } from "../userSlice";

const ApplyVacancie = () => {
  const userRdxData = useSelector(userData);
  const [credentials, setCredentials] = useState({});
  const vacancieId = useParams().id;
  const [vacancie, setVacancie] = useState({});

  const credentialsHandler = async (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getVacancieById(vacancieId).then((res) => {
      setVacancie(res.data);
      console.log(res.data);
      console.log(userRdxData);
    });
    getUserByUserName(userRdxData.user.username).then((res) => {});
  }, []);
  return (
    <div className="">
      {vacancie._id ? (
        <div className="vacancie-form-container">
          <h2>Rellena el formulario</h2>
          {vacancie.question_one && (
            <label className="flex align-c f-column justify-c justify-sb">
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
            <label className="flex align-c f-column justify-c justify-sb">
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
            <label className="flex align-c f-column justify-c justify-sb">
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
