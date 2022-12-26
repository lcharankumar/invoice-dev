import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./style/style.scss";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import NotfoundComponent from "./components/NotfoundComponent";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";

import LoginComponent from "./components/LoginComponent";
import DashboardComponent from "./components/DashboardComponent";
import ProgressComponent from "./components/ProgressComponent";
import AdminDashboardComponent from "./components/AdminDashboardComponent";
import AdminComponent from "./components/AdminComponent";
import axios, * as others from "axios";
import jwt_decode from "jwt-decode";
import HeadDashboardComponent from "./components/HeadDashboardComponent";
import ProfileComponent from "./components/ProfileComponent";
import HomeLoaderComponent from "./components/HomeLoaderComponent";

function App() {
  //const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch();
    }
  }, []);
  const [finalSubmit, setFinalSubmit] = useState(false);
  const fetch = async () => {
    const formData1 = new FormData();
    formData1.append("token", localStorage.getItem("token"));
    let res = { data: "" };
    res = await axios.post("http://127.0.0.1:5000/api/token", formData1);
    console.log("Token", res);
    if (res.data == "Success") {
      setFlag(true);
      let decoded = {
        name: "",
        uid: "",
        role: "",
      };
      try {
        decoded = jwt_decode(localStorage.getItem("token"));
      } catch (error) {
        console.log(error);
      }
      console.log(decoded);
      localStorage.setItem("name", decoded.name);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("uid", decoded.uid);
      localStorage.setItem("token", localStorage.getItem("token"));
      setLoading(false);
      //navigate("/dashboard");
    } else {
      localStorage.removeItem("token");
    }
  };
  const { darkMode } = useContext(DarkModeContext);
  const [login, setLogin] = useState(false);
  const [coordinates, setCoordinates] = useState({
    x: 20,
    y: 30,
    w: 100,
    h: 50,
  });
  const [img, setImg] = useState(null);
  useEffect(() => {
    console.log(coordinates);
    console.log(img);
  }, [coordinates]);

  if (!flag) {
    return (
      <div className={darkMode ? "app-dark" : "app-light"}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<LoginComponent setLogin={setFlag}></LoginComponent>}
            />
            <Route
              path="*"
              exact
              element={
                loading ? <HomeLoaderComponent /> : <NotfoundComponent />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className={darkMode ? "app-dark" : "app-light"}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <DashboardComponent
                  setFinalSubmit={setFinalSubmit}
                  finalSubmit={finalSubmit}
                ></DashboardComponent>
              }
            />
            <Route
              path="/dashboard"
              element={
                <DashboardComponent
                  setFinalSubmit={setFinalSubmit}
                  finalSubmit={finalSubmit}
                ></DashboardComponent>
              }
            />
            <Route
              path="/approve"
              element={
                <AdminDashboardComponent
                  setFinalSubmit={setFinalSubmit}
                  finalSubmit={finalSubmit}
                ></AdminDashboardComponent>
              }
            />
            <Route
              path="/head"
              element={<HeadDashboardComponent></HeadDashboardComponent>}
            />
            <Route
              path="/profile"
              element={<ProfileComponent></ProfileComponent>}
            />
            <Route
              path="/admin"
              element={
                <AdminComponent finalSubmit={finalSubmit}></AdminComponent>
              }
            />
            <Route
              path="/request"
              element={
                <ProgressComponent
                  coordinates={coordinates}
                  setCoordinates={setCoordinates}
                  img={img}
                  setFinalSubmit={setFinalSubmit}
                  setImg={setImg}
                ></ProgressComponent>
              }
            />
            <Route path="*" exact element={<NotfoundComponent />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
