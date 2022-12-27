import React, { useEffect, useState } from "react";
import { Table } from "../../data";
import { ArabicContext } from "../../context/arabicContext";
import { DarkModeContext } from "../../context/darkModeContext";

import { useContext } from "react";
const TableComponent = (props) => {
  const { arabic } = useContext(ArabicContext);
  const { darkMode } = useContext(DarkModeContext);
  const [tdata, setTdata] = useState({
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
  });
  useEffect(() => {
    setTdata(props.data);
  }, []);

  const [edit, setEdit] = useState(-1);
  const [disable, setDisable] = useState(false);
  const [txt, setTxt] = useState("");
  let data = props.data;
  let setData = props.setData;
  let i = 0;

  const setBg = (index) => {
    return { background: "green" };
  };
  return (
    <table class="Tab " style={arabic ? { direction: "rtl" } : {}}>
      <thead>
        {tdata.bill_of_materials[0].description?.length > 1 && (
          <th style={{ padding: "11px 11px", fontSize: "unset" }}>
            Description
          </th>
        )}

        {tdata.bill_of_materials[0].quantity?.length > 1 && (
          <th style={{ padding: "11px 11px", fontSize: "unset" }}>Quantity</th>
        )}
        {tdata.bill_of_materials[0].unit_price?.length > 1 && (
          <th style={{ padding: "11px 11px", fontSize: "unset" }}>
            Unit Price
          </th>
        )}
        {tdata.bill_of_materials[0].price?.length > 1 && (
          <th style={{ padding: "11px 11px", fontSize: "unset" }}>Price</th>
        )}
        <th>
          {" "}
          <span className="Pen">
            <iconify-icon
              icon="uil:plus"
              style={
                darkMode
                  ? { cursor: "pointer", color: "white", fontSize: "large" }
                  : { cursor: "pointer", color: "black", fontSize: "large" }
              }
              onClick={(event) => {
                let temp = data;
                temp.bill_of_materials[0].unit_price[0] &&
                  temp.bill_of_materials[0].unit_price.push(" ");
                temp.bill_of_materials[0].quantity[0] &&
                  temp.bill_of_materials[0].quantity.push(" ");
                temp.bill_of_materials[0].price[0] &&
                  temp.bill_of_materials[0].price.push(" ");
                temp.bill_of_materials[0].description[0] &&
                  temp.bill_of_materials[0].description.push(" ");
                setTxt(event.target.value);
                setData(temp);
              }}
            ></iconify-icon>{" "}
          </span>
        </th>
      </thead>
      <tbody>
        {tdata.bill_of_materials[0].description &&
          tdata.bill_of_materials[0].description.map((it, index) => {
            return (
              <tr>
                {tdata.bill_of_materials[0].description[index] && (
                  <td>
                    {" "}
                    <input
                      style={{ border: "none" }}
                      className="typing-container"
                      value={data.bill_of_materials[0].description[index]}
                      onChange={(event) => {
                        if (event.target.value == "") {
                          let temp = data;
                          temp.bill_of_materials[0].description[index] = " ";
                          setData(temp);
                        } else {
                          let temp = data;
                          temp.bill_of_materials[0].description[index] =
                            event.target.value;
                          setTxt(event.target.value);
                          setData(temp);
                        }
                      }}
                      readOnly={edit === index && disable ? false : true}
                    />{" "}
                  </td>
                )}
                {tdata.bill_of_materials[0].quantity[index] && (
                  <td>
                    {" "}
                    <input
                      style={{ border: "none" }}
                      className="typing-container"
                      value={data.bill_of_materials[0].quantity[index]}
                      onChange={(event) => {
                        if (event.target.value == "") {
                          let temp = data;
                          temp.bill_of_materials[0].quantity[index] = " ";
                          setData(temp);
                        } else {
                          let temp = data;
                          temp.bill_of_materials[0].quantity[index] =
                            event.target.value;
                          setTxt(event.target.value);
                          setData(temp);
                        }
                      }}
                      readOnly={edit === index && disable ? false : true}
                    />{" "}
                  </td>
                )}

                {tdata.bill_of_materials[0].unit_price[index] && (
                  <td>
                    {" "}
                    <input
                      style={{ border: "none" }}
                      className="typing-container"
                      value={data.bill_of_materials[0].unit_price[index]}
                      onChange={(event) => {
                        if (event.target.value == "") {
                          let temp = data;
                          temp.bill_of_materials[0].unit_price[index] = " ";
                          setData(temp);
                        } else {
                          let temp = data;
                          temp.bill_of_materials[0].unit_price[index] =
                            event.target.value;
                          setTxt(event.target.value);
                          setData(temp);
                        }
                      }}
                      readOnly={edit === index && disable ? false : true}
                    />{" "}
                  </td>
                )}
                {tdata.bill_of_materials[0].price[index] && (
                  <td>
                    {" "}
                    <input
                      style={{ border: "none" }}
                      className="typing-container"
                      value={data.bill_of_materials[0].price[index]}
                      onChange={(event) => {
                        if (event.target.value == "") {
                          let temp = data;
                          temp.bill_of_materials[0].price[index] = " ";
                          setData(temp);
                        } else {
                          let temp = data;
                          temp.bill_of_materials[0].price[index] =
                            event.target.value;
                          setTxt(event.target.value);
                          setData(temp);
                        }
                      }}
                      readOnly={edit === index && disable ? false : true}
                    />{" "}
                  </td>
                )}

                <td>
                  <button
                    className="Pen"
                    onClick={(e) => {
                      e.preventDefault();
                      setEdit(index);
                      setDisable(!disable);
                      if (disable) {
                        let temp = data;
                        temp.bill_of_materials[0].price[index] =
                          temp.bill_of_materials[0].price[index].trimStart();
                        temp.bill_of_materials[0].description[index] =
                          temp.bill_of_materials[0].description[
                            index
                          ].trimStart();
                        temp.bill_of_materials[0].quantity[index] =
                          temp.bill_of_materials[0].quantity[index].trimStart();
                        temp.bill_of_materials[0].unit_price[index] =
                          temp.bill_of_materials[0].unit_price[
                            index
                          ].trimStart();

                        setData(temp);
                      }
                    }}
                  >
                    {edit === index && disable ? (
                      <iconify-icon icon="charm:tick"></iconify-icon>
                    ) : (
                      <iconify-icon icon="uil:pen"></iconify-icon>
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableComponent;
