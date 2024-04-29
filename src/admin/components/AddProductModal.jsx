import React, { useState } from "react";
import "../css/dashboard.css";
import { Modal, Select } from "antd";

function AddProductModal({ openModal, setOpenModal }) {
  const [productName, setProductName] = useState("");
  const [productDis, setProductDis] = useState("");
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      title="Add Product"
      open={openModal}
      centered
      maskClosable={false}
      onCancel={closeModal}
      footer={null}
    >
      <form action="" className="mt-6">
        <div>
          <label className="montserrat-font text-sm font-medium text-gray-600">
            Product Name
            <input
              type="text"
              className="w-full h-14 border-2 border-gray-400 focus:border-teal-500 focus:outline-none mt-2 bg-transparent rounded-lg px-2 box-border"
            />
          </label>
        </div>
        <div className="mt-6">
          <label className="montserrat-font text-sm font-medium text-gray-600">
            Product Discription
            <textarea className="w-full h-28 border-2 border-gray-400 focus:border-teal-500 focus:outline-none mt-2 bg-transparent rounded-lg p-2 box-border resize-none"></textarea>
          </label>
        </div>
        <div className="mt-6 w-full">
          <label className="montserrat-font text-sm font-medium text-gray-600 w-full flex items-center">
            Select Category
            <Select
              showSearch
              optionFilterProp="children"
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </label>
        </div>
        <div className="mt-6">
          <label className="montserrat-font text-sm font-medium text-gray-600">
            Product Price
            <input
              type="number"
              className="w-full h-14 border-2 border-gray-400 focus:border-teal-500 focus:outline-none mt-2 bg-transparent rounded-lg px-2 box-border"
            />
          </label>
        </div>
        <div className="w-full flex items-center justify-end mt-8">
          <button
            type="reset"
            onClick={closeModal}
            className="w-28 h-12 text-xl ubuntu-font rounded-lg bg-gray-300 text-black mr-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-28 h-12 bg-teal-500 text-white rounded-lg text-xl ubuntu-font"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddProductModal;
