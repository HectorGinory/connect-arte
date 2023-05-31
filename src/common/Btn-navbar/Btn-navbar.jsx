import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonIcon = ({ ReactIcon, text, path, onClick }) => {
    const navigate = useNavigate()
  return (
    <button className="flex align-c btn-navigation" onClick={onClick ? onClick : ()=>{navigate(`/${path}`)}}>
      <div className="flex align-c justify-c icon-btn">
        <ReactIcon />
      </div>
      <p>{text}</p>
    </button>
  );
};

export default ButtonIcon;
