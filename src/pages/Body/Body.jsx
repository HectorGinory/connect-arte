import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import './Body.css'
const Body = () => {
  return (
    <div className="flex body">
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default Body
