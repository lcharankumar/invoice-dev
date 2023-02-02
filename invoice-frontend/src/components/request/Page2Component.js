import React, { useEffect, useState } from "react";
import { TestData } from "../../data";
import { TestData2 } from "../../data";
import { TestData3 } from "../../data";
import SpinnerComponent from "./SpinnerComponent";
import original from "../../img/original.png";
import img1 from "../../img/img1.png";
import img2 from "../../img/img2.png";
import ZoomComponent from "./ZoomComponent";
import TableComponent from "./TableComponent";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AddCustom from "./AddCustom";
import axios from "axios";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ImageCropper from "./ImageCropperComponent";
import RectangleComponent from "./RectangleComponent";
import { Link } from "react-router-dom";

import { ArabicContext } from "../../context/arabicContext";
import { DarkModeContext } from "../../context/darkModeContext";

import { useContext } from "react";
import { color } from "@mui/system";
import URI from "../utils/requests";
import { getByAltText } from "@testing-library/react";
const Page2Component = (props) => {
  const { arabic } = useContext(ArabicContext);
  const { darkMode } = useContext(DarkModeContext);

  let label = [
    "Company Name",
    "From Address",
    "To Address",
    "Invoice Date",
    "Due Date",
    "Phone Number",
    "Invoice Number",
    "Currency",
    "Total",
    "Sub Total",
    "Tax",
    "Discount",
    "Barcode",
    "Logo",
    "Bill Of Materials",
  ];
  let label3 = [
    "اسم الشركة",
    "من العنوان",
    "إلى عنوان",
    "تاريخ الفاتورة",
    "تاريخ الاستحقاق",
    "رقم الهاتف",
    "رقم الفاتورة",
    "عملة",
    "المجموع",
    "المجموع الفرعي",
    "ضريبة",
    "تخفيض",
  ];

  let label1 = [
    "company_name",
    "from_address",
    "to_address",
    "invoice_date",
    "due_date",
    "phone_number",
    "invoice_number",
    "currency",
    "total",
    "sub_total",
    "tax",
    "discount",
    "barcode",
    "logo",
    "bill_of_materials",
    "company_name",
  ];

  const [crop, setCrop] = useState(null);
  const [prevTxt, setPrevTxt] = useState("");
  const [prevScore, setPrevScore] = useState("");
  const [rect, setRect] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [bill, setBill] = useState(false);
  const [prev, setPrev] = useState(null);
  const [predicted, setPredicted] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [rowdata, setrowdata] = useState([]);
  const [data, setData] = useState({
    company_name: "",
    from_address: "",
    to_address: "",
    invoice_date: "",
    due_date: "",
    phone_number: "",
    invoice_number: "",
    currency: "",
    total: "",
    sub_total: "",
    tax: "",
    discount: "",
    barcode: "",
    category: "",
    logo: "",
    custom: [{}],
    bill_of_materials: [
      {
        description: [""],
        quantity: [""],
        unit_price: [""],
        price: [""],
      },
    ],
  });
  const [labInd, setLabInd] = useState(0);
  const [edit, setEdit] = useState(-1);
  const [extract, setExtract] = useState("");
  const [collapse, setCollapse] = useState(false);
  const [disable, setDisable] = useState(false);
  const [spin, setSpin] = useState(false);
  const [dat, setDat] = useState(1);
  const [txt, setTxt] = useState("");
  let img = props.img;
  let setImg = props.setImg;
  const [zoom, setZoom] = useState(false);
  let setCoordinates = props.setCoordinates;
  let coordinates = props.coordinates;
  let labText = "";

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const [currh, setCurrh] = useState(0);
  const [currw, setCurrw] = useState(0);
  const [lang, setLang] = useState("");

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  useEffect(() => {
    setPredicted(true);
  }, [props.index]);

  const setBg = (index) => {
    if (index == 0) {
      return data.company_name != "" && data.company_name != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 1) {
      return data.from_address != "" && data.from_address != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 2) {
      return data.to_address != "" && data.to_address != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 3) {
      return data.invoice_date != "" && data.invoice_date != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 4) {
      return data.due_date != "" && data.due_date != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 5) {
      return data.phone_number != "" && data.phone_number != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 6) {
      return data.invoice_number && (data.invoice_number != "none") != ""
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 7) {
      return data.currency != "" && data.currency != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 8) {
      return data.total != "" && data.total != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 9) {
      return data.sub_total != "" && data.sub_total != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 10) {
      return data.tax != "" && data.tax != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 11) {
      return data.discount != "" && data.discount != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 12) {
      return data.barcode != "" && data.barcode != "none"
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 14) {
      return data.category != "" && data.category != "none"
        ? { background: "green" }
        : { background: "red" };
    }

    return { background: "green" };
  };

  const predictlabel = async (event) => {
    setSpin(true);
    event.preventDefault();
    const formData1 = new FormData();
    formData1.append("file_input", props.file);
    formData1.append("lang_input", props.lang);
    formData1.append("token", localStorage.getItem("token"));

    let res = {
      data: {
        company_name: "",
        from_address: "",
        to_address: "",
        invoice_date: "",
        due_date: "",
        phone_number: "",
        invoice_number: "",
        currency: "",
        total: "",
        sub_total: "",
        tax: "",
        discount: "",
        barcode: "",
        category: "",
        logo: "",
        bill_of_materials: [
          {
            description: [""],
            quantity: [""],
            unit_price: [""],
            price: [""],
          },
        ],
      },
    };
    //res.data = TestData2;
    console.log(res.data.custom);
    try {
      res = await axios.post(URI + "predict", formData1);
    } catch (error) {
      window.alert("Some thing went wrong please try again");
      //window.location.reload();
    }

    setDat(dat + 1);
    event.preventDefault();

    setImg(props.org);
    //setImg(img1)

    setData(res.data);

    //setData(TestData3);
    setSpin(false);
    setPredicted(false);
  };

  const sumSub = () => {
    let s = 0;
    data.bill_of_materials[0].price.map((itms) => {
      s = s + parseInt(itms);
    });
    return s;
  };
  const handleSubmit = async () => {
    if (edit == 15) {
      getText();
      return;
    }
    setZoom(true);

    handleClose();
    setSpin(true);
    var arr = crop.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let imageFile1 = new File([u8arr], "cropped.png", { type: "image/png" });
    setImageFile(crop);

    var image = new Image();
    image.src = crop;
    //let im = URL.createObjectURL(crop);
    const formData2 = new FormData();
    formData2.append("file_input", imageFile1);
    formData2.append("label_input", label1[edit]);
    formData2.append("token", localStorage.getItem("token"));
    formData2.append("lang_input", props.lang);

    let res = { data: "" };
    if (edit === 13) {
      res = {
        data: {
          bill_of_materials: [
            {
              description: [""],
              quantity: [""],
              unit_price: [""],
              price: [""],
            },
          ],
        },
      };
    }

    try {
      res = await axios.post(URI + "crop", formData2);
    } catch (error) {
      window.alert("Some thing went wrong please try again");
    }

    const txt = res.data;
    //const txt = "26/09/2022";

    if (edit == 0) {
      let temp = data;
      temp.company_name = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 1) {
      let temp = data;
      temp.from_address = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 2) {
      let temp = data;
      temp.to_address = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 3) {
      let temp = data;
      temp.invoice_date = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 4) {
      let temp = data;
      temp.due_date = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 5) {
      let temp = data;
      temp.phone_number = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 6) {
      let temp = data;
      temp.invoice_number = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 7) {
      let temp = data;
      temp.currency = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 8) {
      let temp = data;
      temp.total = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 9) {
      let temp = data;
      temp.sub_total = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 10) {
      let temp = data;
      temp.tax = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 11) {
      let temp = data;
      temp.discount = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 12) {
      let temp = data;
      temp.barcode = txt;
      setTxt(txt);
      setData(temp);
    }
    if (edit == 13) {
      let temp = data;
      temp.bill_of_materials = txt;
      setTxt(txt);
      setData(temp);
    }

    setRect(true);
    setPrev(img);
    setSpin(false);
  };
  const revert = () => {
    setImg(prev);
    if (edit == 0) {
      let temp = data;
      temp.company_name = prevTxt;
      setData(temp);
    }
    if (edit == 1) {
      let temp = data;
      temp.from_address = prevTxt;
      setData(temp);
    }
    if (edit == 2) {
      let temp = data;
      temp.to_address = prevTxt;
      setData(temp);
    }
    if (edit == 3) {
      let temp = data;
      temp.invoice_date = prevTxt;
      setData(temp);
    }
    if (edit == 4) {
      let temp = data;
      temp.due_date = prevTxt;
      setData(temp);
    }
    if (edit == 5) {
      let temp = data;
      temp.phone_number = prevTxt;
      setData(temp);
    }
    if (edit == 6) {
      let temp = data;
      temp.invoice_number = prevTxt;
      setData(temp);
    }
    if (edit == 7) {
      let temp = data;
      temp.currency = prevTxt;
      setData(temp);
    }
    if (edit == 8) {
      let temp = data;
      temp.total = prevTxt;
      setData(temp);
    }
    if (edit == 9) {
      let temp = data;
      temp.sub_total = prevTxt;
      setData(temp);
    }
    if (edit == 10) {
      let temp = data;
      temp.tax = prevTxt;
      setData(temp);
    }
    if (edit == 11) {
      let temp = data;
      temp.discount = prevTxt;
      setData(temp);
    }
    if (edit == 12) {
      let temp = data;
      temp.barcode = prevTxt;
      setData(temp);
    }
    if (edit == 13) {
      let temp = data;
      temp.bill_of_materials = prevTxt;
      setData(temp);
    }
  };
  const handleClose = () => setShow(false);
  const add = (text) => {
    const myArray = text.split("\n");
    return (
      <>
        {myArray.map((str, index) => {
          if (index === 0) {
            return (
              <p style={{ marginBottom: "0" }}>
                {str}

                <span
                  class="ColBtn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={() => setCollapse(!collapse)}
                >
                  <iconify-icon icon="akar-icons:arrow-up"></iconify-icon>
                </span>
              </p>
            );
          } else {
            if (str != "" && str != "\f") {
              return <p style={{ marginBottom: "0" }}>{str}</p>;
            }
            return <></>;
          }
        })}
      </>
    );
  };
  const getText = async () => {
    setShow(false);
    setSpin(true);
    var arr = crop.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let imageFile1 = new File([u8arr], "cropped.png", { type: "image/png" });
    setImageFile(crop);

    var image = new Image();
    image.src = crop;
    //let im = URL.createObjectURL(crop);
    const formData2 = new FormData();
    formData2.append("file_input", imageFile1);
    formData2.append("label_input", label1[0]);
    formData2.append("token", localStorage.getItem("token"));
    formData2.append("lang_input", props.lang);

    let res = { data: "" };
    if (edit === 13) {
      res = {
        data: {
          bill_of_materials: [
            {
              description: [""],
              quantity: [""],
              unit_price: [""],
              price: [""],
            },
          ],
        },
      };
    }

    try {
      res = await axios.post(URI + "crop", formData2);
      setSpin(false);
    } catch (error) {
      window.alert("Some thing went wrong please try again");
      setSpin(false);
    }

    const txt = res.data;
    //const txt = "29/09/2022";
    const rowsInput = [...rowdata];
    console.log(rowsInput, labInd);
    rowsInput[labInd]["value"] = txt;
    let temp = data;
    temp.custom = rowsInput;
    setData(temp);
  };
  const add1 = (text) => {
    const myArray = text.split("\n");
    return (
      <>
        {myArray.map((str, index) => {
          if (index === 0) {
            return (
              <p style={{ marginBottom: "0" }}>
                {str}

                <span
                  class="ColBtn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={() => setCollapse(!collapse)}
                >
                  <iconify-icon icon="akar-icons:arrow-up"></iconify-icon>
                </span>
              </p>
            );
          } else {
            if (str != "" && str != "\f") {
              return <p style={{ marginBottom: "0" }}>{str}</p>;
            }
            return <></>;
          }
        })}
      </>
    );
  };
  const [currCust, setCurrCust] = useState(false);
  const cust = () => {
    const rows = [];
    for (var itms in data.custom) {
      console.log(data.custom[itms]);
      rows.push(
        <tr>
          <td class="headcol">
            <span className="dot" style={setBg(11)}></span>
            {data.custom[itms].label}
          </td>
          <td>
            <input
              style={{ border: "none" }}
              className="typing-container"
              value={data.custom[itms].value}
              readOnly={true}
            />
          </td>
          <td> </td>
        </tr>
      );
    }
    return rows;
  };
  if (currCust) {
    return (
      <AddCustom
        show={currCust}
        setShow={setCurrCust}
        data={data}
        setData={setData}
        mainData={data.custom}
        showCrop={setShow}
        txt={extract}
        getText={getText}
        setLabInd={setLabInd}
        setrowdata={setrowdata}
      />
    );
  }
  return (
    <>
      <Modal
        show={show}
        style={{ minWidth: "100vw" }}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <button className="Predictbtn" onClick={handleSubmit}>
              {arabic ? "استخراج النص" : "Extract Text"}
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageCropper
            img={img}
            setCoordinates={props.setCoordinates}
            setCrop={setCrop}
            currh={currh}
            currw={currw}
            setCurrh={setCurrh}
            setCurrw={setCurrw}
          />
        </Modal.Body>
      </Modal>
      {spin ? (
        <>
          <SpinnerComponent />
        </>
      ) : (
        <>
          <fieldset style={{ padding: "auto" }}>
            <div class="container" style={{ minHeight: "731px" }}>
              <div class="row">
                <div class="col">
                  <div class="">
                    <div class="">
                      <div
                        style={
                          arabic
                            ? {
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row-reverse",
                              }
                            : {
                                display: "flex",
                                justifyContent: "space-between",
                              }
                        }
                      >
                        {disable && edit !== 13 ? (
                          <>
                            {" "}
                            {arabic ? (
                              <h5
                                class="card-title"
                                style={{
                                  fontFamily: `Arial, "Helvetica Neue", Helvetica, sans-serif`,
                                  fontStyle: "italic",
                                }}
                              >
                                {"حدد قيمة"} {label3[edit]}
                              </h5>
                            ) : (
                              <h5
                                class="card-title"
                                style={{
                                  fontFamily: `Arial, "Helvetica Neue", Helvetica, sans-serif`,
                                  fontStyle: "italic",
                                }}
                              >
                                Select value for {label[edit]}
                              </h5>
                            )}
                            <Button
                              style={{
                                color: "#ffffff",
                                border: "1px solid #f87115",
                                borderRadius: "15px",
                                padding: "8px 25px",
                                textTransform: "uppercase",
                                fontSize: "13px",
                                fontWeight: "500",
                                letterSpacing: "1px",
                                background: "#f87115",
                              }}
                              onClick={() => handleShow("xxl-down")}
                            >
                              {arabic ? "اختر نص" : "Select Text"}
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <br />
                      {rect && (
                        <RectangleComponent
                          img={img}
                          coordinates={coordinates}
                          setImg={setImg}
                          setMyFinal={props.setMyFinal}
                          currh={currh}
                          currw={currw}
                          setCurrh={setCurrh}
                          setCurrw={setCurrw}
                          txt={label[edit]}
                          setRect={setRect}
                          revert={revert}
                          extract={extract}
                          label={label[edit]}
                          label1={label3[edit]}
                          cancel={cancel}
                          setCancel={setCancel}
                        />
                      )}
                      {img && (
                        <div
                          class="member"
                          data-aos="zoom-in"
                          data-aos-delay="100"
                        >
                          <div class="about-img">
                            <img
                              class="card-img-top"
                              src={img}
                              alt="Card image cap"
                            />
                            <div class="member-info">
                              <div class="member-info-content">
                                <h4>
                                  {" "}
                                  <button
                                    type="button"
                                    class="Predictbtn"
                                    onClick={() => {
                                      props.setIndex(0);
                                      //window.location.reload()
                                    }}
                                  >
                                    {arabic ? "تغيير الملف" : " Change File"}
                                  </button>
                                </h4>
                                <span>{props.name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  class="Tabcol col card "
                  style={{ border: "none", background: "none" }}
                >
                  {predicted ? (
                    <div className="LangSelect">
                      <div className="Empt custom-select ">
                        <p>
                          {arabic
                            ? "اضغط على الزر لاستخراج التسمية والنص ...!"
                            : "Tap the button to extract the label and text ...!"}
                        </p>
                        <div
                          class="col-lg-4 d-flex align-items-center justify-content-center position-relative"
                          style={{ width: "100%" }}
                          data-aos="zoom-in"
                          data-aos-delay="200"
                        >
                          <button
                            className="glightbox play-btn"
                            onClick={predictlabel}
                          >
                            {" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="PredTab"
                        style={bill ? { display: "none" } : {}}
                      >
                        {arabic ? (
                          <p className="TabHead">
                            {"المتوقعة"} {"  "}
                            <span>{"التسميات"}</span>
                          </p>
                        ) : (
                          <p className="TabHead">
                            Predicted L<span>abels</span>
                          </p>
                        )}
                        <div
                          className="card-body Table"
                          style={{ width: "fit-content", padding: "0" }}
                        >
                          <table
                            class="Tab "
                            style={
                              arabic
                                ? {
                                    direction: "rtl",
                                    width: "-webkit-fill-available",
                                  }
                                : { width: "-webkit-fill-available" }
                            }
                          >
                            <thead>
                              <th class="headcol">
                                {" "}
                                <span style={{ backgroundolor: "white" }}>
                                  {arabic ? "ملصقات" : "Label"}
                                </span>{" "}
                              </th>
                              <th>{arabic ? "القيمة" : "Text"}</th>

                              <th>
                                {" "}
                                <Dropdown>
                                  <Dropdown.Toggle
                                    className="Dropdown"
                                    style={{ padding: "0" }}
                                    id="dropdown-basic"
                                  >
                                    <span className="Pen">
                                      <iconify-icon
                                        icon="uil:plus"
                                        style={
                                          darkMode
                                            ? {
                                                cursor: "pointer",
                                                color: "white",
                                                fontSize: "large",
                                              }
                                            : {
                                                cursor: "pointer",
                                                color: "black",
                                                fontSize: "large",
                                              }
                                        }
                                      ></iconify-icon>{" "}
                                    </span>
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.ItemText>
                                      Available fields
                                    </Dropdown.ItemText>
                                    <Dropdown.Divider />
                                    {data.company_name == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.company_name = "none";
                                          setTxt("none");
                                          setEdit(0);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {arabic
                                          ? " رقم الهاتف"
                                          : "Company Name"}
                                      </Dropdown.Item>
                                    )}
                                    {data.from_address == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.from_address = "none";
                                          setTxt("none");
                                          setEdit(1);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {arabic
                                          ? " تاريخ الاستحقاق"
                                          : "From Address"}
                                      </Dropdown.Item>
                                    )}
                                    {data.to_address == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.to_address = "none";
                                          setTxt("none");
                                          setEdit(2);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {arabic
                                          ? "تاريخ الفاتورة"
                                          : "To Address"}
                                      </Dropdown.Item>
                                    )}
                                    {data.invoice_date == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.invoice_date = "none";
                                          setTxt("none");
                                          setEdit(3);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {arabic ? "إلى عنوان" : "Invoice Date"}
                                      </Dropdown.Item>
                                    )}
                                    {data.due_date == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.due_date = "none";
                                          setTxt("none");
                                          setEdit(4);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {" "}
                                        {arabic ? " من العنوان" : "Due Date"}
                                      </Dropdown.Item>
                                    )}
                                    {data.phone_number == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.phone_number = "none";
                                          setTxt("none");
                                          setEdit(5);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {arabic
                                          ? "اسم الشركة "
                                          : "Phone Number"}
                                      </Dropdown.Item>
                                    )}
                                    {data.invoice_number == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.invoice_number = "none";
                                          setTxt("none");
                                          setEdit(6);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {" "}
                                        {arabic ? "تخفيض" : "Invoice Number"}
                                      </Dropdown.Item>
                                    )}

                                    {data.total == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.total = "none";
                                          setTxt("none");
                                          setEdit(8);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {" "}
                                        {arabic ? "المجموع الفرعي" : "total"}
                                      </Dropdown.Item>
                                    )}
                                    {data.sub_total == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.sub_total = "none";
                                          setTxt("none");
                                          setEdit(9);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {arabic ? "المجموع" : "Sub Total"}
                                      </Dropdown.Item>
                                    )}
                                    {data.tax == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.tax = "none";
                                          setTxt("none");
                                          setEdit(10);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {arabic ? "عملة" : "Tax"}
                                      </Dropdown.Item>
                                    )}
                                    {data.discount == "" && (
                                      <Dropdown.Item
                                        onClick={() => {
                                          let temp = data;
                                          temp.discount = "none";
                                          setTxt("none");
                                          setEdit(11);
                                          setDisable(!disable);
                                          setData(temp);
                                        }}
                                      >
                                        {arabic ? "رقم الفاتورة" : "Discount"}
                                      </Dropdown.Item>
                                    )}
                                  </Dropdown.Menu>
                                </Dropdown>
                              </th>
                            </thead>
                            <tbody>
                              {data.company_name != "" && (
                                <tr>
                                  <td class="headcol">
                                    <span
                                      className="dot"
                                      style={setBg(0)}
                                    ></span>
                                    {arabic ? " رقم الهاتف" : "Company Name"}
                                  </td>
                                  <td>
                                    <input
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.company_name}
                                      onChange={(event) => {
                                        setTxt(event.target.value);
                                        if (event.target.value == "") {
                                          let temp = data;
                                          temp.company_name = " ";
                                          setData(temp);
                                        } else {
                                          let temp = data;
                                          temp.company_name =
                                            event.target.value;
                                          setData(temp);
                                        }
                                      }}
                                      readOnly={
                                        edit === 0 && disable ? false : true
                                      }
                                    />
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setPrevTxt(data.company_name);
                                        setPrevScore(data.company_name);
                                        setEdit(0);
                                        setDisable(!disable);
                                        if (disable) {
                                          let temp = data;
                                          temp.company_name =
                                            temp.company_name.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 0 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}
                              {data.from_address != "" && (
                                <tr>
                                  <td class="Add headcol">
                                    <span
                                      className="dot"
                                      style={setBg(1)}
                                    ></span>
                                    {arabic
                                      ? " تاريخ الاستحقاق"
                                      : "From Address"}
                                  </td>
                                  <td>
                                    <p
                                      style={
                                        collapse
                                          ? {
                                              display: "none",
                                            }
                                          : { marginBottom: "0" }
                                      }
                                    >
                                      {data.from_address == ""
                                        ? "---"
                                        : data.from_address &&
                                          data.from_address.substring(0, 6) +
                                            "  ...  "}

                                      <span
                                        class="ColBtn"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#collapseExample"
                                        aria-expanded="false"
                                        aria-controls="collapseExample"
                                        onClick={() => setCollapse(!collapse)}
                                      >
                                        <iconify-icon icon="akar-icons:arrow-down"></iconify-icon>
                                      </span>
                                    </p>
                                    <div
                                      className={collapse ? "" : "collapse"}
                                      id="collapseExample"
                                    >
                                      <div
                                        class="card card-body"
                                        style={{
                                          border: "none",
                                          padding: "0",
                                          background: "none",
                                        }}
                                      >
                                        {edit === 1 && disable ? (
                                          <>
                                            {" "}
                                            <textarea
                                              style={{
                                                border: "none",
                                                minHeight: "100px",
                                              }}
                                              className="typing-container"
                                              value={data.from_address}
                                              onChange={(event) => {
                                                setTxt(event.target.value);
                                                if (event.target.value == "") {
                                                  let temp = data;
                                                  temp.from_address = " ";
                                                  setData(temp);
                                                } else {
                                                  let temp = data;
                                                  temp.from_address =
                                                    event.target.value;
                                                  setData(temp);
                                                }
                                              }}
                                            />
                                          </>
                                        ) : (
                                          add(data.from_address)
                                        )}
                                      </div>
                                    </div>
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setPrevTxt(data.from_address);
                                        setPrevScore(data.from_address);
                                        setEdit(1);
                                        if (disable) {
                                          let temp = data;
                                          temp.from_address =
                                            temp.from_address.trimStart();
                                          setData(temp);
                                        }
                                        setDisable(!disable);
                                      }}
                                    >
                                      {edit === 1 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}
                              {data.to_address != "" && (
                                <tr>
                                  <td class="Add headcol">
                                    <span
                                      className="dot"
                                      style={setBg(2)}
                                    ></span>
                                    {arabic ? "تاريخ الفاتورة" : "To Address"}
                                  </td>
                                  <td>
                                    <p
                                      style={
                                        collapse
                                          ? {
                                              display: "none",
                                            }
                                          : { marginBottom: "0" }
                                      }
                                    >
                                      {data.to_address == ""
                                        ? "---"
                                        : data.to_address &&
                                          data.to_address.substring(0, 6) +
                                            "  ...  "}

                                      <span
                                        class="ColBtn"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#collapseExample"
                                        aria-expanded="false"
                                        aria-controls="collapseExample"
                                        onClick={() => setCollapse(!collapse)}
                                      >
                                        <iconify-icon icon="akar-icons:arrow-down"></iconify-icon>
                                      </span>
                                    </p>
                                    <div
                                      className={collapse ? "" : "collapse"}
                                      id="collapseExample"
                                    >
                                      <div
                                        class="card card-body"
                                        style={{
                                          border: "none",
                                          padding: "0",
                                          background: "none",
                                        }}
                                      >
                                        {edit === 2 && disable ? (
                                          <>
                                            {" "}
                                            <textarea
                                              style={{
                                                border: "none",
                                                minHeight: "100px",
                                              }}
                                              className="typing-container"
                                              value={data.to_address}
                                              onChange={(event) => {
                                                setTxt(event.target.value);
                                                if (event.target.value == "") {
                                                  let temp = data;
                                                  temp.to_address = " ";
                                                  setData(temp);
                                                } else {
                                                  let temp = data;
                                                  temp.to_address =
                                                    event.target.value;
                                                  setData(temp);
                                                }
                                              }}
                                            />
                                          </>
                                        ) : (
                                          add1(data.to_address)
                                        )}
                                      </div>
                                    </div>
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        setEdit(2);
                                        setDisable(!disable);
                                        if (disable) {
                                          let temp = data;
                                          temp.to_address =
                                            temp.to_address.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 2 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}
                              {data.invoice_date != "" && (
                                <tr>
                                  <td class="headcol">
                                    <span
                                      className="dot"
                                      style={setBg(3)}
                                    ></span>
                                    {arabic ? "إلى عنوان" : "Invoice Date"}
                                  </td>
                                  <td>
                                    <input
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.invoice_date}
                                      onChange={(event) => {
                                        setTxt(event.target.value);
                                        if (event.target.value == "") {
                                          let temp = data;
                                          temp.invoice_date = " ";
                                          setData(temp);
                                        } else {
                                          let temp = data;
                                          temp.invoice_date =
                                            event.target.value;
                                          setData(temp);
                                        }
                                      }}
                                      readOnly={
                                        edit === 3 && disable ? false : true
                                      }
                                    />
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setEdit(3);
                                        setDisable(!disable);
                                        if (disable) {
                                          let temp = data;
                                          temp.invoice_date =
                                            temp.invoice_date.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 3 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}
                              {data.due_date != "" && (
                                <tr>
                                  <td class="headcol">
                                    <span
                                      className="dot"
                                      style={setBg(4)}
                                    ></span>
                                    {arabic ? " من العنوان" : "Due Date"}
                                  </td>
                                  <td>
                                    <input
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.due_date}
                                      onChange={(event) => {
                                        setTxt(event.target.value);
                                        if (event.target.value == "") {
                                          let temp = data;
                                          temp.due_date = " ";
                                          setData(temp);
                                        } else {
                                          let temp = data;
                                          temp.due_date = event.target.value;
                                          setData(temp);
                                        }
                                      }}
                                      readOnly={
                                        edit === 4 && disable ? false : true
                                      }
                                    />
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setPrevTxt(data.due_date);
                                        setPrevScore(data.due_date);
                                        setEdit(4);
                                        setDisable(!disable);

                                        if (disable) {
                                          let temp = data;
                                          temp.due_date =
                                            temp.due_date.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 4 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}
                              {data.phone_number != "" && (
                                <tr>
                                  <td class="headcol">
                                    <span
                                      className="dot"
                                      style={setBg(5)}
                                    ></span>
                                    {arabic ? "اسم الشركة " : "Phone Number"}
                                  </td>
                                  <td>
                                    <input
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.phone_number}
                                      onChange={(event) => {
                                        setTxt(event.target.value);
                                        if (event.target.value == "") {
                                          let temp = data;
                                          temp.phone_number = " ";
                                          setData(temp);
                                        } else {
                                          let temp = data;
                                          temp.phone_number =
                                            event.target.value;
                                          setData(temp);
                                        }
                                      }}
                                      readOnly={
                                        edit === 5 && disable ? false : true
                                      }
                                    />
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        setEdit(5);
                                        setDisable(!disable);
                                        if (disable) {
                                          let temp = data;
                                          temp.phone_number =
                                            temp.phone_number.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 5 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}
                              {data.invoice_number != "" && (
                                <tr>
                                  <td class="headcol">
                                    <span
                                      className="dot"
                                      style={setBg(6)}
                                    ></span>
                                    {arabic ? "تخفيض" : "Invoice Number"}
                                  </td>
                                  <td>
                                    <input
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.invoice_number}
                                      onChange={(event) => {
                                        setTxt(event.target.value);
                                        if (event.target.value == "") {
                                          let temp = data;
                                          temp.invoice_number = " ";
                                          setData(temp);
                                        } else {
                                          let temp = data;
                                          temp.invoice_number =
                                            event.target.value;
                                          setData(temp);
                                        }
                                      }}
                                      readOnly={
                                        edit === 6 && disable ? false : true
                                      }
                                    />
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        setEdit(6);
                                        setDisable(!disable);
                                        if (disable) {
                                          let temp = data;
                                          temp.invoice_number =
                                            temp.invoice_number.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 6 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td class="headcol">
                                  <span class="dot" style={setBg(14)}></span>
                                  {arabic ? "الفئة" : "Category"}
                                </td>
                                <td>
                                  {edit === 14 && disable ? (
                                    <select
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.category}
                                      onChange={(event) => {
                                        let temp = data;
                                        temp.category = event.target.value;
                                        setTxt(event.target.value);
                                        setData(temp);
                                      }}
                                    >
                                      <option>
                                        {arabic
                                          ? "اختر تصنيف"
                                          : "Select a Category"}
                                      </option>
                                      <option value="Automotive">
                                        Automotive
                                      </option>
                                      <option value="Retail">Retail</option>
                                      <option value="Food">Food</option>
                                      <option value="Appliances">
                                        Appliances
                                      </option>
                                      <option value="Health Care">
                                        Health Care
                                      </option>
                                      <option value="Industry">Industry</option>
                                      <option value="Electronics">
                                        Electronics
                                      </option>
                                    </select>
                                  ) : (
                                    <input
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.category}
                                      readOnly={true}
                                    />
                                  )}
                                </td>

                                <td>
                                  <button
                                    className="Pen"
                                    onClick={(e) => {
                                      e.preventDefault();

                                      setEdit(14);
                                      setDisable(!disable);
                                    }}
                                  >
                                    {edit === 14 && disable ? (
                                      <iconify-icon icon="charm:tick"></iconify-icon>
                                    ) : (
                                      <iconify-icon icon="uil:pen"></iconify-icon>
                                    )}
                                  </button>
                                </td>
                              </tr>
                              {
                                <tr>
                                  <td class="headcol">
                                    <span
                                      className="dot"
                                      style={setBg(7)}
                                    ></span>
                                    {arabic ? "ضريبة" : "Currency"}
                                  </td>
                                  <td>
                                    {edit === 7 && disable ? (
                                      <select
                                        style={{ border: "none" }}
                                        className="typing-container"
                                        value={data.currency}
                                        onChange={(event) => {
                                          setTxt(event.target.value);

                                          let temp = data;
                                          temp.currency = event.target.value;
                                          setData(temp);
                                        }}
                                      >
                                        <option>
                                          {arabic
                                            ? "اختر تصنيف"
                                            : "Select Currency"}
                                        </option>
                                        <option value="$">$ USD</option>
                                        <option value="€">€ EURO</option>
                                        <option value="₹">₹ INR</option>
                                        <option value={"﷼"}>﷼ SAR</option>
                                      </select>
                                    ) : (
                                      <input
                                        style={{ border: "none" }}
                                        className="typing-container"
                                        value={data.currency}
                                        readOnly={true}
                                      />
                                    )}
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setEdit(7);
                                        setDisable(!disable);
                                        if (disable) {
                                          let temp = data;
                                          temp.currency =
                                            temp.currency.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 7 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              }

                              {data.sub_total != "" && (
                                <tr>
                                  <td class="headcol">
                                    <span
                                      className="dot"
                                      style={setBg(9)}
                                    ></span>
                                    {arabic ? "المجموع الفرعي" : "Sub Total"}
                                  </td>
                                  <td>
                                    <span>
                                      {edit !== 9 &&
                                        !disable &&
                                        parseInt(data.sub_total) !=
                                          sumSub() && (
                                          <OverlayTrigger
                                            placement="top"
                                            popperConfig={{
                                              modifiers: {
                                                preventOverflow: {
                                                  enabled: false,
                                                },
                                              },
                                            }}
                                            delay={{ show: 950, hide: 900 }}
                                            overlay={
                                              <Tooltip id="button-tooltip">
                                                {arabic
                                                  ? "تحذير"
                                                  : "Warning ..!"}{" "}
                                                <br />
                                                <br />
                                                {arabic
                                                  ? "المجموع الفرعي غير مطابق للمبلغ المحسوب من فاتورة المواد يرجى التحقق منه"
                                                  : "Sub total is not matching with calculated amount from Bill of materials kindly verify it."}{" "}
                                                <br />
                                                <br />
                                              </Tooltip>
                                            }
                                          >
                                            <iconify-icon icon="material-symbols:warning-outline-rounded"></iconify-icon>
                                          </OverlayTrigger>
                                        )}
                                    </span>{" "}
                                    <input
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.sub_total}
                                      onChange={(event) => {
                                        setTxt(event.target.value);
                                        if (event.target.value == "") {
                                          let temp = data;
                                          temp.sub_total = " ";
                                          setData(temp);
                                        } else {
                                          let temp = data;
                                          temp.sub_total = event.target.value;
                                          setData(temp);
                                        }
                                      }}
                                      readOnly={
                                        edit === 9 && disable ? false : true
                                      }
                                    />
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setPrevTxt(data.sub_total);
                                        setPrevScore(data.sub_total);
                                        setEdit(9);
                                        setDisable(!disable);

                                        if (disable) {
                                          let temp = data;
                                          temp.sub_total =
                                            temp.sub_total.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 9 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}
                              {data.tax != "" && (
                                <tr>
                                  <td class="headcol">
                                    <span
                                      className="dot"
                                      style={setBg(10)}
                                    ></span>
                                    {arabic ? "% عملة" : "Tax %"}
                                  </td>
                                  <td>
                                    <input
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.tax}
                                      onChange={(event) => {
                                        setTxt(event.target.value);
                                        if (event.target.value == "") {
                                          let temp = data;
                                          temp.tax = " ";
                                          setData(temp);
                                        } else {
                                          let temp = data;
                                          temp.tax = event.target.value;
                                          setData(temp);
                                        }
                                      }}
                                      readOnly={
                                        edit === 10 && disable ? false : true
                                      }
                                    />
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        setEdit(10);
                                        setDisable(!disable);
                                        if (disable) {
                                          let temp = data;
                                          temp.tax = temp.tax.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 10 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}
                              {data.discount != "" && (
                                <tr>
                                  <td class="headcol">
                                    <span
                                      className="dot"
                                      style={setBg(11)}
                                    ></span>
                                    {arabic ? "رقم الفاتورة" : "Discount"}
                                  </td>
                                  <td>
                                    <input
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.discount}
                                      onChange={(event) => {
                                        setTxt(event.target.value);
                                        if (event.target.value == "") {
                                          let temp = data;
                                          temp.discount = " ";
                                          setData(temp);
                                        } else {
                                          let temp = data;
                                          temp.discount = event.target.value;
                                          setData(temp);
                                        }
                                      }}
                                      readOnly={
                                        edit === 11 && disable ? false : true
                                      }
                                    />
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        setEdit(11);
                                        setDisable(!disable);
                                        if (disable) {
                                          let temp = data;
                                          temp.discount =
                                            temp.discount.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 11 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}

                              {data.total != "" && (
                                <tr>
                                  <td class="headcol">
                                    <span
                                      className="dot"
                                      style={setBg(8)}
                                    ></span>
                                    {arabic ? "مجموع" : "total"}
                                  </td>
                                  <td>
                                    {parseInt(
                                      (parseFloat(data.sub_total) / 100) *
                                        parseFloat(data.tax)
                                    ) +
                                      parseFloat(data.sub_total) !=
                                      parseInt(data.total) && (
                                      <OverlayTrigger
                                        placement="top"
                                        popperConfig={{
                                          modifiers: {
                                            preventOverflow: {
                                              enabled: false,
                                            },
                                          },
                                        }}
                                        delay={{ show: 950, hide: 900 }}
                                        overlay={
                                          <Tooltip id="button-tooltip">
                                            {arabic ? "تحذير" : "Warning ..!"}{" "}
                                            <br />
                                            <br />
                                            {arabic
                                              ? "سعر هذا المنتج غير مطابق للمبلغ المحسوب يرجى التحقق منه."
                                              : "Total amount is not matching with calculated amount kindly verify it."}{" "}
                                            <br />
                                            <br />
                                            {arabic
                                              ? "السعر = الكمية * سعر الوحدة"
                                              : "Total = Sub total * Tax % / 100"}
                                          </Tooltip>
                                        }
                                      >
                                        <iconify-icon icon="material-symbols:warning-outline-rounded"></iconify-icon>
                                      </OverlayTrigger>
                                    )}{" "}
                                    <input
                                      style={{ border: "none" }}
                                      className="typing-container"
                                      value={data.total}
                                      onChange={(event) => {
                                        setTxt(event.target.value);
                                        if (event.target.value == "") {
                                          let temp = data;
                                          temp.total = " ";
                                          setData(temp);
                                        } else {
                                          let temp = data;
                                          temp.total = event.target.value;
                                          setData(temp);
                                        }
                                      }}
                                      readOnly={
                                        edit === 8 && disable ? false : true
                                      }
                                    />
                                  </td>

                                  <td>
                                    <button
                                      className="Pen"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setEdit(8);
                                        setDisable(!disable);
                                        if (disable) {
                                          let temp = data;
                                          temp.total = temp.total.trimStart();
                                          setData(temp);
                                        }
                                      }}
                                    >
                                      {edit === 8 && disable ? (
                                        <iconify-icon icon="charm:tick"></iconify-icon>
                                      ) : (
                                        <iconify-icon icon="uil:pen"></iconify-icon>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td class="headcol">
                                  {arabic ? "Custom" : "Custom Labels"}
                                </td>
                                <td> </td>
                                <td>
                                  <button
                                    className="Pen"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setCurrCust(true);
                                      setEdit(15);
                                    }}
                                  >
                                    {edit === 15 && disable ? (
                                      <iconify-icon icon="charm:tick"></iconify-icon>
                                    ) : (
                                      <iconify-icon icon="uil:pen"></iconify-icon>
                                    )}
                                  </button>
                                </td>
                              </tr>
                              {Object.keys(data.custom).length >= 1 && cust()}
                              <br />
                            </tbody>
                          </table>
                          <table
                            class="Tab "
                            style={
                              arabic
                                ? {
                                    direction: "rtl",
                                    width: "-webkit-fill-available",
                                    marginTop: "0",
                                  }
                                : {
                                    width: "-webkit-fill-available",
                                    marginTop: "0",
                                  }
                            }
                          >
                            <thead>
                              {data.bill_of_materials[0].description?.length >
                                1 && (
                                <th
                                  style={{
                                    padding: "11px 11px",
                                    fontSize: "unset",
                                  }}
                                >
                                  {arabic ? "وصف" : "Description"}
                                </th>
                              )}

                              {data.bill_of_materials[0].quantity?.length >
                                1 && (
                                <th
                                  style={{
                                    padding: "11px 11px",
                                    fontSize: "unset",
                                  }}
                                >
                                  {arabic ? "كمية" : "Quantity"}
                                </th>
                              )}
                              {data.bill_of_materials[0].unit_price?.length >
                                1 && (
                                <th
                                  style={{
                                    padding: "11px 11px",
                                    fontSize: "unset",
                                  }}
                                >
                                  {arabic ? "سعر الوحدة" : "Unit Price"}
                                </th>
                              )}
                              {data.bill_of_materials[0].price?.length > 1 && (
                                <th
                                  style={{
                                    padding: "11px 11px",
                                    fontSize: "unset",
                                  }}
                                >
                                  {arabic ? "سعر" : "Price"}
                                </th>
                              )}
                              <th>
                                <button
                                  className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    setEdit(13);

                                    setBill(true);
                                  }}
                                >
                                  {edit === 13 && disable ? (
                                    <iconify-icon icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </th>
                            </thead>
                            <tbody>
                              {data.bill_of_materials[0].description &&
                                data.bill_of_materials[0].description.map(
                                  (_it, index) => {
                                    return (
                                      <tr>
                                        {data.bill_of_materials[0].description[
                                          index
                                        ] && (
                                          <td>
                                            {" "}
                                            {
                                              data.bill_of_materials[0]
                                                .description[index]
                                            }{" "}
                                          </td>
                                        )}
                                        {data.bill_of_materials[0].quantity[
                                          index
                                        ] && (
                                          <td>
                                            {" "}
                                            {
                                              data.bill_of_materials[0]
                                                .quantity[index]
                                            }{" "}
                                          </td>
                                        )}

                                        {data.bill_of_materials[0].unit_price[
                                          index
                                        ] && (
                                          <td>
                                            {" "}
                                            {
                                              data.bill_of_materials[0]
                                                .unit_price[index]
                                            }{" "}
                                          </td>
                                        )}
                                        {data.bill_of_materials[0].price[
                                          index
                                        ] && (
                                          <td>
                                            <p style={{ width: "max-content" }}>
                                              {" "}
                                              {
                                                data.bill_of_materials[0].price[
                                                  index
                                                ]
                                              }{" "}
                                              <span>
                                                {data.bill_of_materials[0]
                                                  .quantity[index] &&
                                                  data.bill_of_materials[0]
                                                    .unit_price[index] &&
                                                  parseInt(
                                                    data.bill_of_materials[0]
                                                      .unit_price[index]
                                                  ) *
                                                    parseInt(
                                                      data.bill_of_materials[0]
                                                        .quantity[index]
                                                    ) !=
                                                    parseInt(
                                                      data.bill_of_materials[0]
                                                        .price[index]
                                                    ) && (
                                                    <OverlayTrigger
                                                      placement="top"
                                                      popperConfig={{
                                                        modifiers: {
                                                          preventOverflow: {
                                                            enabled: false,
                                                          },
                                                        },
                                                      }}
                                                      delay={{
                                                        show: 950,
                                                        hide: 900,
                                                      }}
                                                      overlay={
                                                        <Tooltip id="button-tooltip">
                                                          {arabic
                                                            ? "تحذير"
                                                            : "Warning ..!"}{" "}
                                                          <br />
                                                          <br />
                                                          {arabic
                                                            ? "سعر هذا المنتج غير مطابق للمبلغ المحسوب يرجى التحقق منه."
                                                            : "Price of this item is not matching with calculated amount kindly verify it."}{" "}
                                                          <br />
                                                          <br />
                                                          {arabic
                                                            ? "السعر = الكمية * سعر الوحدة"
                                                            : "Price = Quantity * Unit Price"}
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <iconify-icon icon="material-symbols:warning-outline-rounded"></iconify-icon>
                                                    </OverlayTrigger>
                                                  )}
                                              </span>{" "}
                                            </p>
                                          </td>
                                        )}
                                      </tr>
                                    );
                                  }
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div style={bill ? {} : { display: "none" }}>
                        {arabic ? (
                          <p className="TabHead">
                            {" المواد"} <span>{"فاتورة"}</span>
                          </p>
                        ) : (
                          <p className="TabHead">
                            Bill of M<span>aterials</span>
                          </p>
                        )}
                        <button
                          className="Predictbtn"
                          onClick={(event) => {
                            event.preventDefault();
                            setBill(false);
                          }}
                        >
                          {" "}
                          <span> {arabic ? "يحفظ" : "Save"} </span>
                        </button>
                        <div
                          className="card-body Table"
                          style={{ overflowX: "scroll" }}
                        >
                          <TableComponent data={data} setData={setData} />
                        </div>
                      </div>

                      <br />
                      <br />
                    </>
                  )}
                  <br />
                  <br />
                  <br />
                  <div className="TabFooter">
                    {" "}
                    {predicted || disable || bill ? (
                      <></>
                    ) : (
                      <button
                        className="Predictbtn"
                        onClick={(event) => {
                          event.preventDefault();
                          props.setFinalData(data);
                          props.setIndex(2);
                        }}
                      >
                        {" "}
                        <span>
                          {" "}
                          {arabic ? "حفظ التغييرات" : "Save Changes"}{" "}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </>
      )}
    </>
  );
};

export default Page2Component;
