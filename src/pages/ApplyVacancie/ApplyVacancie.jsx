import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { InputText } from "../../common/InputText/InputText";
import Spinner from "../../common/Spinner/Spinner";
import { getUserByUserName, getVacancieById } from "../../services/apiCalls";
import { userData } from "../userSlice";

const ApplyVacancie = () => {
  const userRdxData = useSelector(userData);
  const [credentials, setCredentials] = useState({
    answer_one: "",
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
    getVacancieById(vacancieId).then((res) => {
      setVacancie(res.data);
      console.log(res.data);
      console.log(userRdxData)
    });
    getUserByUserName(userRdxData.user.username).then((res) => {

    })
  }, []);
  return (
    <div className="">
      {vacancie._id ? (
        <div className="vacancie-form-container">
          <h2>Rellena el formulario</h2>
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
