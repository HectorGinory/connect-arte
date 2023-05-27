import React, { useEffect, useState } from "react";
import "./Login.css";
import { InputText } from "../../common/InputText/InputText";

import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { logInUsers } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRDX = useSelector(userData);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const credentialsHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const logInButton = () => {
    logInUsers(credentials)
      .then((res) => {
        dispatch(login(res));
        navigate("/");
        toast.success(`Bienvenid@ de vuelta ${res.user.name}`);
      })
      .catch((e) => {
        console.log("ERROR:", e);
      });
  };

  useEffect(() => {
    if (userRDX.user.name) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex align-c justify-c login-body">
          <div className="flex align-c justify-c login-container">
      <h2>Login</h2>
      <div className="form flex align-c justify-c">
        <label>
          Email
          <InputText
            type={"email"}
            className={"input"}
            placeholder={"Example@gmail.com"}
            name={"email"}
            handler={credentialsHandler}
            value={credentials.email}
          />
        </label>
        <label>
          Password
          <InputText
            type={"password"}
            className={"input"}
            placeholder={"Insert Password"}
            name={"password"}
            handler={credentialsHandler}
            value={credentials.password}
          />
        </label>
        <div className="btn-container">
          <button onClick={() => logInButton()} className="btn">Login</button>
          <button onClick={() => navigate("/register")} className="btn">Register</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
