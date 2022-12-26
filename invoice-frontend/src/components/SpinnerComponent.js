import React from "react";
import { Audio } from "react-loader-spinner";
import { ArabicContext } from "../context/arabicContext";
import { useContext } from "react";
const SpinnerComponent = () => {
  const { arabic } = useContext(ArabicContext);
  return (
    <div className="Loading">
      <p>{arabic ? "جار التحميل" : "Loading ..."}</p>
      <span>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      </span>
    </div>
  );
};

export default SpinnerComponent;
