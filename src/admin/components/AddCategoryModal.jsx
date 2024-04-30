import { Modal, Spin } from "antd";
import React from "react";
import {
  collection,
  db,
  doc,
  getDownloadURL,
  ref,
  setDoc,
  storage,
  uploadBytes,
} from "../../config";
import { useState } from "react";
import "../css/dashboard.css";
import { LoadingOutlined } from "@ant-design/icons";

function AddCategoryModal({ openCategoryModal, setOpenCategoryModal }) {
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [categoryInputFile, setCategoryInputFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setCategoryInputValue("");
    setCategoryInputFile([]);
    setOpenCategoryModal(false);
    setLoading(false);
  };

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const docRef = doc(collection(db, "categories"));
      const storageRef = ref(storage, `categories/${docRef.id}`);
      const snapshot = await uploadBytes(storageRef, categoryInputFile);
      const imageUrl = await getDownloadURL(snapshot.ref);
      await setDoc(docRef, {
        categoryId: docRef.id,
        name: categoryInputValue.trim(),
        imgUrl: imageUrl,
        products: [],
      });
      closeModal();
    } catch (e) {
      console.log(e);
    }
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
      <form onSubmit={addCategory} className="mt-6">
        <div>
          <label
            htmlFor="categoryName"
            className="montserrat-font text-sm font-medium text-gray-600"
          >
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryInputValue}
            onChange={(e) => setCategoryInputValue(e.target.value)}
            className="w-full h-14 border-2 border-gray-400 focus:border-teal-500 focus:outline-none mt-2 bg-transparent rounded-lg px-2 box-border text-black"
          />
        </div>
        <div className="mt-5 w-full flex flex-col">
          <label
            htmlFor="categoryImg"
            className="montserrat-font text-sm font-medium text-gray-600 w-fit"
          >
            Choose Image
          </label>
          <input
            id="categoryImg"
            type="file"
            className="mt-2 w-fit"
            onChange={(e) => setCategoryInputFile(e.target.files[0])}
          />
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
            disabled={loading || (!categoryInputValue.trim() || !categoryInputFile)}
            className="w-28 h-12 bg-teal-500 text-white rounded-lg text-xl ubuntu-font"
          >
            {loading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 30,
                      color: "white",
                    }}
                    spin
                  />
                }
              />
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddCategoryModal;
