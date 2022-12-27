import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";
import { DarkModeContext } from "../../context/darkModeContext";
import { ArabicContext } from "../../context/arabicContext";
import { useContext } from "react";
const AddDeptComponent = (props) => {
  const { darkMode } = useContext(DarkModeContext);
  const { arabic } = useContext(ArabicContext);
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch1 } = useContext(ArabicContext);
  const [formData, setFormData] = useState({
    deptname: "",
  });
  const onFormdata = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    $(".email").on("change keyup paste", function () {
      if ($(this).val()) {
        $(".icon-paper-plane").addClass("next");
      } else {
        $(".icon-paper-plane").removeClass("next");
      }
    });

    $(".next-button").hover(function () {
      $(this).css("cursor", "pointer");
    });

    $(".next-button.email").click(function () {
      $(".email-section").addClass("fold-up");
      $(".success").css("marginTop", 0);
    });
  }, []);
  // let curremp = props.curremp;
  const [modalShow, setModalShow] = useState(true);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  useEffect(() => {
    $(".modal-content").css("background", "transparent");
    $(".modal-content").css("border", "none");
  }, [modalShow]);
  const [depname, setDepname] = useState("");

  return (
    <Modal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        props.setshowDept(false);
      }}
      style={{ background: "transparent", minWidth: "100vw" }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="addDept">
        <div class="">
          <div className="addDept1">
            <div class="registration-form">
              <header>
                <iconify-icon
                  icon="mdi:close-box-multiple"
                  style={{
                    float: "right",
                    color: "black",
                    cursor: "pointer",
                    fontSize: "22px",
                  }}
                  onClick={() => {
                    setModalShow(false);
                    props.setshowDept(false);
                  }}
                ></iconify-icon>
                <h1>{arabic ? "اضافة قسم" : "Add department"}</h1>
              </header>
              <form>
                <div class="input-section email-section">
                  <input
                    class="email"
                    type="email"
                    placeholder={
                      arabic ? "أدخل اسم القسم" : "Enter Department name"
                    }
                    autocomplete="off"
                    name="deptname"
                    value={formData.deptname}
                    onChange={(e) => onFormdata(e)}
                  />
                  <div class="animated-button">
                    <span class="icon-paper-plane">
                      <iconify-icon
                        class="close fa-times"
                        icon="mdi:bulletin-board"
                        style={{ fontSize: "38px" }}
                      ></iconify-icon>
                    </span>
                    <span class="next-button email">
                      <iconify-icon
                        class="close fa-times"
                        icon="material-symbols:arrow-circle-up"
                        style={{ fontSize: "38px" }}
                      ></iconify-icon>
                    </span>
                  </div>
                </div>

                <div class="success">
                  <p
                    onClick={(e) => {
                      e.preventDefault();

                      props.addDept(formData);
                      setModalShow(false);
                      props.setshowDept(false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {arabic ? "تحديث" : "Update"}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddDeptComponent;
