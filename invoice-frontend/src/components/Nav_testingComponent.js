// import "./App.css";
import "../style/custom_css.css";
// icons
// import HomeIcon from '@mui/icons-material/Home';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { DarkModeContext } from "../context/darkModeContext";
import { useContext } from "react";
import { ArabicContext } from "../context/arabicContext";
function Nav_testingComponent() {
  const { darkMode } = useContext(DarkModeContext);
  const { dispatch } = useContext(DarkModeContext);
  const { arabic } = useContext(ArabicContext);
  const { dispatch1 } = useContext(ArabicContext);
  const [dark, setDark] = useState(darkMode);
  return (
    <>
      {/* false, 'sm', 'md', 'lg', 'xl', 'xxl' */}
      {[false].map((expand) => (
        <Navbar
          fixed="top"
          className="navbar_custom"
          key={expand}
          expand={expand}
        >
          <Container
            fluid
            style={
              arabic
                ? {
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                  }
                : { justifyContent: "space-between" }
            }
          >
            <Navbar.Brand class=" p-2 ">
              {" "}
              <Row>
                <Col class=" custom_padding ">
                  <div class=" "> </div>
                </Col>
                <Col>
                  {" "}
                  {/* <iconify-icon icon="uil:home"></iconify-icon> */}
                  <span className="page_title_1">
                    {arabic ? "بالفاتورة " : "Invoice R"}
                  </span>
                  <span className="page_title_2">
                    {arabic ? "الاعتراف " : "ecognition"}
                  </span>
                </Col>
              </Row>
            </Navbar.Brand>
            <Nav className="justify-content-end">
              <Navbar.Text>
                <div class="app-header-actions-buttons">
                  <Nav.Link className="icon-button large" href="/dashboard">
                    <iconify-icon icon="uil:home" />
                  </Nav.Link>
                  <button
                    class="icon-button large"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch1({ type: "TOGGLE" });
                    }}
                  >
                    <div>
                      <svg
                        style={{ height: "25px" }}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M 4 2 C 2.9 2 2 2.9 2 4 L 2 12 C 2 13.1 2.9 14 4 14 L 10 14 L 10 20 C 10 21.1 10.9 22 12 22 L 20 22 C 21.1 22 22 21.1 22 20 L 22 12 C 22 10.9 21.1 10 20 10 L 14 10 L 14 4 C 14 2.9 13.1 2 12 2 L 4 2 z M 7.1757812 4 L 8.8046875 4 L 11.259766 10.146484 C 10.622151 10.402863 10.149579 10.977115 10.033203 11.671875 L 9.40625 10 L 6.578125 10 L 5.828125 12.015625 L 4 12 L 7.1757812 4 z M 8 6 L 7 9 L 9 9 L 8 6 z M 15.669922 12.001953 C 16.572594 11.966064 17.150391 12.832031 17.150391 12.832031 L 17.150391 13.208984 C 17.150391 13.208984 16.772578 12.832031 16.017578 12.832031 C 15.806578 12.832031 15.297125 13.0155 15.203125 13.5625 C 15.101125 14.1575 16.128531 14.341797 16.394531 14.341797 C 17.149531 14.341797 17.998047 13.984375 17.998047 13.984375 L 17.4375 16 C 17.4375 16 16.757953 15.357375 15.626953 15.734375 C 14.826953 16.001375 14.683703 17.11575 14.845703 17.46875 C 15.625703 19.17275 19 19 19 19 C 19 19 18.015578 20 16.017578 20 C 14.687578 20 13 19.245328 13 17.736328 C 13 16.227328 14.509766 15.472656 14.509766 15.472656 C 14.509766 15.472656 14.119875 14.931375 14.046875 14.734375 C 13.749875 13.937375 14.131672 12.453172 15.263672 12.076172 C 15.405172 12.029047 15.540969 12.00708 15.669922 12.001953 z" />
                      </svg>
                    </div>
                  </button>
                  <button
                    class="icon-button large"
                    onClick={(e) => {
                      e.preventDefault();
                      setDark(!dark);
                      if (!dark) {
                        dispatch({ type: "DARK" });
                        console.log("Dark");
                      } else {
                        dispatch({ type: "LIGHT" });
                        console.log("Light");
                      }
                    }}
                  >
                    <div>
                      {dark ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          style={{ height: "25px" }}
                          viewBox="0 0 246 246"
                        >
                          <path
                            d="M189.024,122.5c0,36.188-29.336,65.524-65.524,65.524c-36.188,0-65.524-29.336-65.524-65.524
	c0-36.188,29.336-65.524,65.524-65.524C159.688,56.976,189.024,86.312,189.024,122.5z M122.667,43c4.143,0,7.5-3.357,7.5-7.5v-28
	c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v28C115.167,39.643,118.524,43,122.667,43z M184.444,68.438
	c1.919,0,3.839-0.732,5.304-2.197l14.849-14.85c2.929-2.929,2.929-7.678-0.001-10.606c-2.928-2.928-7.677-2.929-10.606,0.001
	l-14.849,14.85c-2.929,2.929-2.929,7.678,0.001,10.606C180.605,67.705,182.525,68.438,184.444,68.438z M190.366,178.14
	c-2.93-2.928-7.678-2.928-10.607,0c-2.929,2.93-2.929,7.678,0,10.607l14.85,14.85c1.465,1.464,3.385,2.196,5.304,2.196
	s3.839-0.732,5.304-2.196c2.929-2.93,2.929-7.678,0-10.607L190.366,178.14z M57.253,178.759l-14.85,14.85
	c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196s3.839-0.732,5.304-2.196l14.85-14.85
	c2.929-2.93,2.929-7.678,0-10.607C64.931,175.831,60.183,175.831,57.253,178.759z M56.634,66.859
	c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196c2.93-2.929,2.93-7.678,0.001-10.606l-14.849-14.85
	c-2.93-2.93-7.679-2.929-10.606-0.001c-2.93,2.929-2.93,7.678-0.001,10.606L56.634,66.859z M238.5,114.5h-7h-21
	c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h21h7c4.143,0,7.5-3.357,7.5-7.5S242.643,114.5,238.5,114.5z M123.667,202
	c-4.143,0-7.5,3.357-7.5,7.5v21v8c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-8v-21C131.167,205.357,127.81,202,123.667,202z
	 M44,123c0-4.143-3.357-7.5-7.5-7.5h-21h-8c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h8h21C40.643,130.5,44,127.143,44,123z"
                          />
                        </svg>
                      ) : (
                        <svg
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          style={{ height: "25px" }}
                          viewBox="0 0 455 455"
                          fill="currentColor"
                        >
                          <g>
                            <polygon
                              points="320.18,162.705 280.63,171.052 307.72,201.052 303.437,241.245 340.34,224.751 377.243,241.245 372.96,201.052 
		400.05,171.052 360.5,162.705 340.34,127.67 	"
                            />
                            <polygon
                              points="440,325.677 414.091,320.208 400.883,297.253 387.675,320.208 361.766,325.677 379.513,345.33 376.708,371.661 
		400.884,360.855 425.063,371.661 422.254,345.329 	"
                            />
                            <path
                              d="M218,227.5c0-89.167,51.306-166.338,126-203.64C313.443,8.6,278.978,0,242.5,0C116.855,0,15,101.855,15,227.5
		S116.855,455,242.5,455c36.478,0,70.943-8.6,101.5-23.86C269.306,393.838,218,316.667,218,227.5z"
                            />
                          </g>
                        </svg>
                      )}
                    </div>
                  </button>
                </div>
              </Navbar.Text>
            </Nav>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Nav_testingComponent;
