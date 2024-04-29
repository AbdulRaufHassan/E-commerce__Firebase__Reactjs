import { Modal } from "antd";
import React from "react";
import { addDoc, collection, db } from "../../config";
import { useState } from "react";

function AddCategoryModal({ openCategoryModal, setOpenCategoryModal }) {
    const [categoryInputValue,setCategoryInputValue] = useState("")
  const addCategory = async () => {
    await addDoc(collection(db, "categories"), {
        name: categoryInputValue.trim(),
        products: []
      });
  };
  const closeModal = () => {
    setOpenCategoryModal(false);
  };
  return (
    <Modal
      title="Add Category"
      open={openCategoryModal}
      centered
      maskClosable={false}
      onCancel={closeModal}
      footer={null}
    >
      <form action="" className="mt-6">
        <div>
          <label className="montserrat-font text-sm font-medium text-gray-600">
            Category Name
            <input
              type="text"
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

export default AddCategoryModal;
