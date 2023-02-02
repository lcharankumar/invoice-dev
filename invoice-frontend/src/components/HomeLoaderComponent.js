import React, { useState, useEffect, useRef } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";

const HomeLoaderComponent = () => {
  return (
    <div
      class="alertss "
      style={{
        // position: "fixed",
        // top: "50%",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "rgb(0 0 0 / 91%)",
      }}
    >
      <div
        style={{
          height: "fit-content",
        }}
        class="alert floating fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
      >
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor="orange"
          innerCircleColor="gold"
          barColor="white"
          ariaLabel="circles-with-bar-loading"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <strong class="font__weight-semibold">Loading....</strong>
        &nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default HomeLoaderComponent;
