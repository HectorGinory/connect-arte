import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputText } from "../../common/InputText/InputText";

const ApplyVacancie = () => {
  const [credentials, setCredentials] = useState({
    "answer_one": ""
  });
  const vacancieId = useParams().id

  const credentialsHandler = async (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
  }, []);
  return (
    <div>
    </div>
  );
};

export default ApplyVacancie;
