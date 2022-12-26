import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../img/img2.png";
import axios, * as others from "axios";
import "../style/page3.scss";
import { DarkModeContext } from "../context/darkModeContext";
import { useContext } from "react";
import { ArabicContext } from "../context/arabicContext";
import "../style/dark.scss";
const AccempComponent = (props) => {
  const { darkMode } = useContext(DarkModeContext);
  const { dispatch } = useContext(DarkModeContext);
  const { arabic } = useContext(ArabicContext);
  const { dispatch1 } = useContext(ArabicContext);
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
    bill_of_materials: [
      {
        description: [""],
        quantity: [""],
        unit_price: [""],
        price: [""],
      },
    ],
  });
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    if (props.finalData) {
      setData(props.finalData);
    }
    console.log(props.finalData);
  }, [props.finalData]);
  const add = (text) => {
    const myArray = text.split("\n");
    console.log(myArray);
    return (
      <>
        {myArray.map((str, index) => {
          if (index === 0) {
            return <p style={{ marginBottom: "0" }}>{str}</p>;
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
  return (
    <div className="Page3">
      <div class="receipt-content">
        <div class="container bootstrap snippets bootdey">
          <div class="row">
            <div class="col-md-12">
              <div
                class="invoice-wrapper"
                style={
                  darkMode
                    ? { color: "white", textAlign: "center" }
                    : { color: "black", textAlign: "center" }
                }
              >
                <div class="intro">
                  <div class="receipt-header row">
                    <div class="col-xs-6 col-sm-6 col-md-6">
                      <div class="receipt-left">
                        {data.logo != "" && (
                          <img
                            class="img-responsive feilds"
                            alt=""
                            src={`data:image/png;base64,${data.logo}`}
                            style={{ width: "151px" }}
                          />
                        )}
                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 text-right ">
                      <div class="receipt-right ">
                        <h5
                          className="CompanyName"
                          style={
                            darkMode ? { color: "white" } : { color: "black" }
                          }
                        >
                          {data.company_name}
                        </h5>
                        <p>
                          {data.phone_number}{" "}
                          <iconify-icon icon="uil:phone"></iconify-icon>
                        </p>
                        {data.barcode != "" && (
                          <img
                            class="img-responsive"
                            alt=""
                            src={`data:image/png;base64,${data.barcode}`}
                            style={{ width: "101px", borderRadius: "43px" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="receipt-header row" style={{ marginTop: "60px" }}>
                  <div class="col-xs-6 col-sm-6 col-md-6">
                    <div class="feild">
                      <strong>{arabic ? "فئة" : "Category"} </strong> <br />{" "}
                      <span>{data.category}</span>
                    </div>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6">
                    <div class="feild">
                      <strong>
                        {arabic ? "تاريخ تقديمه" : " Submitted date"}
                      </strong>{" "}
                      <br />
                      <span> {props.sdate} </span>
                    </div>
                  </div>
                </div>

                <div class="payment-info">
                  <div class="row">
                    <div class="col-sm-6">
                      {data.invoice_number != "" && (
                        <>
                          <strong>
                            {arabic ? "رقم الفاتورة" : "Invoice Number"}
                          </strong>
                          <span>{data.invoice_number}</span>
                        </>
                      )}
                    </div>
                    <div class="col-sm-6 text-right">
                      {data.invoice_date != "" && (
                        <>
                          <strong>
                            {arabic ? "تاريخ الفاتورة" : "Invoice Date"}
                          </strong>
                          <span>{data.invoice_date}</span>
                        </>
                      )}
                      {data.due_date != "" && (
                        <>
                          <strong>
                            {arabic ? "تاريخ الاستحقاق" : "Due Date"}
                          </strong>
                          <span>{data.due_date}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div class="payment-details">
                  <div class="row">
                    <div class="col-sm-6">
                      {data.from_address != "" && (
                        <>
                          {" "}
                          <strong>
                            {arabic ? "من العنوان" : "From address"}
                          </strong>{" "}
                          <br />
                          {add(data.from_address)}
                        </>
                      )}
                    </div>
                    <div class="col-sm-6 text-right">
                      <strong>{arabic ? "إلى عنوان" : "To Address"}</strong>{" "}
                      <br />
                      {add(data.to_address)}
                    </div>
                  </div>
                </div>

                <div
                  class="table-responsive"
                  style={darkMode ? { color: "white" } : { color: "black" }}
                  tabindex="0"
                >
                  <table
                    class="table table-bordered"
                    style={
                      arabic
                        ? { direction: "rtl", color: "inherit" }
                        : { color: "inherit" }
                    }
                  >
                    <thead>
                      <tr>
                        {data.bill_of_materials[0].description?.length > 1 && (
                          <th style={{ textAlign: "left" }}>
                            {arabic ? "وصف" : "Description"}
                          </th>
                        )}

                        {data.bill_of_materials[0].quantity?.length > 1 && (
                          <th style={{ textAlign: "left" }}>
                            {arabic ? "كمية" : "Quantity"}
                          </th>
                        )}
                        {data.bill_of_materials[0].unit_price?.length > 1 && (
                          <th style={{ textAlign: "left" }}>
                            {arabic ? "سعر الوحدة" : "Unit Price"}
                          </th>
                        )}
                        {data.bill_of_materials[0].price?.length > 1 && (
                          <th style={{ textAlign: "left" }}>
                            {arabic ? "سعر" : "Price"}
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {data.bill_of_materials[0].description &&
                        data.bill_of_materials[0].description.map(
                          (it, index) => {
                            return (
                              <tr>
                                {data.bill_of_materials[0].description[
                                  index
                                ] && (
                                  <td style={{ textAlign: "left" }}>
                                    {" "}
                                    {
                                      data.bill_of_materials[0].description[
                                        index
                                      ]
                                    }{" "}
                                  </td>
                                )}
                                {data.bill_of_materials[0].quantity[index] && (
                                  <td style={{ textAlign: "left" }}>
                                    {" "}
                                    {
                                      data.bill_of_materials[0].quantity[index]
                                    }{" "}
                                  </td>
                                )}

                                {data.bill_of_materials[0].unit_price[
                                  index
                                ] && (
                                  <td style={{ textAlign: "left" }}>
                                    {" "}
                                    {
                                      data.bill_of_materials[0].unit_price[
                                        index
                                      ]
                                    }{" "}
                                  </td>
                                )}
                                {data.bill_of_materials[0].price[index] && (
                                  <td style={{ textAlign: "left" }}>
                                    {" "}
                                    {
                                      data.bill_of_materials[0].price[index]
                                    }{" "}
                                  </td>
                                )}
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                    <tfoot>
                      {data.currency != "" && (
                        <tr>
                          <th
                            colspan={
                              data.bill_of_materials[0].description.length
                            }
                            style={
                              arabic
                                ? { textAlign: "left" }
                                : { textAlign: "right" }
                            }
                          >
                            {arabic ? "عملة" : "Currency"}
                          </th>
                          <th class="" style={{ textAlign: "right" }}>
                            {data.currency}
                          </th>
                        </tr>
                      )}
                      {data.sub_total != "" && (
                        <tr>
                          <th
                            colspan={
                              data.bill_of_materials[0].description.length
                            }
                            style={
                              arabic
                                ? { textAlign: "left" }
                                : { textAlign: "right" }
                            }
                          >
                            {arabic ? "المجموع الفرعي" : "Sub Total"}
                          </th>
                          <th class="" style={{ textAlign: "right" }}>
                            {data.sub_total}
                          </th>
                        </tr>
                      )}
                      {data.tax != "" && (
                        <tr>
                          <th
                            colspan={
                              data.bill_of_materials[0].description.length
                            }
                            style={
                              arabic
                                ? { textAlign: "left" }
                                : { textAlign: "right" }
                            }
                          >
                            {arabic ? "ضريبة" : "Tax"}
                          </th>
                          <th class="" style={{ textAlign: "right" }}>
                            {data.tax}
                          </th>
                        </tr>
                      )}
                      {data.discount && (
                        <tr>
                          <th
                            colspan={
                              data.bill_of_materials[0].description.length
                            }
                            style={
                              arabic
                                ? { textAlign: "left" }
                                : { textAlign: "right" }
                            }
                          >
                            {arabic ? "تخفيض" : "Discount"}
                          </th>
                          <th class="" style={{ textAlign: "right" }}>
                            {data.discount}
                          </th>
                        </tr>
                      )}

                      {data.total && (
                        <tr>
                          <th
                            colspan={
                              data.bill_of_materials[0].description.length
                            }
                            style={
                              arabic
                                ? { textAlign: "left" }
                                : { textAlign: "right" }
                            }
                          >
                            {arabic ? "المجموع" : "Total"}
                          </th>
                          <th class="" style={{ textAlign: "right" }}>
                            {data.total}
                          </th>
                        </tr>
                      )}
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccempComponent;
