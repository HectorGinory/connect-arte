import React from "react";
import { HashLoader } from "react-spinners";
import './Spinner.css'

const Spinner = () => {
  return (
    <div className="flex align-c justify-c spinner-container">
      <HashLoader color="#6A0DAD" loading size={50} speedMultiplier={2} />
    </div>
  );
};

export default Spinner;
