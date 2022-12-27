import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";
import "../style/editemp.scss";

const TestComponent = () => {
  useEffect(() => {
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
  }, []);

  return (
    <div className="editEmp">
      <div class="form">
        <div class="back">
          <div>
            <p>Do you want to delete this Employee?</p>
            <button id="show-signup-form">Delete</button>
          </div>
          <div>
            <p>Do you want to edit this Employee?</p>
            <button id="show-signin-form">Edit</button>
          </div>
        </div>
        <div class="front">
          <div class="signin">
            <div class="title">Edit employee</div>
            <div class="form-element">
              <input type="text" placeholder="Name" />
            </div>
            <div class="form-element">
              <select
                // style={{
                //   border: "none",
                //   width: "15px",
                //   cursor: "pointer",
                // }}
                className="typing-container"
                // value={mainCurr}
                // onChange={(event) => {
                //   setMainCurr(event.target.value);
                // }}
              >
                <option>Select Department</option>
                <option value="$">$ USD</option>
                <option value="€">€ EURO</option>
                <option value="₹">₹ INR</option>
                <option value="﷼">﷼ SAR</option>
              </select>
            </div>
            <div class="form-element">
              <input type="password" placeholder="Password" />
            </div>
            <div class="form-element">
              <button>Submit</button>
            </div>
          </div>
          <div class="signup">
            <div class="title">Sign Up</div>
            <div class="form-element">
              <input type="text" placeholder="Fullname" />
            </div>
            <div class="form-element">
              <input type="text" placeholder="Email" />
            </div>
            <div class="form-element">
              <input type="password" placeholder="Password" />
            </div>
            <div class="form-element">
              <button>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
