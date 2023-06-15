import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonIcon from "../../common/ButtonIcon/ButtonIcon";
import Spinner from "../../common/Spinner/Spinner";
import { userData } from "../userSlice";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getVacancies } from "../../services/apiCalls";
import "./JobSearch.css";
import { firstToUpperCase, formatedDate } from "../../services/functions";

const JobSearch = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const [vacancies, setVacancies] = useState([]);
  const [criteria, setCriteria] = useState("");
  const [detailVacancieIndex, setDetailVacancieIndex] = useState(NaN);
  const [actualPage, setActualPage] = useState(1);

  useEffect(() => {
    getVacancies(actualPage, 10, criteria).then((res) => {
      setVacancies(res.data.data);
    });
  }, [actualPage]);

  const criteriaHandler = (e) => {
    setCriteria(e.target.value);
  };

  useEffect(() => {
    const bringVacancies = setTimeout(() => {
      getVacancies(actualPage, 10, criteria)
        .then((res) => {
          setVacancies(res.data.data);
          setDetailVacancieIndex(NaN);
        })
        .catch((error) => console.log(error));
    }, 375);
    return () => clearTimeout(bringVacancies);
  }, [criteria]);

  return (
    <div className="flex f-column align-c jobvacancies-container ">
      <div className="flex align-c justify-sb title-container">
        <h1>Ofertas de empleo</h1>
        {userRdxData.user.rol === "company" && (
          <ButtonIcon
            ReactIcon={FaPencilAlt}
            onClick={() => navigate("/newvacancie")}
            text={"Añadir oferta"}
          ></ButtonIcon>
        )}
      </div>
      <div className="flex align-c f-column vacancies-container purpleGradient-box">
        <div className="flex align-c f-column filter-vacancies">
          <div className="input-criteria">
            <input
              onChange={(e) => criteriaHandler(e)}
              name="criteria"
              type="text"
            />
          </div>
          <div className="vacancies-map">
            {vacancies.map((vacancie, index) => {
              return (
                <div
                  className="vacancie"
                  key={index}
                  onClick={() => setDetailVacancieIndex(index)}
                >
                  <p>
                    {vacancie.charge_name} - {vacancie.location}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex align-c justify-c vacancie-detail">
          {vacancies[detailVacancieIndex] ? (
            <div className="flex f-column vacancie-container">
              <p>{vacancies[detailVacancieIndex].charge_name}</p>
              <p>
                En {firstToUpperCase(vacancies[detailVacancieIndex].location)}
              </p>
              <p>{vacancies[detailVacancieIndex].description}</p>
              <p>
                Disponible hasta{" "}
                {formatedDate(vacancies[detailVacancieIndex].last_day)}
              </p>
              <div className="flex align-c justify-c">
                <button
                  onClick={() =>
                    navigate(
                      `/applyVacancie/${vacancies[detailVacancieIndex]._id}`
                    )
                  }
                >
                  Aplicar a oferta
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/vacancieDetail/${vacancies[detailVacancieIndex]._id}`
                    )
                  }
                >
                  Ver oferta en detalle
                </button>
              </div>
            </div>
          ) : (
            <>
              <p>Escoge una oferta para ver la información en detalle</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
