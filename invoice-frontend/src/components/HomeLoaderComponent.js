import React, { useState, useEffect, useRef } from "react";
import { FallingLines } from "react-loader-spinner";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";

const HomeLoaderComponent = () => {
  useEffect(() => {
    $(".modal-content").css("background", "transparent");
    $(".modal-content").css("border", "none");
  }, []);

  return (
    <Modal show={true} style={{ minWidth: "100vw" }}>
      <Modal.Body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      </Modal.Body>
    </Modal>
  );
};

export default HomeLoaderComponent;
