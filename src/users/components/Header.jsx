import React from "react";
import "../css/App.css";
import "../css/homePage.css";
import {
  HeartOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import LOGO from "../assets/images/logo.png";

function Header() {
  return (
    <header className="h-auto w-full fixed top-0 left-0 z-50 bg-teal-500 px-5 py-1 header_boxShadow">
      <div className="flex items-center w-full h-auto">
        <button className="h-auto w-auto xs:order-1">
          <img src={LOGO} className="h-20" />
        </button>
        <div className="flex h-14 flex-1 justify-center xs:order-3 lg:order-2">
          <input
            type="text"
            placeholder="Search Product..."
            className="h-full sm:w-3/12 md:w-4/6 focus:outline-none focus:border-2 focus:border-black px-4 rounded-[30px] montserrat-font font-semibold"
          />
        </div>
        <div className="w-auto flex items-center montserrat-font xs:order-2 lg:order-3">
          <button className="mx-6 relative">
            <HeartOutlined className="text-3xl" />
            <span className="w-[20px] h-[20px] flex items-center justify-center bg-white rounded-full text-xs absolute top-[-5px] right-[-12px]">
              0
            </span>
          </button>
          <button className="mx-6 relative">
            <ShoppingCartOutlined className="text-3xl" />
            <span className="w-[20px] h-[20px] flex items-center justify-center bg-white rounded-full text-xs absolute top-[-5px] right-[-12px]">
              0
            </span>
          </button>
          <button className="ml-6">
            <LogoutOutlined className="text-3xl" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
