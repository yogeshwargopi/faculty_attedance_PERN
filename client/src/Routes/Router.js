import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Home from "../Pages/Home/Home";
import SignUp from "../Component/LoginForm/SignUp";
import Indexpre from "../Pages/Principal/Indexpre";
import Indexfa from "../Pages/Faculty/Indexfa";
import Indexho from "../Pages/Hod/Indexho";
import Indexhr from "../Pages/Hr/Indexhr";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login/faculty"
          element={<LoginPage userType="Faculty" />}
        />
        <Route path="/login/hod" element={<LoginPage userType="HOD" />} />
        <Route
          path="/login/principal"
          element={<LoginPage userType="Principal" />}
        />
        <Route path="/login/hr" element={<LoginPage userType="HR" />} />
        <Route path="/principal/*" element={<Indexpre />} />
        <Route path="/hod/*" element={<Indexho />} />
        <Route path="/faculty/*" element={<Indexfa />} />
        <Route path="/hr/*" element={<Indexhr />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
