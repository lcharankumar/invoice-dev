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
import level1 from "../../img/level1.png";
import level2 from "../../img/level2.png";
import level3 from "../../img/level3.png";
import "../../style/form.scss";
import "../../style/admin.scss";
import "../../style/admin.sass";
import "../../style/alert.scss";
import logo from "../../img/Digiverz.png";
import logo1 from "../../img/Digiverz_dark.png";
import logo3 from "../../img/level3.png";
import reject from "../../img/reject.png";
import HomeLoaderComponent from "../HomeLoaderComponent";
import { DarkModeContext } from "../../context/darkModeContext";
import { ArabicContext } from "../../context/arabicContext";
import { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Toast from "react-bootstrap/Toast";
import AddDeptComponent from "./AddDeptComponent";
import AddemployeeComponent from "./AddemployeeComponent";

import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";

import $ from "jquery";
import EditempComponent from "./EditempComponent";
import URI from "../utils/requests";

const AdminComponent = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { arabic } = useContext(ArabicContext);
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch1 } = useContext(ArabicContext);
  const [loading, setLoading] = useState(true);
  const [showdept, setshowDept] = useState(false);
  const [delid, setDelid] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [totalEmp, setTotalEmp] = useState(0);
  const [mainData, setMainData] = useState([
    {
      uid: "",
      name: "",
      role: "",
      dept: "",
    },
  ]);

  const [dept, setDept] = useState([]);
  const [selectedDept, setselectedDept] = useState("digiverz");

  const [seldept, setSeldept] = useState([
    {
      uid: "",
      name: "",
      role: "",
      dept: "",
    },
  ]);
  const [seldepthead, setSeldepthead] = useState([
    {
      uid: "",
      name: "",
      role: "",
      dept: "",
    },
  ]);
  const navigate = useNavigate();

  const [show1, setShow1] = useState(false);
  const [addemp, setAddemp] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

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
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

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

  const [navopen, setNavopen] = useState(true);
  const dataFetchedRef = useRef(false);

  const [curremp, setCurremp] = useState({
    uid: "",
    name: "",
    role: "",
    dept: "",
  });

  const [tabdata, setTabdata] = useState({
    uid: "",
    name: "",
    role: "",
    dept: "",
  });
  const [index1, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    if (mainData.length > 2) {
      let temp = [];
      let temp1 = [];
      mainData.map((itms, index) => {
        if (
          itms.dept == "digiverz" &&
          (itms.role == "Employee" || itms.role == "vendor")
        ) {
          temp.push(itms);
        }
        if (itms.dept == "digiverz") {
          temp1.push(itms);
        }
      });

      setSeldept(temp);
      setSeldepthead(temp1);
    }
  }, [mainData]);
  async function fetchData() {
    let res = {
      data: [
        {
          uid: "",
          name: "",
          role: "",
          dept: "",
        },
      ],
    };
    let res1 = {
      data: [
        {
          total: "",
        },
      ],
    };
    let formData1 = new FormData();
    formData1.append("token", localStorage.getItem("token"));
    try {
      res = await axios.post(URI + "getallemp", formData1);
      res1 = await axios.post(URI + "totalemp", formData1);
    } catch (error) {
      console.log(error);
    }

    setMainData(res.data);
    setTotalEmp(parseInt(res1.data[0].total));
  }
  async function fetchData1() {
    let res = {
      data: [
        {
          dept: [],
        },
      ],
    };
    let formData1 = new FormData();
    formData1.append("token", localStorage.getItem("token"));
    res = await axios.post(URI + "getalldept", formData1);

    setDept(res.data[0].dept);

    setLoading(false);
  }
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
    fetchData1();
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
  const [editEmp, setEditemp] = useState(false);

  useEffect(() => {
    $(".card1").removeClass("active");
    $(".modal-content").css("background", "transparent");
    $(".modal-content").css("border", "none");
  }, [show]);
  useEffect(() => {
    $(".card1").removeClass("active");
  }, [addemp]);
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

  const selectDept = (ind) => {
    let temp = [];
    let temp1 = [];
    mainData.map((itms, index) => {
      if (
        ind == itms.dept &&
        (itms.role == "Employee" || itms.role == "vendor")
      ) {
        temp.push(itms);
      }
      if (ind == itms.dept) {
        temp1.push(itms);
      }
    });

    setSeldept(temp);

    setSeldepthead(temp1);
  };

  const editEmployeefun = async (obj) => {
    setShow(false);
    setLoading(true);
    if (obj.role == "Employee") {
      let nuid = "";
      let deptlen = 0;
      let deptid = 0;
      mainData.map((itms) => {
        if (itms.dept == obj.dept) {
          deptlen = deptlen + 1;
        }
      });
      dept.map((itms, index) => {
        if (itms == obj.dept) {
          deptid = index;
        }
      });
      const formData1 = new FormData();
      formData1.append("uid", obj.uid);
      formData1.append("nuid", "emp" + deptid + "0" + (totalEmp + 1));
      formData1.append("name", obj.name);
      formData1.append("role", obj.role);
      formData1.append("dept", obj.dept);
      formData1.append("token", localStorage.getItem("token"));
      const formData2 = new FormData();
      formData2.append("total", totalEmp + 1);
      formData2.append("token", localStorage.getItem("token"));
      let res = {
        data: {
          message: "Failure",
          token: "",
        },
      };
      try {
        res = await axios.post(URI + "regrade", formData1);
        res = await axios.post(URI + "addtotal", formData2);
        fetchData();
        fetchData1();
        setLoading(false);
        $(".card1").removeClass("active");
        $(".menu-item").removeClass("active");
      } catch (error) {
        window.alert("Server Error");
      }
    } else {
      let nuid = "";
      let deptlen = 0;
      let deptid = 0;
      mainData.map((itms) => {
        if (itms.dept == obj.dept && itms.role == obj.role) {
          nuid = itms.uid;
        }
        if (itms.dept == obj.dept) {
          deptlen = deptlen + 1;
        }
      });
      dept.map((itms, index) => {
        if (itms == obj.dept) {
          deptid = index;
        }
      });
      const formData2 = new FormData();
      formData2.append("uid", nuid);
      formData2.append("nuid", "emp" + deptid + "0" + (totalEmp + 1));
      formData2.append("token", localStorage.getItem("token"));
      const formData1 = new FormData();
      formData1.append("uid", obj.uid);
      if (!nuid) {
        if (obj.role == "Practice Lead") {
          formData1.append("nuid", `ad${deptid}02`);
        }
        if (obj.role == "Practice head") {
          formData1.append("nuid", `ad${deptid}01`);
        }
        if (obj.role == "Associate Practice Lead") {
          formData1.append("nuid", `ad${deptid}03`);
        }
      } else {
        formData1.append("nuid", nuid);
      }
      formData1.append("name", obj.name);
      formData1.append("role", obj.role);
      formData1.append("dept", obj.dept);
      formData1.append("token", localStorage.getItem("token"));

      let res = {
        data: {
          message: "Failure",
          token: "",
        },
      };
      let res1 = {
        data: {
          message: "Failure",
          token: "",
        },
      };
      const formData3 = new FormData();
      formData3.append("total", totalEmp + 1);
      formData3.append("token", localStorage.getItem("token"));
      try {
        if (nuid) {
          res1 = await axios.post(URI + "makeemp", formData2);
          res1 = await axios.post(URI + "addtotal", formData3);
        }

        res = await axios.post(URI + "regrade", formData1);
        fetchData();
        fetchData1();
        setLoading(false);
        $(".card1").removeClass("active");
        $(".menu-item").removeClass("active");
      } catch (error) {
        window.alert("Server Error");
      }
    }
  };
  const addEmpfun = async (obj) => {
    setLoading(true);
    const formData1 = new FormData();
    formData1.append("name", obj.name);
    formData1.append("uid", obj.uid);

    formData1.append("password", obj.password);
    formData1.append("role", obj.role);
    formData1.append("dept", obj.dept);
    formData1.append("token", localStorage.getItem("token"));
    const formData2 = new FormData();
    formData2.append("total", totalEmp + 1);
    formData2.append("token", localStorage.getItem("token"));
    let res = {
      data: {
        message: "Failure",
        token: "",
      },
    };
    try {
      res = await axios.post(URI + "register", formData1);
      res = await axios.post(URI + "addtotal", formData2);
      fetchData();
      fetchData1();
      setLoading(false);
      $(".card1").removeClass("active");
      $(".menu-item").removeClass("active");
    } catch (error) {
      window.alert("Server Error");
    }
  };
  const delEmp = async () => {
    setShow1(false);
    setLoading(true);
    const formData = new FormData();
    formData.append("token", localStorage.getItem("token"));
    formData.append("uid", curremp.uid);

    try {
      let res = {
        data: "",
      };
      res = await axios.post(URI + "deleteemp", formData);
      // if (res.data == "Success") {
      //   setAlert(true);
      // }
      // const timer = setTimeout(() => {
      //   setAlert(false);
      // }, 4000);
    } catch (error) {
      window.alert("Some thing went wrong please try again");
      console.log(error);
    }
    setLoading(false);
    fetchData();
    fetchData1();
  };
  const addDept = async (str) => {
    setLoading(true);
    let dept1 = new FormData();
    let t = dept;
    let l = dept.length;
    t.push(str.deptname);
    dept1.append("dept", t);
    dept1.append("token", localStorage.getItem("token"));

    try {
      let res = await axios.post(URI + "adddept", dept1);

      setLoading(false);
      fetchData();
      fetchData1();
    } catch (error) {
      window.alert("Some thing went wrong please try again");
    }
  };
  return (
    <div className=" dashboard Admin ">
      {editEmp && (
        <EditempComponent
          setEditemp={setEditemp}
          curremp={curremp}
          addEmpfun={addEmpfun}
          delEmp={delEmp}
          dept={dept}
          editEmployeefun={editEmployeefun}
        ></EditempComponent>
      )}
      {addemp && (
        <AddemployeeComponent
          setAddemp={setAddemp}
          curremp={{
            dept: selectedDept,
            role: "Employee",
            uid: "emp" + index1 + "0" + (totalEmp + 1),
          }}
          addEmpfun={addEmpfun}
        />
      )}
      {showdept && (
        <AddDeptComponent setshowDept={setshowDept} addDept={addDept} />
      )}

      {loading ? (
        <HomeLoaderComponent></HomeLoaderComponent>
      ) : (
        <div
          class="wrapper"
          style={arabic ? { flexDirection: "row-reverse" } : {}}
        >
          <div class="left-side" style={navopen ? {} : { display: "none" }}>
            <svg viewBox="0 1 511 512" fill="currentColor" class="active">
              <path d="M498.7 222.7L289.8 13.8a46.8 46.8 0 00-66.7 0L14.4 222.6l-.2.2A47.2 47.2 0 0047 303h8.3v153.7a55.2 55.2 0 0055.2 55.2h81.7a15 15 0 0015-15V376.5a25.2 25.2 0 0125.2-25.2h48.2a25.2 25.2 0 0125.1 25.2V497a15 15 0 0015 15h81.8a55.2 55.2 0 0055.1-55.2V303.1h7.7a47.2 47.2 0 0033.4-80.4zm-21.2 45.4a17 17 0 01-12.2 5h-22.7a15 15 0 00-15 15v168.7a25.2 25.2 0 01-25.1 25.2h-66.8V376.5a55.2 55.2 0 00-55.1-55.2h-48.2a55.2 55.2 0 00-55.2 55.2V482h-66.7a25.2 25.2 0 01-25.2-25.2V288.1a15 15 0 00-15-15h-23A17.2 17.2 0 0135.5 244L244.4 35a17 17 0 0124.2 0l208.8 208.8v.1a17.2 17.2 0 010 24.2zm0 0" />
            </svg>

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
                <div class="cards card" style={{ border: "none" }}>
                  <div class="destination Adpage">
                    <div id="AdminPage">
                      <div class="screen menu-view">
                        <nav>
                          <ul>
                            {dept.map((itms, index) => {
                              return (
                                <li
                                  className={"menu-item menu-item" + index}
                                  style={{ fontSize: "13px" }}
                                  onClick={(e) => {
                                    $(".menu-item").removeClass("active");
                                    $(".menu-item" + index).addClass("active");
                                    $(".card1").removeClass("active");
                                    selectDept(itms);
                                    setIndex(index);
                                    setselectedDept(itms);
                                  }}
                                >
                                  <span class="icon">o</span>
                                  <span class="text uppercase">{itms}</span>
                                </li>
                              );
                            })}
                          </ul>
                          <div
                            class="icon3"
                            onClick={() => {
                              setshowDept(true);
                            }}
                          >
                            <div
                              class="icon__home"
                              style={{
                                height: "48px",
                                width: "48px",
                                marginBottom: "10px",
                              }}
                            >
                              <iconify-icon
                                class="close fa-times"
                                icon="ic:baseline-plus"
                              ></iconify-icon>
                            </div>
                          </div>
                        </nav>
                      </div>
                      <div class="screen list-view">
                        <header>
                          <div class="icon menu">o</div>
                          <h1 class="uppercase" style={{ fontSize: "1rem" }}>
                            {arabic ? "الموظفين" : "Employees"}
                          </h1>
                          <div class="icon search">o</div>
                        </header>
                        <section>
                          <ul>
                            {seldepthead.map((itms, index) => {
                              return itms.role != "Employee" &&
                                itms.role != "vendor" ? (
                                <li className="list-item">
                                  <div
                                    class="regrade uppercase"
                                    onClick={() => {
                                      setEditemp(true);
                                      $(".card1").removeClass("active");
                                    }}
                                    style={{ fontSize: "12px" }}
                                  >
                                    <iconify-icon
                                      icon="material-symbols:edit-note-rounded"
                                      style={{ fontSize: "28px" }}
                                    ></iconify-icon>
                                  </div>
                                  <div
                                    className={"card1 card1" + index}
                                    onClick={(e) => {
                                      $(".card1").removeClass("active");
                                      $(".card1" + index).addClass("active");
                                      let temp = itms;
                                      setCurremp(temp);
                                      setFormData({
                                        name: temp.name,
                                        password: "",
                                      });
                                    }}
                                  >
                                    <div class="thumbnail">
                                      <img src={logo3} />
                                    </div>
                                    <div
                                      class="details"
                                      style={{ fontSize: "12px" }}
                                    >
                                      <h2 class="name">{itms.name}</h2>
                                      <p class="teacher">{itms.role}</p>
                                    </div>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              );
                            })}
                            <li className="list-item">
                              <div
                                class="regrade uppercase"
                                onClick={() => {
                                  setAddemp(true);
                                }}
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="white"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-plus"
                                >
                                  <path d="M12 5v14M5 12h14" />
                                </svg>
                              </div>
                              <div
                                className={"card1 card1337"}
                                onClick={(e) => {
                                  $(".card1").removeClass("active");
                                  $(".card1337").addClass("active");
                                }}
                              >
                                <div class="thumbnail">
                                  <img src={logo3} />
                                </div>
                                <div class="details">
                                  <h2 class="name">
                                    {arabic ? "عدد الموظفي" : "Total Employees"}
                                  </h2>
                                  <p
                                    class="teacher"
                                    style={{
                                      fontSize: "13px",
                                    }}
                                  >
                                    {seldept.length}
                                  </p>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </section>
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
                  <div class="account-title">
                    {localStorage.getItem("role")}
                  </div>
                </div>
              </div>
            </div>
            <div class="user-box second-box" style={{ marginTop: "0px" }}>
              <div
                class="cards-header"
                style={{ width: "-webkit-fill-available" }}
              >
                <div class="cards-header-date"></div>
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
                        <th>{arabic ? "هوية شخصية" : "UID"}</th>
                        <th>{arabic ? "اسم" : "Name"} </th>
                        <th>{arabic ? "دور" : "Role"} </th>
                        <th>{arabic ? "قسم" : "Department"}</th>
                        <th>{arabic ? "تعديل" : "Edit"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(rowsPerPage > 0
                        ? seldept.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : seldept
                      ).map((item, index) => {
                        let temp = {
                          uid: "",
                          name: "",
                          role: "",
                          dept: "",
                        };

                        //item.data=JSON.parse(item.data)
                        let it = {
                          uid: "",
                          name: "",
                          role: "",
                          dept: "",
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
                              >
                                {" "}
                                <span class="time">{it.uid}</span>
                              </button>
                            </td>
                            <td>{it.name}</td>
                            <td>{it.role}</td>
                            <td>{it.dept}</td>
                            <td
                              onClick={() => {
                                setCurremp(it);
                                setEditemp(true);
                              }}
                            >
                              <div
                                class="status is-red"
                                style={{ cursor: "pointer" }}
                              >
                                <iconify-icon
                                  icon="material-symbols:edit-note-rounded"
                                  style={{ fontSize: "28px" }}
                                ></iconify-icon>
                              </div>
                            </td>
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
                            3,
                            mainData.length < 10
                              ? { label: "All", value: -1 }
                              : 10,
                          ]}
                          colSpan={3}
                          count={seldept.length}
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
      )}
    </div>
  );
};

export default AdminComponent;
