import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import './Body.css'
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import { Toaster } from "sonner";
import EditProfileInfo from "../EditProfileInfo/EditProfileInfo";
import EditEducation from "../EditEducation/EditEducation";
import EditExperience from "../EditExperience/EditExperience";
import JobSearch from "../JobSearch/JobSearch";
import NewJobVacancie from "../NewJobVacancie/NewJobVacancie";

const Body = () => {
  return (
    <div className="flex body">
      <Toaster richColors position="top-center"/>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobsearch" element={<JobSearch />} />
        <Route path="/newvacancie" element={<NewJobVacancie />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/profile/editInfo" element={<EditProfileInfo />} />
        <Route path="/profile/editeducation" element={<EditEducation />} />
        <Route path="/profile/editexperience" element={<EditExperience />} />
      </Routes>
    </div>
  )
}

export default Body
