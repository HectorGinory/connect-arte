import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import './Body.css'
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import { Toaster } from "sonner";

const Body = () => {
  return (
    <div className="flex body">
      <Toaster richColors position="top-center"/>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default Body
