import React from "react";

const Announc = ({ bg }) => {
  return (
    <div
      className={`absolute top-0 z-0 w-full  min-h-[66px]  ${
        bg && "nav__color"
      }`}
    ></div>
  );
};

export default Announc;
