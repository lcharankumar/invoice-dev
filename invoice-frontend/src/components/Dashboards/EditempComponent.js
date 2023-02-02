import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";
import { DarkModeContext } from "../../context/darkModeContext";
import { ArabicContext } from "../../context/arabicContext";
import { useContext } from "react";
import "../../style/editemp.scss";

const EditempComponent = (props) => {
  const { darkMode } = useContext(DarkModeContext);
  const { arabic } = useContext(ArabicContext);
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch1 } = useContext(ArabicContext);
  let curremp = props.curremp;
  const [modalShow, setModalShow] = useState(true);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  useEffect(() => {
    $(".modal-content").css("background", "transparent");
    $(".modal-content").css("border", "none");
    document
      .getElementById("show-signup-form")
      .addEventListener("click", function () {
        document.getElementsByClassName("form")[0].classList.add("active");
      });
    document
      .getElementById("show-signin-form")
      .addEventListener("click", function () {
        document.getElementsByClassName("form")[0].classList.remove("active");
      });
  }, [modalShow]);
  const [formData, setFormData] = useState({
    name: curremp.name,
    password: "",
    role: curremp.role,
    uid: "",
    dept: curremp.dept,
  });

  const submitHandler = async (event) => {
    setModalShow(false);
    props.setEditemp(false);
    let newEmp = {
      uid: curremp.uid,
      name: formData.name,
      role: formData.role,
      dept: formData.dept,
    };
    props.editEmployeefun(newEmp);
  };
  return (
    <Modal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        props.setEditemp(false);
      }}
      style={{ background: "transparent", minWidth: "100vw" }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="editEmp">
          <div class="form">
            <div class="back">
              <div>
                <iconify-icon
                  icon="mdi:close-box-multiple"
                  style={{
                    color: "black",
                    cursor: "pointer",
                    fontSize: "22px",
                  }}
                  onClick={() => {
                    setModalShow(false);
                    props.setEditemp(false);
                  }}
                ></iconify-icon>
                <p>
                  {arabic
                    ? "هل تريد حذف هذا الموظف؟"
                    : "Do you want to delete this Employee?"}
                </p>
                <button id="show-signup-form">
                  {arabic ? "حذف" : "Delete"}
                </button>
              </div>
              <div>
                <iconify-icon
                  icon="mdi:close-box-multiple"
                  style={{
                    color: "black",
                    cursor: "pointer",
                    fontSize: "22px",
                  }}
                  onClick={() => {
                    setModalShow(false);
                    props.setEditemp(false);
                  }}
                ></iconify-icon>
                <p>
                  {arabic
                    ? "هل تريد تحرير هذا الموظف؟"
                    : "Do you want to edit this Employee?"}
                </p>
                <button id="show-signin-form">
                  {arabic ? "تعديل" : "Edit"}
                </button>
              </div>
            </div>
            <div class="front">
              <div class="signin">
                <div class="title">
                  {arabic ? "تحرير الموظف" : "Edit employee"}
                </div>
                <div class="form-element">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                    }}
                  />
                </div>
                <div class="form-element">
                  <select
                    className="typing-container"
                    value={formData.dept}
                    onChange={(e) => {
                      setFormData({ ...formData, dept: e.target.value });
                    }}
                  >
                    <option disabled>
                      {arabic ? "حدد القسم" : "Select Department"}
                    </option>

                    {props.dept.map((itms) => {
                      return <option value={itms}>{itms} </option>;
                    })}
                  </select>
                </div>
                <div class="form-element">
                  <select
                    className="typing-container"
                    value={formData.role}
                    onChange={(e) => {
                      setFormData({ ...formData, role: e.target.value });
                    }}
                  >
                    <option disabled>
                      {arabic ? "حدد الدور" : "Select Role"}
                    </option>
                    <option value="Employee">Employee</option>
                    <option value="Practice Lead">Practice Lead</option>
                    <option value="Associate Practice Lead">
                      Associate Practice Lead
                    </option>
                    <option value="Practice head">Practice head</option>
                  </select>
                </div>
                <div class="form-element">
                  <button onClick={() => submitHandler()}>Submit</button>
                </div>
              </div>
              <div class="signup">
                <section className="alertss">
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12">
                        <div
                          class="alert fade alert-simple alert-warning alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                          role="alert"
                          data-brk-library="component__alert"
                          style={{
                            display: "grid",
                            height: "120%",
                            paddingRight: "inherit",
                          }}
                        >
                          {"  "}
                          <p
                            style={{ marginTop: "auto", marginBottom: "auto" }}
                          >
                            <iconify-icon
                              class="close fa-times"
                              icon="ic:round-warning-amber"
                              style={{ fontSize: "38px", marginBottom: "-8px" }}
                            ></iconify-icon>{" "}
                            <br />
                            <br />
                            <strong class="font__weight-semibold">
                              {arabic ? "تحذير !" : "Warning !"} {"  "}
                            </strong>{" "}
                            {arabic
                              ? "أنت تحاول إزالة هذا الموظف"
                              : "You are trying to remove this employee"}
                          </p>
                          <button
                            type="button"
                            class="one font__size-18"
                            data-dismiss="alert"
                            onClick={() => {
                              setModalShow(false);
                              props.delEmp();
                            }}
                          >
                            <span class="sr-only">
                              {arabic ? "يتأكد" : "Confirm"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditempComponent;
