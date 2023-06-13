import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonIcon from "../../common/Btn-navbar/Btn-navbar";
import Spinner from "../../common/Spinner/Spinner";
import { userData } from "../userSlice";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getVacancies } from "../../services/apiCalls";

const JobSearch = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const [vacancies, setVacancies] = useState([]);
  const [criteria, setCriteria] = useState("");
  const [detailVacancieIndex, setDetailVacancieIndex] = useState(NaN);
  const [actualPage, setActualPage] = useState(1);

  useEffect(() => {
    getVacancies(actualPage, 10, criteria).then((res) => {
      setVacancies(res.data.data)
    });
  }, [actualPage]);

  const criteriaHandler = (e) => {
    setCriteria(e.target.value);
  };

  useEffect(() => {
      const bringVacancies = setTimeout(() => {
        getVacancies(actualPage, 10, criteria).then((res) => {
          setVacancies(res.data.data)
        })
        .catch((error) => console.log(error));
      }, 375);

      return () => clearTimeout(bringVacancies);
  }, [criteria]);

  return (
    <div className="jobvacancies-container">
      <div className="title-container">
        <h1>Ofertas de empleo</h1>
        {/* {userRdxData.user.rol === "company" && (
          <ButtonIcon
            ReactIcon={FaPencilAlt}
            onClick={() => navigate("/newvacancie")}
            text={"Añadir oferta"}
          ></ButtonIcon>
        )} */}
      </div>
      <div className="vacancies-container">
        <div className="filter-vacancies">
          <div className="input-criteria">
            <input onChange={(e) => criteriaHandler(e)} name="criteria" type="text"/>
          </div>
          <div className="vacancies-map">
            {vacancies.map((vacancie, index) => {
              return <div className="vacancie" key={index} onClick={()=>setDetailVacancieIndex(index)}>
                <p>{vacancie.charge_name} - {vacancie.location}</p>
              </div>;
            })}
          </div>
        </div>
        <div className="vacancie-detail">
            {vacancies[detailVacancieIndex] ?
            <>
            <p>{vacancies[detailVacancieIndex].charge_name}</p>
            <button onClick={()=>navigate(`/vacancie/${vacancies[detailVacancieIndex]._id}`)}>
                Aplicar a oferta
              </button>
            </>:
            <>
              <p>Escoge una oferta para ver la información en detalle</p>
            </>
            }
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
