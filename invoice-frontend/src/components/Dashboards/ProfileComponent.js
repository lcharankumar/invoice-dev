import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/profile.scss";
import $ from "jquery";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { ArabicContext } from "../../context/arabicContext";
import add from "../../img/addimage.jpg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios, * as others from "axios";
import Alert from "react-bootstrap/Alert";
import URI from "../utils/requests";

const ProfileComponent = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { dispatch } = useContext(DarkModeContext);
  const { arabic } = useContext(ArabicContext);
  const { dispatch1 } = useContext(ArabicContext);
  const [dark, setDark] = useState(darkMode);
  const [alert, setAlert] = useState(false);
  const [img, setImg] = useState(null);
  const [formData, setFormData] = useState({
    fname: "",
    uid: localStorage.getItem("uid"),
    lname: "",
    bday: "",
    email: "",
    gender: "",
    country: "",
    add1: "",
    phno1: "",
    phno2: "",
    add2: "",
    state: "",
    linkedin: "",
    img: "",
  });
  const submitHandler = async (event) => {
    const formData1 = new FormData();
    formData1.append("fname", formData.fname);
    formData1.append("uid", formData.uid);
    formData1.append("lname", formData.lname);
    formData1.append("bday", formData.bday);
    formData1.append("email", formData.email);
    formData1.append("gender", formData.gender);
    formData1.append("country", formData.country);
    formData1.append("add1", formData.add1);
    formData1.append("phno1", formData.phno1);
    formData1.append("phno2", formData.phno2);
    formData1.append("add2", formData.add2);
    formData1.append("state", formData.state);
    formData1.append("linkedin", formData.linkedin);
    formData1.append("img", formData.img);

    formData1.append("token", localStorage.getItem("token"));
    event.preventDefault();
    try {
      let res = {
        data: "",
      };
      res = await axios.post(URI + "profile", formData1);
      if (res.data == "Success") {
        setAlert(true);
      }
      const timer = setTimeout(() => {
        setAlert(false);
      }, 4000);
    } catch (error) {
      window.alert("Some thing went wrong please try again");
      console.log(error);
    }
  };
  const onFormdata = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const changeClass = (id) => {
    if (id === "payment") {
      $("#profile").removeClass("active");
      $("#subscription").removeClass("active");
      $("#payment").addClass("active");
      $(".payment").removeClass("noshow");
      $(".rightbox").children().not(".payment").addClass("noshow");
    }
    if (id === "profile") {
      $("#payment").removeClass("active");
      $("#subscription").removeClass("active");
      $("#profile").addClass("active");
      $(".profile").removeClass("noshow");
      $(".rightbox").children().not(".profile").addClass("noshow");
    }
    if (id === "subscription") {
      $("#payment").removeClass("active");
      $("#profile").removeClass("active");
      $("#subscription").addClass("active");
      $(".subscription").removeClass("noshow");
      $(".rightbox").children().not(".subscription").addClass("noshow");
    }
  };
  const [apl, setApl] = useState("");
  const [pl, setPl] = useState("");
  const [ph, setPh] = useState("");

  useEffect(() => {
    async function fetchData() {
      let res = {
        data: [
          {
            fname: "",
            uid: localStorage.getItem("uid"),
            lname: "",
            bday: "",
            email: "",
            gender: "",
            country: "",
            add1: "",
            phno1: "",
            phno2: "",
            add2: "",
            state: "",
            linkedin: "",
            img: "",
          },
        ],
      };
      const formData1 = new FormData();
      formData1.append("uid", localStorage.getItem("uid"));

      formData1.append("token", localStorage.getItem("token"));
      res = await axios.post(URI + "getprofile", formData1);
      const formData2 = new FormData();
      formData2.append("token", localStorage.getItem("token"));
      let res1 = {
        data: [
          {
            uid: "",
            name: "",
            role: "",
            dept: "",
          },
        ],
      };
      res1 = await axios.post(URI + "getallemp", formData2);
      let tempemp1 = [];
      res1.data.map((itms, index) => {
        if (
          itms.dept == localStorage.getItem("dept") &&
          itms.role == "Practice head"
        ) {
          setPh(itms.name);
        }
        if (
          itms.dept == localStorage.getItem("dept") &&
          itms.role == "Practice Lead"
        ) {
          setPl(itms.name);
        }
        if (
          itms.dept == localStorage.getItem("dept") &&
          itms.role == "Associate Practice Lead"
        ) {
          setApl(itms.name);
        }
      });
      setFormData(...formData, ...res.data[0]);
    }
    fetchData();
  }, []);

  return (
    <div
      class="PProfile"
      style={
        darkMode ? { backgroundColor: "black" } : { backgroundColor: "white" }
      }
    >
      {alert && <Alert variant="success">Profile successfully updated</Alert>}
      <form
        onSubmit={submitHandler}
        class="container"
        style={arabic ? { direction: "rtl" } : {}}
      >
        <div id="logo">
          <h1
            class="logo"
            style={
              arabic
                ? {
                    right: "auto",
                    marginTop: "14px",
                    marginLeft: "114px",
                    float: "right",
                  }
                : {}
            }
          >
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-bottom`}>
                  <strong>{localStorage.getItem("name")}</strong>
                  <p>{localStorage.getItem("role")}</p>
                  {localStorage.getItem("role") != "Practice head" && (
                    <>
                      <strong>{arabic ? "تقارير ل" : "Reports to"}</strong>
                      {localStorage.getItem("role") == "Employee" && (
                        <p>
                          {apl} <br /> Associate practice Lead
                        </p>
                      )}
                      {localStorage.getItem("role") ==
                        "Associate Practice Lead" && (
                        <p>
                          {pl} <br />
                          Practice Lead
                        </p>
                      )}
                      {localStorage.getItem("role") == "Practice Lead" && (
                        <p>
                          {ph} <br /> Practice head
                        </p>
                      )}
                    </>
                  )}
                </Tooltip>
              }
            >
              <div class="img-container">
                {formData.img ? (
                  <img src={formData.img} alt="" />
                ) : (
                  <img src={add} alt="" />
                )}
              </div>
            </OverlayTrigger>

            <div
              class="badge"
              style={!darkMode ? { color: "black" } : { color: "white" }}
            >
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.addEventListener("load", () => {
                    setImg(reader.result.toString() || "");
                    setFormData({
                      ...formData,
                      ["img"]: reader.result.toString(),
                    });
                  });
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
              <label for="imageUpload">
                <iconify-icon icon="material-symbols:edit-outline-rounded"></iconify-icon>
              </label>
            </div>
          </h1>
          <div class="CTA" style={arabic ? {} : {}}>
            <button type="submit" value="Register">
              {arabic ? "تحديث" : "Update"}
            </button>
          </div>
        </div>
        <div class="leftbox">
          <nav>
            <a
              id="profile"
              class="active"
              style={!darkMode ? { color: "black" } : { color: "white" }}
              onClick={() => {
                changeClass("profile");
              }}
            >
              <iconify-icon icon="uil:user"></iconify-icon>
            </a>
            <a
              id="payment"
              style={!darkMode ? { color: "black" } : { color: "white" }}
              onClick={() => {
                changeClass("payment");
              }}
            >
              <iconify-icon icon="mdi:home-location"></iconify-icon>
            </a>
            <a
              id="subscription"
              style={!darkMode ? { color: "black" } : { color: "white" }}
              onClick={() => {
                changeClass("subscription");
              }}
            >
              <iconify-icon icon="material-symbols:perm-phone-msg"></iconify-icon>
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                dispatch1({ type: "TOGGLE" });
              }}
            >
              <div>
                <svg
                  style={{ height: "25px" }}
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M 4 2 C 2.9 2 2 2.9 2 4 L 2 12 C 2 13.1 2.9 14 4 14 L 10 14 L 10 20 C 10 21.1 10.9 22 12 22 L 20 22 C 21.1 22 22 21.1 22 20 L 22 12 C 22 10.9 21.1 10 20 10 L 14 10 L 14 4 C 14 2.9 13.1 2 12 2 L 4 2 z M 7.1757812 4 L 8.8046875 4 L 11.259766 10.146484 C 10.622151 10.402863 10.149579 10.977115 10.033203 11.671875 L 9.40625 10 L 6.578125 10 L 5.828125 12.015625 L 4 12 L 7.1757812 4 z M 8 6 L 7 9 L 9 9 L 8 6 z M 15.669922 12.001953 C 16.572594 11.966064 17.150391 12.832031 17.150391 12.832031 L 17.150391 13.208984 C 17.150391 13.208984 16.772578 12.832031 16.017578 12.832031 C 15.806578 12.832031 15.297125 13.0155 15.203125 13.5625 C 15.101125 14.1575 16.128531 14.341797 16.394531 14.341797 C 17.149531 14.341797 17.998047 13.984375 17.998047 13.984375 L 17.4375 16 C 17.4375 16 16.757953 15.357375 15.626953 15.734375 C 14.826953 16.001375 14.683703 17.11575 14.845703 17.46875 C 15.625703 19.17275 19 19 19 19 C 19 19 18.015578 20 16.017578 20 C 14.687578 20 13 19.245328 13 17.736328 C 13 16.227328 14.509766 15.472656 14.509766 15.472656 C 14.509766 15.472656 14.119875 14.931375 14.046875 14.734375 C 13.749875 13.937375 14.131672 12.453172 15.263672 12.076172 C 15.405172 12.029047 15.540969 12.00708 15.669922 12.001953 z" />
                </svg>
              </div>
            </a>

            <a
              style={!darkMode ? { color: "black" } : { color: "white" }}
              onClick={(e) => {
                e.preventDefault();
                setDark(!dark);
                if (!dark) {
                  dispatch({ type: "DARK" });
                } else {
                  dispatch({ type: "LIGHT" });
                }
              }}
            >
              {dark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentcolor"
                  viewBox="0 0 246 246"
                >
                  <path
                    d="M189.024,122.5c0,36.188-29.336,65.524-65.524,65.524c-36.188,0-65.524-29.336-65.524-65.524
	c0-36.188,29.336-65.524,65.524-65.524C159.688,56.976,189.024,86.312,189.024,122.5z M122.667,43c4.143,0,7.5-3.357,7.5-7.5v-28
	c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v28C115.167,39.643,118.524,43,122.667,43z M184.444,68.438
	c1.919,0,3.839-0.732,5.304-2.197l14.849-14.85c2.929-2.929,2.929-7.678-0.001-10.606c-2.928-2.928-7.677-2.929-10.606,0.001
	l-14.849,14.85c-2.929,2.929-2.929,7.678,0.001,10.606C180.605,67.705,182.525,68.438,184.444,68.438z M190.366,178.14
	c-2.93-2.928-7.678-2.928-10.607,0c-2.929,2.93-2.929,7.678,0,10.607l14.85,14.85c1.465,1.464,3.385,2.196,5.304,2.196
	s3.839-0.732,5.304-2.196c2.929-2.93,2.929-7.678,0-10.607L190.366,178.14z M57.253,178.759l-14.85,14.85
	c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196s3.839-0.732,5.304-2.196l14.85-14.85
	c2.929-2.93,2.929-7.678,0-10.607C64.931,175.831,60.183,175.831,57.253,178.759z M56.634,66.859
	c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196c2.93-2.929,2.93-7.678,0.001-10.606l-14.849-14.85
	c-2.93-2.93-7.679-2.929-10.606-0.001c-2.93,2.929-2.93,7.678-0.001,10.606L56.634,66.859z M238.5,114.5h-7h-21
	c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h21h7c4.143,0,7.5-3.357,7.5-7.5S242.643,114.5,238.5,114.5z M123.667,202
	c-4.143,0-7.5,3.357-7.5,7.5v21v8c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-8v-21C131.167,205.357,127.81,202,123.667,202z
	 M44,123c0-4.143-3.357-7.5-7.5-7.5h-21h-8c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h8h21C40.643,130.5,44,127.143,44,123z"
                  />
                </svg>
              ) : (
                <iconify-icon
                  icon="ri:moon-clear-fill"
                  style={!darkMode ? { color: "black" } : { color: "white" }}
                ></iconify-icon>
              )}
            </a>
            <Link to="/">
              <iconify-icon
                icon="ph:skip-back-circle"
                style={!darkMode ? { color: "black" } : { color: "white" }}
              ></iconify-icon>
            </Link>
          </nav>
        </div>
        <div class="rightbox">
          <div class="profile">
            <h1 style={!darkMode ? { color: "black" } : { color: "white" }}>
              {arabic ? "معلومات شخصية" : "Personal Information"}
            </h1>
            <h2>{arabic ? "الاسم الاول" : "First Name"}</h2>
            <input
              value={formData.fname}
              onChange={onFormdata}
              name="fname"
              placeholder="First Name"
              type="text"
            ></input>

            <h2>{arabic ? "اللقب" : "Last name"}</h2>
            <input
              value={formData.lname}
              onChange={onFormdata}
              name="lname"
              placeholder="Last Name"
              type="text"
            ></input>
            <h2>{arabic ? "تاريخ الولادة" : "Date of Birth"}</h2>
            <input
              value={formData.bday}
              onChange={onFormdata}
              name="bday"
              id="pets-birthday"
              type="date"
              placeholder="MM/DD/YYYY"
            ></input>
            <h2>{arabic ? "جنس" : "Gender"}</h2>
            <div className="radio_container">
              <input
                onChange={onFormdata}
                name="gender"
                id="pet-gender-female"
                type="radio"
                value="female"
                checked={formData.gender == "female"}
                style={{ width: "15%" }}
              ></input>
              <label for="pet-gender-female">
                {arabic ? "أنثى" : "Female"}
              </label>
              <input
                onChange={onFormdata}
                style={{ width: "15%" }}
                name="gender"
                id="pet-gender-male"
                type="radio"
                value="male"
                checked={formData.gender == "male"}
              ></input>
              <label for="pet-gender-male">{arabic ? "ذكر" : "Male"}</label>
            </div>
          </div>

          <div class="payment noshow">
            <h1 style={!darkMode ? { color: "black" } : { color: "white" }}>
              {arabic ? "تبوك" : "Address"}
            </h1>
            <h2>{arabic ? "العنوان الأول" : "Address Line 1"}</h2>
            <input
              value={formData.add1}
              onChange={onFormdata}
              name="add1"
              id="pets-name"
              placeholder="Address"
              type="text"
            ></input>
            <h2>{arabic ? "سطر العنوان 2" : "Address Line 2"}</h2>
            <input
              value={formData.add2}
              onChange={onFormdata}
              name="add2"
              id="pets-name"
              placeholder="Address"
              type="text"
            ></input>

            <h2>{arabic ? "حالة" : "State"}</h2>
            <input
              value={formData.state}
              onChange={onFormdata}
              name="state"
              id="pets-birthday"
              type="text"
              placeholder="State"
            ></input>
            <h2>{arabic ? "دولة" : "Country"}</h2>
            <input
              value={formData.country}
              onChange={onFormdata}
              name="country"
              id="pets-birthday"
              type="text"
              placeholder="Country"
            ></input>
          </div>

          <div class="subscription noshow">
            <h1 style={!darkMode ? { color: "black" } : { color: "white" }}>
              {arabic ? "معلومات التواصل" : "Contact Information"}
            </h1>
            <h2>{arabic ? "رقم الهاتف" : "Phone Number"}</h2>
            <input
              style={{ width: "inherit" }}
              value={formData.phno1}
              onChange={onFormdata}
              name="phno1"
              type="text"
            ></input>
            <h2>{arabic ? "رقم الهاتف البديل" : "Alternative Phone Number"}</h2>
            <input
              style={{ width: "inherit" }}
              value={formData.phno2}
              onChange={onFormdata}
              name="phno2"
              type="text"
            ></input>
            <h2>{arabic ? "عنوان الايميل" : "Email id"}</h2>
            <input
              value={formData.email}
              onChange={onFormdata}
              name="email"
              id="pets-birthday"
              type="text"
              placeholder="email"
            ></input>
            <h2>{arabic ? "معرف لينكد إن" : "Linkedin Id"}</h2>
            <input
              value={formData.linkedin}
              onChange={onFormdata}
              name="linkedin"
              id="pets-birthday"
              type="text"
              placeholder="linkedin id"
            ></input>
          </div>
        </div>
      </form>

      <footer></footer>
    </div>
  );
};

export default ProfileComponent;
