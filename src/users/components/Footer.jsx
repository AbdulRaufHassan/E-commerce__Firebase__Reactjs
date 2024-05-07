import React from "react";
import "../css/App.css";

function Footer() {
  return (
    <footer
      className="w-full h-16 absolute bottom-0 left-0 bg-teal-500 flex items-center justify-center z-50"
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
