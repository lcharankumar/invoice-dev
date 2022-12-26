import React, { useEffect, useState } from "react";

import Nav_testingComponent from "./Nav_testingComponent";
import "../style/custom_css.css";
import Page1Component from "./Page1Component";
import Page2Component from "./Page2Component";
import Page3Component from "./Page3Component";
import { ArabicContext } from "../context/arabicContext";
import { useContext } from "react";
const ProgressComponent = (props) => {
  const [lang, setLang] = useState("");
  const { arabic } = useContext(ArabicContext);
  const [index, setIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [finalData, setFinalData] = useState(null);
  const [final, setMyFinal] = useState(null);
  const [crop, setCrop] = useState(null);
  const [org, setOrg] = useState(null);
  const [name, setName] = useState(null);
  useEffect(() => {
    console.log(index);
    console.log(file);
  }, [index]);
  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <>
      {" "}
      <section class="multi_step_form">
        <form id="msform" style={{ minHeight: "90vh" }}>
          {/* <div className="tittle"> */}
          <Nav_testingComponent />
          {/* </div> */}

          <ul id="progressbar" class=" p-4 " style={{ marginTop: "70px" }}>
            <li className={index >= 0 ? " active" : ""}>
              {arabic ? "رفع ملف" : "Upload file"}
            </li>
            <li className={index >= 1 ? " active" : ""}>
              {arabic ? "تحقق وتحرير" : "Verify & Edit"}
            </li>
            <li className={index === 2 ? " active" : ""}>
              {arabic ? "مراجعة وإرسال" : "Review & Submit"}
            </li>
          </ul>
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner" style={{ overflow: "unset" }}>
              <div
                className={
                  index === 0 ? "carousel-item active" : "carousel-item"
                }
              >
                <Page1Component
                  index={index}
                  setIndex={setIndex}
                  setFile={setFile}
                  img={props.img}
                  setImg={props.setImg}
                  setName={setName}
                  setOrg={setOrg}
                  lang={lang}
                  setLang={setLang}
                />
              </div>
              <div
                className={
                  index === 1 ? "carousel-item active" : "carousel-item"
                }
              >
                <Page2Component
                  index={index}
                  setIndex={setIndex}
                  setFinalData={setFinalData}
                  coordinates={props.coordinates}
                  setCoordinates={props.setCoordinates}
                  img={props.img}
                  setImg={props.setImg}
                  file={file}
                  setMyFinal={setMyFinal}
                  setCrop={setCrop}
                  crop={crop}
                  final={final}
                  name={name}
                  org={org}
                  lang={lang}
                  setLang={setLang}
                />
              </div>
              <div
                className={
                  index === 2 ? "carousel-item active" : "carousel-item"
                }
              >
                <Page3Component
                  index={index}
                  setIndex={setIndex}
                  finalData={finalData}
                  final={final}
                  org={org}
                  setFinalSubmit={props.setFinalSubmit}
                />
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default ProgressComponent;
