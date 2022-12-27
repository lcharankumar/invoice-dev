import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, * as others from "axios";
import "../../style/page3.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { ArabicContext } from "../../context/arabicContext";

const Page3Component = (props) => {
  const { darkMode } = useContext(DarkModeContext);
  const { dispatch } = useContext(DarkModeContext);
  const { arabic } = useContext(ArabicContext);
  const { dispatch1 } = useContext(ArabicContext);
  const [totalreq, setTotalreq] = useState(0);
  useEffect(() => {
    const fetchReq = async () => {
      const formData2 = new FormData();
      formData2.append("token", localStorage.getItem("token"));
      let res1 = {
        data: [
          {
            total: "",
          },
        ],
      };
      res1 = await axios.post("http://172.17.19.26:5000/totalreq", formData2);
      setTotalreq(parseInt(res1.data[0].total));
    };
    fetchReq();
  }, []);

  const navigate = useNavigate();
  const [dailyCurr, setDailyCurr] = useState({
    rates: {
      EUR: 1.06,
      INR: 82.79,
      SAR: 3.76,
    },
  });
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const fromInr = (amount) => {
    return parseFloat(amount) / dailyCurr.rates.INR;
  };
  const fromEuro = (amount) => {
    return parseFloat(amount) * dailyCurr.rates.EUR;
  };
  const fromSar = (amount) => {
    return parseFloat(amount) / dailyCurr.rates.SAR;
  };

  today = mm + "/" + dd + "/" + yyyy;
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
  }, [props.finalData]);
  const fetch = async () => {
    try {
      //  const formData1 = new FormData();
      //  formData1.append("name", "admin");
      //  formData1.append("uid", "admin001");
      //  formData1.append("role", "admin");
      //  formData1.append("password", "admin001");

      const formData1 = new FormData();
      let tot, sub_t, unit_p, pri;
      if (data.currency == "$") {
        tot = data.total;
        sub_t = data.sub_total;
        unit_p = data.bill_of_materials[0].unit_price;
        pri = data.bill_of_materials[0].price;
      }
      if (data.currency == "€") {
        tot = fromEuro(data.total);
        sub_t = fromEuro(data.sub_total);
        unit_p = data.bill_of_materials[0].unit_price.map((it) => {
          return fromEuro(it);
        });
        pri = data.bill_of_materials[0].price.map((it) => {
          return fromEuro(it);
        });
      }
      if (data.currency == "₹") {
        tot = fromInr(data.total);
        sub_t = fromInr(data.sub_total);
        unit_p = data.bill_of_materials[0].unit_price.map((it) => {
          return fromInr(it);
        });
        pri = data.bill_of_materials[0].price.map((it) => {
          return fromInr(it);
        });
      }
      if (data.currency == "﷼") {
        tot = fromSar(data.total);
        sub_t = fromSar(data.sub_total);
        unit_p = data.bill_of_materials[0].unit_price.map((it) => {
          return fromSar(it);
        });
        pri = data.bill_of_materials[0].price.map((it) => {
          return fromSar(it);
        });
      }
      const data1 = {
        company_name: data.company_name,
        from_address: data.from_address,
        to_address: data.to_address,
        invoice_date: data.invoice_date,
        due_date: data.due_date,
        phone_number: data.phone_number,
        invoice_number: data.invoice_number,
        currency: data.currency,
        total: tot,
        sub_total: sub_t,
        tax: data.tax,
        category: data.category,
        discount: data.discount,
        barcode: data.barcode,
        logo: data.logo,

        bill_of_materials: [
          {
            description: data.bill_of_materials[0].description,
            quantity: data.bill_of_materials[0].quantity,
            unit_price: unit_p,
            price: pri,
          },
        ],
      };
      formData1.append("id", "dl/0" + Math.floor(totalreq + 1).toString());
      formData1.append("name", localStorage.getItem("name"));
      formData1.append("uid", localStorage.getItem("uid"));
      formData1.append("role", localStorage.getItem("role"));
      formData1.append("submitted", today);
      formData1.append("dept", localStorage.getItem("dept"));
      formData1.append("status", "waiting");
      if (localStorage.getItem("role") == "Associate Practice Lead") {
        formData1.append("l1", "yes");
        formData1.append("l2", "no");
      }
      if (localStorage.getItem("role") == "Employee") {
        formData1.append("l1", "no");
        formData1.append("l2", "no");
      }
      if (localStorage.getItem("role") == "Practice Lead") {
        formData1.append("l2", "yes");
        formData1.append("l1", "yes");
      }
      formData1.append("l3", "no");
      formData1.append("data", JSON.stringify(data1));
      formData1.append("token", localStorage.getItem("token"));
      let res;
      let res1;
      const formData2 = new FormData();
      formData2.append("total", totalreq + 1);
      formData2.append("token", localStorage.getItem("token"));
      //res = await axios.post("http://172.17.19.26:5000/request", formData1);
      try {
        res = await axios.post("http://172.17.19.26:5000/request", formData1);
        res1 = await axios.post(
          "http://172.17.19.26:5000/addtotalreq",
          formData2
        );
      } catch (error) {
        window.alert("Server Error");
      }

      var config = {
        headers: {
          apikey: "R05tpDwAOWMXlS1m79DXMxVZNeux3XbV",
        },
      };
      let res2 = {
        data: {
          rates: {
            INR: 0,
            EUR: 0,
            SAR: 0,
          },
        },
      };
      res2 = await axios.get(
        "https://api.apilayer.com/exchangerates_data/latest?base=USD",
        config
      );
      // fetch("https://api.apilayer.com/exchangerates_data/latest?base=USD", requestOptions)
      //   .then(response => response.text())
      //   .then(result =>{
      //     setDailyCurr(result)
      //   })
      //   .catch(error => console.log('error', error));
      setDailyCurr(res2.data);
      props.setFinalSubmit(true);
    } catch (error) {
      window.alert("Some thing went wrong please try again");
      //window.location.reload();
    }
  };
  const add = (text) => {
    const myArray = text.split("\n");
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
              <div class="invoice-wrapper">
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
                      <br /> <span>{today}</span>
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
                            {data.currency + " "}
                            {data.total}
                          </th>
                        </tr>
                      )}
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="footer">
                {" "}
                <button
                  className="Predictbtn"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #f87115",
                    borderRadius: "15px",
                    padding: "8px 25px",
                    textTransform: "uppercase",
                    fontSize: "13px",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    color: "#f87115",
                    marginRight: "40px",
                  }}
                  onClick={(event) => {
                    event.preventDefault();

                    props.setIndex(1);
                  }}
                >
                  {" "}
                  <span> {arabic ? "خلف" : "Back"} </span>
                </button>
                <button
                  className="Predictbtn"
                  onClick={(event) => {
                    event.preventDefault();
                    fetch();
                    navigate("/dashboard");
                    //window.location.reload();
                  }}
                >
                  {" "}
                  <span> {arabic ? "مراجعة وإرسال" : "Review & Submit"} </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3Component;
