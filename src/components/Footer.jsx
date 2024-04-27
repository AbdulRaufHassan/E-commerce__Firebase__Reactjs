import React from "react";
import "../css/App.css";

function Footer() {
  return (
    <footer
      className="w-full h-16 bg-teal-500 flex items-center justify-center"
      style={{ boxShadow: "0px -2px 5px 0px rgba(158,153,158,1)" }}
    >
      <p className="text-white ubuntu-font">
        Built by{" "}
        <a
          className="text-black"
          href="https://github.com/AbdulRaufHassan/E-commerce__Firebase__Reactjs.git"
          target="_blank"
        >
          RAUF HASSAN
        </a>
      </p>
    </footer>
  );
}

export default Footer;
