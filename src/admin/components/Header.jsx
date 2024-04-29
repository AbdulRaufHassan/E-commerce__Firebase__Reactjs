import React, { useState } from "react";
import "../css/dashboard.css";
import { AppstoreAddOutlined, LogoutOutlined } from "@ant-design/icons";
import LOGO from "../assets/images/logo.png";
import ADD_PRODUCT_ICON from "../assets/images/add_product_icon.png";
import AddProductModal from "./AddProductModal";
import AddCategoryModal from "./AddCategoryModal";
function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  return (
    <>
      <header className="h-auto w-full fixed top-0 left-0 z-50 bg-teal-500 px-5 py-1">
        <div className="flex items-center justify-between w-full h-auto">
          <button className="h-auto w-auto xs:order-1">
            <img src={LOGO} className="h-20" />
          </button>
          <h1 className="text-white montserrat-font text-2xl font-semibold m-0">
            Welcome Admin
          </h1>
          <div className="w-auto flex items-center montserrat-font xs:order-2 lg:order-3">
            <button
              className="flex flex-col items-center"
              onClick={() => setOpenCategoryModal(true)}
            >
              <AppstoreAddOutlined className="text-3xl" />
              <span className="text-xs mt-1 ubuntu-font">Add Category</span>
            </button>
            <button
              className="mx-6 flex flex-col items-center"
              onClick={() => setOpenModal(true)}
            >
              <img src={ADD_PRODUCT_ICON} className="h-[30px]" />
              <span className="text-xs mt-1 ubuntu-font">Add Product</span>
            </button>
            <button className="mr-2 flex flex-col items-center">
              <LogoutOutlined className="text-3xl" />
              <span className="text-xs mt-1 ubuntu-font">Logout</span>
            </button>
          </div>
        </div>
      </header>
      {openModal && (
        <AddProductModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openCategoryModal && (
        <AddCategoryModal
          openCategoryModal={openCategoryModal}
          setOpenCategoryModal={setOpenCategoryModal}
        />
      )}
    </>
  );
}

export default Header;
