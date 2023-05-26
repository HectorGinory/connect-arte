import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import './Body.css'
import Register from "../Register/Register";
const Body = () => {
  return (
    <div className="flex body">
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  )
}

export default Body
