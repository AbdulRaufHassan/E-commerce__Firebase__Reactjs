import React from "react";
import "../css/App.css";
import "../css/homePage.css";
import {
  HeartOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import LOGO from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="h-auto w-full fixed top-0 left-0 z-50 bg-teal-500 px-2 md:px-5 py-1 header_boxShadow">
      <div className="flex items-center justify-between lg:justify-normal flex-wrap lg:flex-nowrap w-full h-auto">
        <button
          className="h-auto w-auto order-1"
          onClick={() => navigate("/Home")}
        >
          <img src={LOGO} className="h-14 sm:h-20" />
        </button>
        <div className="flex h-12 sm:h-14 flex-none lg:flex-1 w-full justify-center order-3 lg:order-2 mt-2 mb-1 lg:mt-0 lg:mb-0">
          <input
            type="text"
            placeholder="Search Product..."
            className="h-full w-full lg:w-4/6 focus:outline-none focus:border-2 focus:border-black px-4 rounded-[30px] montserrat-font font-semibold"
          />
        </div>
        <div className="w-auto flex items-center montserrat-font order-2 lg:order-3">
          <button className="mx-4 sm:mx-6 relative">
            <HeartOutlined className="text-2xl sm:text-3xl" />
            <span className="w-[17px] h-[17px] sm:w-[20px] sm:h-[20px] flex items-center justify-center bg-white rounded-full text-xs absolute top-[-5px] right-[-10px] sm:right-[-12px]">
              0
            </span>
          </button>
          <button className="mx-4 sm:mx-6 relative">
            <ShoppingCartOutlined className="text-2xl sm:text-3xl" />
            <span className="w-[17px] h-[17px] sm:w-[20px] sm:h-[20px] flex items-center justify-center bg-white rounded-full text-xs absolute top-[-5px] right-[-10px] sm:right-[-12px]">
              0
            </span>
          </button>
          <button className="ml-4 sm:ml-6">
            <LogoutOutlined className="text-2xl sm:text-3xl" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
