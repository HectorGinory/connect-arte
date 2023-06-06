import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { useState } from "react";
import { useEffect } from "react";
import { getContriesList, getUserByUserName } from "../../services/apiCalls";

import "./EditProfileInfo.css";
import { InputText } from "../../common/InputText/InputText";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const EditProfileInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);

  const [user, setUser] = useState({});
  const [countries, setCountries] = useState([]);
  const [countrieList, setCountrieList] = useState([]);
  const [credentials, setCredentials] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
    description: user.description,
    location: user.location,
  });

  useEffect(() => {
    getContriesList().then((res) => {
      const countriesName = res.map((res) => res.name.common);
      setCountries(countriesName);
    });
    getUserByUserName(userRdxData.user.username)
      .then(async (res) => {
        await setUser(res.user);
      })
      .catch((err) => {
        toast.error("Cant get your user info, try again.");
        navigate("/");
      });
  }, []);

  const credentialsHandler =async (e) => {
    await setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const locationCredentialHandler =async (e) => {

    await setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    const regExp = new RegExp(e.target.value)
    const newList = countries.filter(countrie => countrie.match(regExp))
    await setCountrieList(newList)
  console.log(countrieList)
  };

  return (
    <div className="flex align-c f-column edit-info-container">
      <h1>Change your profile info</h1>
      <label className="flex align-c justify-sb">
        <div>
          <p>Actual name:</p>
          <p>{user.name}</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Insert name"}
          name={"name"}
          handler={credentialsHandler}
          required={true}
          value={credentials.name}
        />
      </label>
      <label className="flex align-c justify-sb">
        <div>
          <p>Actual email:</p>
          <p>{user.email}</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Insert new email"}
          name={"email"}
          handler={credentialsHandler}
          required={true}
          value={credentials.email}
        />
      </label>
      <label className="flex align-c justify-sb">
        <div>
          <p>Actual username:</p>
          <p>{user.username}</p>
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Insert username"}
          name={"username"}
          handler={credentialsHandler}
          required={true}
          value={credentials.username}
        />
      </label>
      <label className="flex align-c justify-sb">
        <div>
          <p>Actual description:</p>
          {user.description === "" ? <br /> : <p>{user.description}</p>}
        </div>
        <InputText
          type={"text"}
          className={"input"}
          placeholder={"Insert new description"}
          name={"description"}
          handler={credentialsHandler}
          required={true}
          value={credentials.description}
        />
      </label>
      <label className="flex align-c justify-sb">
        <div>
          <p>Actual location:</p>
          {user.location === "" ? <br /> : <p>{user.location}</p>}
        </div>
        <div className="country-map">
          <InputText
            type={"text"}
            className={"input"}
            placeholder={"Insert location"}
            name={"location"}
            handler={locationCredentialHandler}
            required={true}
            value={credentials.location}
          />
          {credentials.location === "" ?
          <br/> :
          countrieList.map((countrie, index)=>{
                return (
                    <p key={index} onClick={()=>{
                        setCredentials((prev)=>({
                        ...prev,
                        location: countrie
                    }))
                    }}>{countrie}</p>
                )
            })}
        </div>
        <div className="flex f-column">

        </div>
      </label>
    </div>
  );
};

export default EditProfileInfo;
