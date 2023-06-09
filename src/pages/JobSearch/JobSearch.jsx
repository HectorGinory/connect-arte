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
import { toast } from "sonner";

const JobSearch = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const [vacancies, setVacancies] = useState([]);
  const [criteria, setCriteria] = useState("");
  const [detailVacancieIndex, setDetailVacancieIndex] = useState(NaN);
  const [actualPage, setActualPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    if (!userRdxData.user.name) {
      navigate("/");
    }
    setDetailVacancieIndex(NaN)
    getVacancies(actualPage, 10, criteria)
      .then((res) => {
        setVacancies(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/");
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
          setTotalPage(res.data.totalPages);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          navigate("/");
        });
    }, 375);
    return () => clearTimeout(bringVacancies);
  }, [criteria, actualPage]);

  return (
    <>
      {vacancies.length > 0 ? (
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
              <div className="page-container">
                {actualPage > 1 && (
                  <button
                    className="page-btn"
                    onClick={() => setActualPage(actualPage - 1)}
                  >
                    {actualPage - 1}
                  </button>
                )}
                <button className="page-btn actual-page">{actualPage}</button>
                {actualPage !== totalPage && (
                  <button
                    className="page-btn"
                    onClick={() => setActualPage(actualPage + 1)}
                  >
                    {actualPage + 1}
                  </button>
                )}
              </div>
            </div>
            <div className="flex align-c justify-c vacancie-detail">
              {vacancies[detailVacancieIndex] ? (
                <div className="flex f-column vacancie-container">
                  <p>{vacancies[detailVacancieIndex].charge_name}</p>
                  <p>
                    En{" "}
                    {firstToUpperCase(vacancies[detailVacancieIndex].location)}
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
      ) : (
        <>
          <Spinner />
        </>
      )}
    </>
  );
};

export default JobSearch;
