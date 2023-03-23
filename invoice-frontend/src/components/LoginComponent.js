import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";
import logo from "../img/logo.png";
import axios, * as others from "axios";
import jwt_decode from "jwt-decode";
import URI from "./utils/requests";
const LoginComponent = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData1 = new FormData();
    formData1.append("uid", formData.name);
    formData1.append("password", formData.password);
    let res = {
      data: {
        message: "Failure",
        token: "",
      },
    };
    res = await axios.post(URI + "login", formData1);
    if (res.data.message == "Success") {
      props.setLogin(true);
      let decoded = {
        name: "",
        uid: "",
        role: "",
        dept: "",
      };
      decoded = jwt_decode(res.data.token);
      localStorage.setItem("name", decoded.name);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("uid", decoded.uid);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("dept", decoded.dept);
      if (decoded.role == "Practice head") {
        navigate("/head");
      }
      if (decoded.role == "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      window.alert("Invalid Credentials");
    }
    props.setLogin(true);
    props.setFlag(true);
  };
  return (
    <>
      <div className="Body11">
        <div className="wrapper1">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="text-center mt-4 name">
            <span style={{ color: "black" }}>Invoice R</span>
            <span style={{ color: "red" }}>ecognition</span>
          </div>
          <form className="p-3 mt-3" onSubmit={submitHandler}>
            <div className="form-field d-flex align-items-center">
              <span className="far fa-user"></span>
              <input
                type="text"
                name="userName"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                id="userName"
                placeholder="Username"
              />
            </div>
            <div className="form-field d-flex align-items-center">
              <span className="fas fa-key"></span>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                name="password"
                id="pwd"
                placeholder="Password"
              />
            </div>
            <button className="btn mt-3" type="submit" value="Register">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
