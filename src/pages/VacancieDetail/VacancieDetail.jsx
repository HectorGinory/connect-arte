import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../common/Spinner/Spinner";
import { getVacancieById, removeVacancieById } from "../../services/apiCalls";
import { formatedDate } from "../../services/functions";
import {RiDeleteBin6Fill} from "react-icons/ri"
const VacancieDetail = () => {
  const vacancieId = useParams().id;
  const navigate = useNavigate()
  const [vacancie, setVacancie] = useState({});

  useState(() => {
    getVacancieById(vacancieId)
      .then((res) => {
        setVacancie(res.data);
        console.log(res.data.user_postulated)
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const removeVacancie = () => {
    removeVacancieById(vacancieId).then(()=>{
        navigate("/profile")
    }).catch((e)=>{
        console.log(e)
    })
  }
  return (
    <>
      {vacancie.charge_name ? (
        <div className="">
        <button onClick={()=>removeVacancie()}>
                            <RiDeleteBin6Fill/>
        </button>
            <h1>Oferta de {vacancie.charge_name} en {vacancie.location}</h1>
            <p>{vacancie.description}</p>
            <p>Disponible hasta {formatedDate(vacancie.last_day)}</p>
            <p>Hay {vacancie.user_postulated.length} usuarios postulados</p>
            <div className="postulated-container">
                {vacancie.user_postulated.map((response) => {
                    return (
                        <div className="response">
                        <br/>
                        <p>{response.username}</p>
                        <p>{vacancie.question_one}</p>
                        <p>{response.answer_one}</p>
                        <p>{vacancie.question_two}</p>
                        <p>{response.answer_two}</p>
                        <p>{vacancie.question_three}</p>
                        <p>{response.answer_three}</p>
                        <br/>
                        <button onClick={()=>navigate(`/user/${response.username}`)}>
                            Ir al perfil
                        </button>
                        </div>
                    )
                })}
            </div>
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
