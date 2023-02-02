import React, { useState, useEffect, useRef } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "../../style/dashboard.scss";
import user from "../../img/user.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios, * as others from "axios";
import menu from "../../img/menu (1).png";
import "../../style/form.scss";
import logo from "../../img/Digiverz.png";
import logo1 from "../../img/Digiverz_dark.png";

import { DarkModeContext } from "../../context/darkModeContext";
import { ArabicContext } from "../../context/arabicContext";
import { useContext } from "react";

import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";

import $ from "jquery";
import URI from "../utils/requests";

const HeadDashboardComponent = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { arabic } = useContext(ArabicContext);
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch1 } = useContext(ArabicContext);
  const [mainData, setMainData] = useState([
    {
      id: "",
      status: "",
      l1: "",
      l2: "",
      l3: "",
      name: "",
      role: "",
      data: {
        category: "",
        invono: "",
        submittedDate: "",
        invoiceDate: "",
        address: "",
        total: "",
        headers: [],
        values: [],
        subtotal: "",
        taxamount: "",
        tax: "",
        currency: "",
      },
    },
  ]);
  const navigate = useNavigate();

  const CustomTablePagination = styled(TablePaginationUnstyled)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }

    & .${classes.selectLabel} {
      margin: 0;
    }

    & .${classes.displayedRows} {
      margin: 0;

      @media (min-width: 768px) {
        margin-left: auto;
      }
    }

    & .${classes.spacer} {
      display: none;
    }

    & .${classes.actions} {
      display: flex;
      gap: 0.25rem;
    }
  `;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - mainData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [dark, setDark] = useState(darkMode);

  const [total, setTotal] = useState(0);
  const [acctotal, setaccTotal] = useState(0);
  const [rejtotal, setrejTotal] = useState(0);
  const [pentotal, setpenTotal] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [waiting, setWaiting] = useState(0);
  const [curr, setCurr] = useState("");
  const [navopen, setNavopen] = useState(true);
  const dataFetchedRef = useRef(false);

  let acc = 0;
  let rej = 0;
  let wait = 0;
  let tot = 0;
  let acctot = 0;
  let rejtot = 0;
  let pentot = 0;
  useEffect(() => {
    setTotal(tot);
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  const [tabdata, setTabdata] = useState({
    id: "",
    status: "",
    l1: "",
    l2: "",
    l3: "",
    role: "",
    name: "",
    uid: "",
    data: {
      category: "",
      invono: "",
      submittedDate: "",
      invoiceDate: "",
      address: "",
      total: "",
      headers: [],
      values: [[]],
      subtotal: "",
      taxamount: "",
      tax: "",
      currency: "",
    },
  });
  useEffect(() => {
    async function fetchData() {
      let res = {
        data: [
          {
            id: "",
            status: "",
            l1: "",
            l2: "",
            l3: "",
            role: "",
            data: `{
        category:"",
        invono:"",
         submittedDate:"",
         invoiceDate:"",
         address:"",
         total:"",
         headers:[],
         values:[],
         subtotal:"",
         taxamount:"",
         tax:"",
         currency:""
      }`,
          },
        ],
      };
      const formData1 = new FormData();
      formData1.append("uid", localStorage.getItem("uid"));
      formData1.append("token", localStorage.getItem("token"));
      res = await axios.post(URI + "allrequests", formData1);

      res.data = res.data.filter(function (itm) {
        return itm.l1 != "no";
      });
      res.data = res.data.filter(function (itm) {
        return itm.l2 != "no";
      });

      res.data.map((it, index) => {
        if (it.l3 == "rej") {
          rej = rej + 1;
          let temp = {
            category: "",
            invono: "",
            submittedDate: "",
            invoiceDate: "",
            address: "",
            total: "",
            headers: [],
            values: [],
            subtotal: "",
            taxamount: "",
            tax: "",
            currency: "",
          };
          try {
            temp = JSON.parse(it.data);
          } catch (error) {
            temp = it.data;
          }

          rejtot = rejtot + parseFloat(temp.total);
          setCurr(temp.currency);
        }
        if (it.l3 == "no") {
          wait = wait + 1;
          let temp = {
            category: "",
            invono: "",
            submittedDate: "",
            invoiceDate: "",
            address: "",
            total: "",
            headers: [],
            values: [],
            subtotal: "",
            taxamount: "",
            tax: "",
            currency: "",
          };
          try {
            temp = JSON.parse(it.data);
          } catch (error) {
            temp = it.data;
          }

          pentot = pentot + parseFloat(temp.total);
          setCurr(temp.currency);
        }
        if (it.l3 == "yes") {
          acc = acc + 1;
          let temp = {
            category: "",
            invono: "",
            submittedDate: "",
            invoiceDate: "",
            address: "",
            total: "",
            headers: [],
            values: [],
            subtotal: "",
            taxamount: "",
            tax: "",
            currency: "",
          };
          try {
            temp = JSON.parse(it.data);
          } catch (error) {
            temp = it.data;
          }

          acctot = acctot + parseFloat(temp.total);

          setCurr(temp.currency);
        }
      });

      res.data = res.data.filter(function (itm) {
        return itm.l3 != "yes";
      });
      res.data = res.data.filter(function (itm) {
        return itm.status != "accepted";
      });
      res.data = res.data.filter(function (itm) {
        return itm.status != "rejected";
      });

      setMainData(res.data);
      setTotal((acctot + rejtot + pentot).toFixed(2));
      setaccTotal(acctot.toFixed(2));
      setrejTotal(rejtot.toFixed(2));
      setpenTotal(pentot.toFixed(2));
      setAccepted(acc);
      setRejected(rej);
      setWaiting(wait);
    }
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (arabic) {
      $(".MuiTablePagination-selectLabel").text("عدد الصفوف في الصفحة");
      let txt = $(".MuiTablePagination-displayedRows").text();

      let li = txt.split(" ");
      let li1 = li.reverse();
      let fi = "";

      li1.map((itm, index) => {
        if (itm == "of") {
          fi = fi + "من" + " ";
        } else {
          fi = fi + itm + " ";
        }
      });
      $(".MuiTablePagination-displayedRows").text(fi);
    }
  }, [arabic, page, darkMode, navopen]);

  const approve = async (data) => {
    let temp = {
      id: "",
      status: "",
      l1: "",
      l2: "",
      l3: "",
      role: "",
      name: "",
      uid: "",
      data: {
        category: "",
        invono: "",
        submittedDate: "",
        invoiceDate: "",
        address: "",
        total: "",
        headers: [],
        values: [[]],
        subtotal: "",
        taxamount: "",
        tax: "",
        currency: "",
      },
    };
    temp = data;
    try {
      const formData1 = new FormData();

      formData1.append("id", temp.id);
      formData1.append("name", temp.name);
      formData1.append("uid", temp.uid);
      formData1.append("role", temp.role);

      formData1.append("l3", "yes");
      formData1.append("l1", temp.l1);
      formData1.append("l2", temp.l2);
      if (temp.l2 == "yes" && temp.l1 == "yes") {
        formData1.append("status", "accepted");
      } else {
        formData1.append("status", temp.status);
      }

      formData1.append("data", JSON.stringify(temp.data));
      formData1.append("token", localStorage.getItem("token"));

      let res = await axios.post(URI + "update", formData1);
    } catch (error) {
      window.alert("Some thing went wrong please try again");
      console.log(error);
      window.location.reload();
    }
    window.location.reload();
  };

  const reject = async (data) => {
    let temp = {
      id: "",
      status: "",
      l1: "",
      l2: "",
      l3: "",
      role: "",
      name: "",
      uid: "",
      data: {
        category: "",
        invono: "",
        submittedDate: "",
        invoiceDate: "",
        address: "",
        total: "",
        headers: [],
        values: [[]],
        subtotal: "",
        taxamount: "",
        tax: "",
        currency: "",
      },
    };
    temp = data;
    try {
      const formData1 = new FormData();

      formData1.append("id", temp.id);
      formData1.append("name", temp.name);
      formData1.append("uid", temp.uid);
      formData1.append("role", temp.role);
      formData1.append("l1", "rej");
      formData1.append("l2", "rej");
      formData1.append("l3", "rej");
      formData1.append("status", "rejected");
      formData1.append("data", JSON.stringify(temp.data));
      formData1.append("token", localStorage.getItem("token"));

      let res = await axios.post(URI + "update", formData1);
    } catch (error) {
      window.alert("Some thing went wrong please try again");
      console.log(error);
      window.location.reload();
    }
    window.location.reload();
  };

  return (
    <div className=" dashboard Body2">
      <div
        class="wrapper"
        style={arabic ? { flexDirection: "row-reverse" } : {}}
      >
        <div class="left-side" style={navopen ? {} : { display: "none" }}>
          <Link
            to="/"
            style={darkMode ? { color: "#9a9ba6" } : { color: "black" }}
          >
            <svg viewBox="0 1 511 512" fill="currentColor">
              <path d="M498.7 222.7L289.8 13.8a46.8 46.8 0 00-66.7 0L14.4 222.6l-.2.2A47.2 47.2 0 0047 303h8.3v153.7a55.2 55.2 0 0055.2 55.2h81.7a15 15 0 0015-15V376.5a25.2 25.2 0 0125.2-25.2h48.2a25.2 25.2 0 0125.1 25.2V497a15 15 0 0015 15h81.8a55.2 55.2 0 0055.1-55.2V303.1h7.7a47.2 47.2 0 0033.4-80.4zm-21.2 45.4a17 17 0 01-12.2 5h-22.7a15 15 0 00-15 15v168.7a25.2 25.2 0 01-25.1 25.2h-66.8V376.5a55.2 55.2 0 00-55.1-55.2h-48.2a55.2 55.2 0 00-55.2 55.2V482h-66.7a25.2 25.2 0 01-25.2-25.2V288.1a15 15 0 00-15-15h-23A17.2 17.2 0 0135.5 244L244.4 35a17 17 0 0124.2 0l208.8 208.8v.1a17.2 17.2 0 010 24.2zm0 0" />
            </svg>
          </Link>
          <div
            style={{ marginTop: "40px", marginBottom: "40px" }}
            onClick={() => {
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
                fill="currentColor"
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
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 455 455"
                fill="currentColor"
              >
                <g>
                  <polygon
                    points="320.18,162.705 280.63,171.052 307.72,201.052 303.437,241.245 340.34,224.751 377.243,241.245 372.96,201.052 
		400.05,171.052 360.5,162.705 340.34,127.67 	"
                  />
                  <polygon
                    points="440,325.677 414.091,320.208 400.883,297.253 387.675,320.208 361.766,325.677 379.513,345.33 376.708,371.661 
		400.884,360.855 425.063,371.661 422.254,345.329 	"
                  />
                  <path
                    d="M218,227.5c0-89.167,51.306-166.338,126-203.64C313.443,8.6,278.978,0,242.5,0C116.855,0,15,101.855,15,227.5
		S116.855,455,242.5,455c36.478,0,70.943-8.6,101.5-23.86C269.306,393.838,218,316.667,218,227.5z"
                  />
                </g>
              </svg>
            )}
          </div>

          <div
            onClick={() => {
              dispatch1({ type: "TOGGLE" });
            }}
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M 4 2 C 2.9 2 2 2.9 2 4 L 2 12 C 2 13.1 2.9 14 4 14 L 10 14 L 10 20 C 10 21.1 10.9 22 12 22 L 20 22 C 21.1 22 22 21.1 22 20 L 22 12 C 22 10.9 21.1 10 20 10 L 14 10 L 14 4 C 14 2.9 13.1 2 12 2 L 4 2 z M 7.1757812 4 L 8.8046875 4 L 11.259766 10.146484 C 10.622151 10.402863 10.149579 10.977115 10.033203 11.671875 L 9.40625 10 L 6.578125 10 L 5.828125 12.015625 L 4 12 L 7.1757812 4 z M 8 6 L 7 9 L 9 9 L 8 6 z M 15.669922 12.001953 C 16.572594 11.966064 17.150391 12.832031 17.150391 12.832031 L 17.150391 13.208984 C 17.150391 13.208984 16.772578 12.832031 16.017578 12.832031 C 15.806578 12.832031 15.297125 13.0155 15.203125 13.5625 C 15.101125 14.1575 16.128531 14.341797 16.394531 14.341797 C 17.149531 14.341797 17.998047 13.984375 17.998047 13.984375 L 17.4375 16 C 17.4375 16 16.757953 15.357375 15.626953 15.734375 C 14.826953 16.001375 14.683703 17.11575 14.845703 17.46875 C 15.625703 19.17275 19 19 19 19 C 19 19 18.015578 20 16.017578 20 C 14.687578 20 13 19.245328 13 17.736328 C 13 16.227328 14.509766 15.472656 14.509766 15.472656 C 14.509766 15.472656 14.119875 14.931375 14.046875 14.734375 C 13.749875 13.937375 14.131672 12.453172 15.263672 12.076172 C 15.405172 12.029047 15.540969 12.00708 15.669922 12.001953 z" />
            </svg>
          </div>
          <button
            style={{ background: "none", border: "none", marginTop: "190%" }}
            onClick={() => {
              window.localStorage.clear();
              navigate("/");
              window.location.reload();
            }}
          >
            <svg viewBox="0 0 512 512" fill="grey">
              <path d="M255.2 468.6H63.8a21.3 21.3 0 01-21.3-21.2V64.6c0-11.7 9.6-21.2 21.3-21.2h191.4a21.2 21.2 0 100-42.5H63.8A63.9 63.9 0 000 64.6v382.8A63.9 63.9 0 0063.8 511H255a21.2 21.2 0 100-42.5z" />
              <path d="M505.7 240.9L376.4 113.3a21.3 21.3 0 10-29.9 30.3l92.4 91.1H191.4a21.2 21.2 0 100 42.6h247.5l-92.4 91.1a21.3 21.3 0 1029.9 30.3l129.3-127.6a21.3 21.3 0 000-30.2z" />
            </svg>
          </button>
        </div>
        <div class="main-container">
          <div class="header">
            {navopen ? (
              <></>
            ) : (
              <img
                className="menu"
                src={menu}
                style={{ cursor: "pointer", marginRight: "12px" }}
                onClick={() => {
                  setNavopen(true);
                }}
              />
            )}
            <div class="logo1">
              <img class="logoimg" src={darkMode ? logo1 : logo} />
            </div>

            <div class="user-info">
              {arabic ? (
                <div class="hour" style={{ direction: "rtl" }}>
                  {" "}
                  {arabic ? (ampm == "am" ? "صباحًا" : "مساءً") : ampm}{" "}
                  {strTime}{" "}
                </div>
              ) : (
                <div class="hour">
                  {strTime}{" "}
                  {arabic ? (ampm == "am" ? "صباحًا" : "مساءً") : ampm}
                </div>
              )}
            </div>
          </div>
          <div class="user-box first-box">
            <div class="cards-wrapper" style={{ animationDelay: ".6s" }}>
              {/* <div class="cards-header">
     <div class="cards-header-date">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
       <path d="M15 18l-6-6 6-6" /></svg>
      <div class="title"> {
        arabic?"ملخص":"Summary"
      } </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
       <path d="M9 18l6-6-6-6" /></svg>
     </div>
    </div> */}
              <div class="cards card" style={{ border: "none" }}>
                <div class="destination">
                  <div id="container">
                    <div class="card1">
                      <div
                        class="front"
                        style={arabic ? { direction: "rtl" } : {}}
                      >
                        <p class="contact">{accepted + rejected + waiting}</p>
                        <span class="name">
                          {" "}
                          {arabic
                            ? "إجمالي طلبات المطالبة"
                            : " Total Claim Requests"}
                        </span>
                        <div className="kpiicon">
                          <iconify-icon icon="tabler:sum"></iconify-icon>
                        </div>
                      </div>
                      <div class="back">
                        <p class="contact">
                          {curr}
                          {(
                            parseFloat(acctotal) +
                            parseFloat(rejtotal) +
                            parseFloat(pentotal)
                          ).toFixed(2)}
                        </p>
                        <span class="name">
                          {" "}
                          {arabic
                            ? "المبلغ الإجمالي المطلوب"
                            : " Total Amount Requested"}
                        </span>
                      </div>
                    </div>
                    <div class="card1">
                      <div
                        class="front"
                        style={arabic ? { direction: "rtl" } : {}}
                      >
                        <p class="contact">{accepted}</p>
                        <span class="name">
                          {" "}
                          {arabic
                            ? "تمت الموافقة على إجمالي المطالبة"
                            : " Total Claim Approved"}
                        </span>
                        <div className="kpiicon" style={{ color: "green" }}>
                          <iconify-icon icon="mdi:tick-decagram"></iconify-icon>
                        </div>
                      </div>
                      <div class="back">
                        <p class="contact">
                          {curr}
                          {acctotal}
                        </p>
                        <span class="name">
                          {" "}
                          {arabic
                            ? "المبلغ الإجمالي المستلم"
                            : "Total Amount Recieved"}
                        </span>
                      </div>
                    </div>
                    <div class="card1">
                      <div
                        class="front"
                        style={arabic ? { direction: "rtl" } : {}}
                      >
                        <p class="contact">{rejected}</p>
                        <span class="name">
                          {" "}
                          {arabic
                            ? "إجمالي المطالبة المرفوضة"
                            : " Total Claim Rejected"}
                        </span>
                        <div className="kpiicon" style={{ color: "red" }}>
                          <iconify-icon icon="bxs:message-square-x"></iconify-icon>
                        </div>
                      </div>
                      <div class="back">
                        <p class="contact">
                          {curr}
                          {rejtotal}
                        </p>
                        <span class="name">
                          {" "}
                          {arabic
                            ? "المبلغ الإجمالي للمطالبات المرفوضة"
                            : "Total Amount of Rejected Claims"}
                        </span>
                      </div>
                    </div>
                    <div class="card1">
                      <div
                        class="front"
                        style={arabic ? { direction: "rtl" } : {}}
                      >
                        <p class="contact">{waiting}</p>
                        <span class="name">
                          {" "}
                          {arabic
                            ? "إجمالي المطالبة المعلقة"
                            : "Total Claim Pending"}
                        </span>
                        <div className="kpiicon" style={{ color: "blue" }}>
                          <iconify-icon icon="ic:twotone-pending-actions"></iconify-icon>
                        </div>
                      </div>
                      <div class="back">
                        <p class="contact">
                          {curr}
                          {pentotal}
                        </p>
                        <span class="name">
                          {" "}
                          {arabic
                            ? "المبلغ الإجمالي للمطالبات المعلقة"
                            : " Total Amount of Pending Claims"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="account-wrapper" style={{ animationDelay: ".8s" }}>
              <div class="account-profile">
                <img src={user} alt="" />
                <div class="blob-wrap">
                  <div class="blob"></div>
                  <div class="blob"></div>
                  <div class="blob"></div>
                </div>
                <div class="account-name">{localStorage.getItem("name")}</div>
                <div class="account-title">{localStorage.getItem("role")}</div>
              </div>
              {/* <div class={arabic?"account account-arabic card":"account card"} style={arabic?{alignItems: "flex-end"}:{}}>
     <div className="account-cash" >{curr} {total}</div>
     <div class="account-income">
      {
        arabic?"إجمالي المطالبة":"Total Claim"
      }
     </div>
    </div> */}
            </div>
          </div>
          <div class="user-box second-box" style={{ marginTop: "0px" }}>
            <div
              class="cards-header"
              style={{ width: "-webkit-fill-available" }}
            >
              <div class="cards-header-date">
                <div class="title">
                  {arabic ? "المراجعات المعلقة" : "Pending Approval"}
                </div>
              </div>
            </div>

            <div class="cards-wrapper" style={{ animationDelay: "1s" }}>
              <div class="cards card">
                <table
                  class="table"
                  style={arabic ? { direction: "rtl" } : {}}
                  aria-label="custom pagination table"
                >
                  <thead>
                    <tr>
                      <th>{arabic ? "شفرة" : "Code"}</th>
                      <th>{arabic ? "تاريخ" : "Date"} </th>
                      <th>{arabic ? "مطالبة التسليم" : "Delivery claim"} </th>
                      <th>{arabic ? "المبلغ المطلوب" : "Amount requested"}</th>
                      {/* <th>
          {
            arabic?"الموافقون":"Approvers"
          }
        </th> */}
                      <th>{arabic ? "عملة" : "Currency"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(rowsPerPage > 0
                      ? mainData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : mainData
                    ).map((item, index) => {
                      let temp = {
                        category: "",
                        invono: "",
                        submittedDate: "",
                        invoiceDate: "",
                        address: "",
                        total: "",
                        headers: [],
                        values: [],
                        subtotal: "",
                        taxamount: "",
                        tax: "",
                        currency: "",
                      };
                      try {
                        temp = JSON.parse(item.data);
                      } catch (error) {
                        temp = item.data;
                      }

                      //item.data=JSON.parse(item.data)
                      let it = {
                        id: "",
                        status: "",
                        name: "",
                        role: "",
                        data: {
                          category: "",
                          invono: "",
                          submittedDate: "",
                          invoiceDate: "",
                          address: "",
                          total: "",
                          headers: [],
                          values: [],
                          subtotal: "",
                          taxamount: "",
                          tax: "",
                          currency: "",
                        },
                      };
                      it = item;

                      return (
                        <tr>
                          <td>
                            <button
                              style={{
                                border: "none",
                                background: "transparent",
                              }}
                              onClick={() => {
                                let temp1 = item;
                                temp1.data = temp;
                                handleShow();
                                setTabdata(temp1);
                              }}
                            >
                              {" "}
                              <span class="time">{it.id}</span>
                            </button>
                          </td>
                          <td>{temp.submittedDate}</td>
                          <td>{temp.category}</td>
                          <td>{temp.total}</td>

                          <td>{temp.currency}</td>
                        </tr>
                      );
                    })}
                    {emptyRows > 0 && (
                      <tr style={{ height: 41 * emptyRows }}>
                        <td colSpan={3} />
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <CustomTablePagination
                        rowsPerPageOptions={[
                          4,
                          mainData.length < 10
                            ? { label: "All", value: -1 }
                            : 10,
                        ]}
                        colSpan={3}
                        count={mainData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                          select: {
                            "aria-label": "rows per page",
                          },
                          actions: {
                            showFirstButton: true,
                            showLastButton: true,
                          },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-dialog-centered"
        style={{ minWidth: "100vw" }}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header
          style={
            darkMode
              ? { background: "rgb(44 44 44 / 80%)" }
              : { background: "#d9d9d9" }
          }
          closeButton
        ></Modal.Header>
        <Modal.Body
          class="ModalBody"
          style={
            darkMode
              ? {
                  background: "rgb(44 44 44 / 80%)",
                  backdropFilter: "saturate(180%) blur(10px)",
                }
              : {
                  background: "#d9d9d9",
                  backdropFilter: "saturate(180%) blur(10px)",
                }
          }
        >
          <section class="ftco-section">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-6 text-center mb-5">
                  <h2
                    class="heading-section"
                    style={darkMode ? { color: "white" } : { color: "black" }}
                  >
                    Request ID : {tabdata.id}
                  </h2>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-lg-10">
                  <div class="wrapper">
                    <div class="row no-gutters">
                      <div
                        class=" d-flex align-items-stretch"
                        style={{ marginTop: "5px" }}
                      >
                        <div
                          class="info-wrap w-100 p-md-5 p-4 py-5 img"
                          style={
                            darkMode
                              ? { background: "black" }
                              : { background: "white" }
                          }
                        >
                          <div class="dbox w-100 d-flex align-items-start">
                            <div class="text pl-3">
                              <p
                                style={
                                  darkMode
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                <span
                                  style={
                                    darkMode
                                      ? { color: "white" }
                                      : { color: "black" }
                                  }
                                >
                                  Invoice Number:
                                </span>{" "}
                                {tabdata.data.invono}
                              </p>
                            </div>
                          </div>
                          <div class="dbox w-100 d-flex align-items-center">
                            <div class="text pl-3">
                              <p
                                style={
                                  darkMode
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                <span
                                  style={
                                    darkMode
                                      ? { color: "white" }
                                      : { color: "black" }
                                  }
                                >
                                  Submitted by:
                                </span>{" "}
                                {tabdata.name}
                              </p>
                            </div>
                          </div>
                          <div class="dbox w-100 d-flex align-items-center">
                            <div class="text pl-3">
                              <p
                                style={
                                  darkMode
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                <span
                                  style={
                                    darkMode
                                      ? { color: "white" }
                                      : { color: "black" }
                                  }
                                >
                                  Role:
                                </span>{" "}
                                {tabdata.role}
                              </p>
                            </div>
                          </div>
                          <div class="dbox w-100 d-flex align-items-center">
                            <div class="text pl-3">
                              <p
                                style={
                                  darkMode
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                <span
                                  style={
                                    darkMode
                                      ? { color: "white" }
                                      : { color: "black" }
                                  }
                                >
                                  Category:
                                </span>{" "}
                                {tabdata.data.category}
                              </p>
                            </div>
                          </div>

                          <div class="dbox w-100 d-flex align-items-center">
                            <div class="text pl-3">
                              <p
                                style={
                                  darkMode
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                <span
                                  style={
                                    darkMode
                                      ? { color: "white" }
                                      : { color: "black" }
                                  }
                                >
                                  Address:
                                </span>{" "}
                                {tabdata.data.address}
                              </p>
                            </div>
                          </div>
                          <div class="dbox w-100 d-flex align-items-center">
                            <div class="text pl-3">
                              <p
                                style={
                                  darkMode
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                <span
                                  style={
                                    darkMode
                                      ? { color: "white" }
                                      : { color: "black" }
                                  }
                                >
                                  Submitted Date:{" "}
                                </span>{" "}
                                {tabdata.data.submittedDate}
                              </p>
                            </div>
                          </div>
                          <div class="dbox w-100 d-flex align-items-center">
                            <div class="text pl-3">
                              <p
                                style={
                                  darkMode
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                <span
                                  style={
                                    darkMode
                                      ? { color: "white" }
                                      : { color: "black" }
                                  }
                                >
                                  Invoice Date:{" "}
                                </span>{" "}
                                {tabdata.data.invoiceDate}
                              </p>
                            </div>
                          </div>
                          <div class="dbox w-100 d-flex align-items-center">
                            <div class="text pl-3">
                              <p
                                style={
                                  darkMode
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                <span
                                  style={
                                    darkMode
                                      ? { color: "white" }
                                      : { color: "black" }
                                  }
                                >
                                  Status:{" "}
                                </span>
                                {tabdata.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class=" d-flex align-items-stretch"
                        style={{ marginTop: "5px" }}
                      >
                        <div
                          class="contact-wrap w-100 p-md-5 p-4 py-5"
                          style={
                            darkMode
                              ? { background: "black" }
                              : { background: "white" }
                          }
                        >
                          <form
                            method="POST"
                            id="contactForm"
                            name="contactForm"
                            class="contactForm"
                          >
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <div style={{ overflowX: "overlay" }}>
                                    <table
                                      class="Tab dashTab"
                                      style={{
                                        marginTop: "0",
                                        color: "black",
                                        background: "#eee",
                                        borderBottom: "2px solid #adb5bd",
                                        boxShadow: "2px 2px 4px 4px #adb5bd",
                                      }}
                                    >
                                      <thead>
                                        {tabdata.data.headers.map((itt) => {
                                          return (
                                            <th
                                              style={{
                                                borderTop: "none",
                                                padding: "11px 11px",
                                                fontSize: "unset",
                                              }}
                                            >
                                              {itt}
                                            </th>
                                          );
                                        })}
                                      </thead>
                                      <tbody>
                                        {tabdata.data.values.map((itt) => {
                                          if (
                                            itt.length <
                                            tabdata.data.headers.length
                                          ) {
                                            return <></>;
                                          }

                                          let ttt = [];
                                          ttt = itt;
                                          return (
                                            <tr>
                                              {" "}
                                              {ttt.map((it1, index) => {
                                                if (index == itt.length - 1) {
                                                  return (
                                                    <td
                                                      style={{
                                                        padding: "15px",
                                                        background: "#ddd",
                                                        borderBottom:
                                                          "1px solid #fff",
                                                      }}
                                                    >
                                                      {" "}
                                                      {it1}{" "}
                                                    </td>
                                                  );
                                                } else {
                                                  return (
                                                    <td
                                                      style={{
                                                        padding: "15px",
                                                        background: "#eee",
                                                        borderBottom:
                                                          "1px solid #fff",
                                                      }}
                                                    >
                                                      {" "}
                                                      {it1}{" "}
                                                    </td>
                                                  );
                                                }
                                              })}
                                            </tr>
                                          );
                                        })}

                                        <tr>
                                          {[
                                            ...Array(
                                              tabdata.data.headers.length > 2
                                                ? tabdata.data.headers.length -
                                                    2
                                                : 0
                                            ),
                                          ].map((x, i) => {
                                            return <td> </td>;
                                          })}
                                          <td
                                            style={{
                                              padding: "15px",
                                              background: "#eee",
                                              borderBottom: "1px solid #fff",
                                            }}
                                          >
                                            {" "}
                                            Sub Total{" "}
                                          </td>

                                          <td
                                            style={{
                                              padding: "15px",
                                              background: "#eee",
                                              borderBottom: "1px solid #fff",
                                            }}
                                          >
                                            {" "}
                                            {tabdata.data.subtotal}{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          {[
                                            ...Array(
                                              tabdata.data.headers.length > 2
                                                ? tabdata.data.headers.length -
                                                    2
                                                : 0
                                            ),
                                          ].map((x, i) => {
                                            return <td> </td>;
                                          })}
                                          <td
                                            style={{
                                              padding: "15px",
                                              background: "#eee",
                                              borderBottom: "1px solid #fff",
                                            }}
                                          >
                                            {" "}
                                            Tax{" "}
                                          </td>

                                          <td
                                            style={{
                                              padding: "15px",
                                              background: "#eee",
                                              borderBottom: "1px solid #fff",
                                            }}
                                          >
                                            {" "}
                                            {tabdata.data.tax} %
                                          </td>
                                        </tr>

                                        <tr>
                                          {[
                                            ...Array(
                                              tabdata.data.headers.length > 2
                                                ? tabdata.data.headers.length -
                                                    2
                                                : 0
                                            ),
                                          ].map((x, i) => {
                                            return <td> </td>;
                                          })}
                                          <td
                                            style={{
                                              padding: "15px",
                                              background: "rgb(30 30 30 / 85%)",
                                              color: "#ffffff",
                                              borderBottom: "1px solid #fff",
                                            }}
                                          >
                                            {" "}
                                            Total{" "}
                                          </td>

                                          <td
                                            style={{
                                              padding: "15px",
                                              background: "rgb(30 30 30 / 85%)",
                                              color: "#ffffff",
                                              borderBottom: "1px solid #fff",
                                            }}
                                          >
                                            {" "}
                                            {tabdata.data.total}{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <br />
                                  </div>
                                </div>
                              </div>
                              <div
                                class=""
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <div
                                  class="form-group"
                                  style={{ margin: "5px" }}
                                >
                                  <input
                                    type="submit"
                                    value="Approve"
                                    class="btn btn-primary"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      approve(tabdata);
                                    }}
                                  />
                                  <div class="submitting"></div>
                                </div>
                                <div
                                  class="form-group"
                                  style={{ margin: "5px" }}
                                >
                                  <input
                                    type="submit"
                                    value="Reject"
                                    class="btn btn-primary"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      reject(tabdata);
                                    }}
                                  />
                                  <div class="submitting"></div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HeadDashboardComponent;
