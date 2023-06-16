import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../common/Spinner/Spinner";
import { getVacancieById, removeVacancieById } from "../../services/apiCalls";
import { formatedDate } from "../../services/functions";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import './VacancieDetail.css'

const VacancieDetail = () => {
  const vacancieId = useParams().id;
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const [vacancie, setVacancie] = useState({});

  useState(() => {
    if (!userRdxData.user.name) {
      navigate("/");
    }
    getVacancieById(vacancieId, userRdxData.token)
      .then((res) => {
        setVacancie(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const removeVacancie = () => {
    if(userRdxData.user.id === vacancie.created_by){
      removeVacancieById(vacancieId, userRdxData.token)
      .then(() => {
        navigate("/profile");
      })
      .catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <>
      {vacancie.charge_name ? (
        <div className="flex f-column align-c vacanciedetail-container">
          {userRdxData.user.id === vacancie.created_by && (
            <button onClick={() => removeVacancie()} className="flex align-c justify-c remove-btn">
              <RiDeleteBin6Fill />
            </button>
          )}
          <div className="flex f-column text">
          <h1>
            Oferta de {vacancie.charge_name}
          </h1>
          <p>En {vacancie.location}</p>
          <p>{vacancie.description}</p>
          <p>Disponible hasta {formatedDate(vacancie.last_day)}</p>
          <p>Hay {vacancie.user_postulated.length} usuarios postulados</p>
          {(!!vacancie.question_one || !!vacancie.question_two || !!vacancie.question_three) &&
          <p className="bold">Preguntas para la vacante:</p>}
          {!!vacancie.question_one &&
          <p className="question">{vacancie.question_one}</p>
          }
          {!!vacancie.question_two &&
          <p className="question">{vacancie.question_two}</p>
          }
          {!!vacancie.question_three &&
          <p className="question">{vacancie.question_three}</p>
          }
          </div>
          {userRdxData.user.id === vacancie.created_by ? (
            <div className="postulated-container">
              {vacancie.user_postulated.map((response) => {
                return (
                  <div className="flex align-c justify-sb response">
                    <div className="flex align-c justify-c f-column user-info">
                    <p>{response.username}</p>
                    <button
                      onClick={() => navigate(`/user/${response.username}`)}
                    >
                      Ir al perfil
                    </button>
                    </div>
                    <div className="questions-container">
                    <p>{vacancie.question_one}</p>
                    <p className="answer">{response.answer_one}</p>
                    <p>{vacancie.question_two}</p>
                    <p className="answer">{response.answer_two}</p>
                    <p>{vacancie.question_three}</p>
                    <p className="answer">{response.answer_three}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <button onClick={() => navigate(`/applyVacancie/${vacancie._id}`)}>
              Aplicar a oferta
            </button>
          )}
        </div>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </>
  );
};

export default VacancieDetail;
