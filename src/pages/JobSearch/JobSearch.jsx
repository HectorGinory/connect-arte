import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonIcon from "../../common/Btn-navbar/Btn-navbar";
import Spinner from "../../common/Spinner/Spinner";
import { userData } from "../userSlice";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobSearch = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const [vacancie, getVacancies] = useState([])

  useEffect(() => {

  }, [])
  return (
    <div className="jobvacancies-container">
      <div className="title-container">
        <h1>Ofertas de empleo</h1>
        {userRdxData.user.rol === "company" && (
          <ButtonIcon
            ReactIcon={FaPencilAlt}
            onClick={() => navigate("/newvacancie")}
            text={"Añadir oferta"}
          ></ButtonIcon>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
