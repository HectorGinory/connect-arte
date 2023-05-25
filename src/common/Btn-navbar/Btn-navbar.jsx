import React from "react";
import { useNavigate } from "react-router-dom";

const BtnNavbar = ({ ReactIcon, text, path }) => {
    const navigate = useNavigate()
  return (
    <button className="flex align-c btn-navigation" onClick={()=>navigate(`/${path}`)}>
      <div className="flex align-c justify-c icon-btn">
        <ReactIcon />
      </div>
      <p>{text}</p>
    </button>
  );
};

export default BtnNavbar;
