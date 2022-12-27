import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";
import { DarkModeContext } from "../../context/darkModeContext";
import { ArabicContext } from "../../context/arabicContext";
import { useContext } from "react";
const AddemployeeComponent = (props) => {
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
  }, [modalShow]);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    setModalShow(false);
    let temp = {
      uid: curremp.uid,
      name: formData.name,
      role: curremp.role,
      dept: curremp.dept,
      password: formData.password,
    };
    props.addEmpfun(temp);
  };
  return (
    <Modal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        props.setAddemp(false);
      }}
      style={{ background: "transparent", minWidth: "100vw" }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="wrapper1" style={{ boxShadow: "none", width: "auto" }}>
          <iconify-icon
            icon="mdi:close-box-multiple"
            style={{
              float: "right",
              color: "black",
              cursor: "pointer",
              fontSize: "22px",
            }}
            onClick={() => {
              handleClose();
              props.setAddemp(false);
            }}
          ></iconify-icon>
          <div className="logo">
            <h5
              style={{
                fontSize: "13px",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {curremp.dept}
            </h5>
          </div>
          <div className="text-center mt-4 name">
            <span style={{ color: "black" }}>{curremp.role}</span>
            <br />

            <span style={{ color: "black" }}>
              {arabic ? "بطاقة تعريف:" : "UID:"}
              {curremp.uid}
            </span>
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
                placeholder={arabic ? "اسم المستخدم" : "Username"}
                required={true}
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
                placeholder={arabic ? "كلمة المرور" : "Password"}
                required={true}
              />
            </div>
            <button className="btn mt-3" type="submit" value="Register">
              {arabic ? "إضافة موظف" : " Add employee"}
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddemployeeComponent;
