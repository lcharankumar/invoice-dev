import React, { useState, useEffect, useContext } from "react";
import ImageCropper from "./ImageCropperComponent";
import { ArabicContext } from "../../context/arabicContext";
import { DarkModeContext } from "../../context/darkModeContext";
import $ from "jquery";
import "../../style/response.scss";
import Modal from "react-bootstrap/Modal";
const TableRows = ({
  rowsData,
  deleteTableRows,
  handleChange,
  setRowsData,
  handleSubmit,
}) => {
  return rowsData.map((data, index) => {
    console.log(data);
    const { label, value } = data;
    return (
      <tr className="table-row" key={index}>
        <td>
          <input
            type="text"
            required
            value={label}
            onChange={(evnt) => handleChange(index, evnt)}
            name="label"
            style={{ color: "black", border: "none" }}
          />
        </td>
        <td>
          <input
            type="text"
            required
            value={value}
            onChange={(evnt) => handleChange(index, evnt)}
            name="value"
            style={{ color: "black", border: "none" }}
          />{" "}
        </td>
        <td>
          <button
            className="Pen"
            onClick={() => {
              handleSubmit(index);
            }}
          >
            <iconify-icon
              icon="material-symbols:camera-enhance"
              style={{ fontSize: "32px", color: "grey" }}
            ></iconify-icon>
          </button>
        </td>
        <td>
          <button className="red-btn" onClick={() => deleteTableRows(index)}>
            x
          </button>
        </td>
      </tr>
    );
  });
};

const AddCustom = (props) => {
  const { arabic } = useContext(ArabicContext);
  const { darkMode } = useContext(DarkModeContext);
  useEffect(() => {
    $(".modal-content").css("background", "transparent");
    $(".modal-content").css("border", "none");
  }, []);
  const [rowsData, setRowsData] = useState(props.data.custom);
  const [crop, setCrop] = useState(false);

  const addTableRows = () => {
    const rowsInput = {
      label: "",
      value: "",
    };
    setRowsData([...rowsData, rowsInput]);
    console.log(rowsData);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  const handleSubmit = (index, evnt) => {
    console.log(index, rowsData);
    props.setrowdata(rowsData);
    props.setLabInd(index);
    props.setShow(false);
    props.showCrop(true);
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        let temp = props.data;
        temp.custom = rowsData;
        props.setData(temp);
        props.setShow(false);
      }}
      style={{ background: "transparent", minWidth: "100vw" }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="container response">
          <div class="box-form">
            <div class="box-login-tab"></div>
            <div class="box-login-title">
              <div class="i i-login"></div>
              <h2>Add custom labels</h2>
            </div>

            <div className="box-login">
              <div>
                <table
                  className="table responsive-table"
                  style={{ backgroundColor: "white", padding: "20px" }}
                >
                  <thead>
                    <tr className="table-header">
                      <th>Label</th>
                      <th>Value</th>
                      <th>From Image</th>
                      <th>
                        <button
                          className="green-btn"
                          onClick={addTableRows}
                          style={{ marginRight: "30px" }}
                        >
                          +
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRows
                      rowsData={rowsData}
                      deleteTableRows={deleteTableRows}
                      handleChange={handleChange}
                      setRowsData={setRowsData}
                      handleSubmit={handleSubmit}
                    />
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        {" "}
                        <button
                          style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            marginTop: "20px",
                          }}
                          onClick={() => {
                            let temp = props.data;
                            temp.custom = rowsData;
                            props.setData(temp);
                            props.setShow(false);
                          }}
                        >
                          {arabic ? "استخراج النص" : "Save"}
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="col-sm-4"></div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddCustom;
