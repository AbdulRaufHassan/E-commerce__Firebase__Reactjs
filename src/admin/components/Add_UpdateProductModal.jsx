import React, { useContext, useEffect, useState } from "react";
import "../css/dashboard.css";
import { Modal, Select, Spin } from "antd";
import {
  arrayRemove,
  arrayUnion,
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  getDownloadURL,
  ref,
  serverTimestamp,
  setDoc,
  storage,
  updateDoc,
  uploadBytes,
} from "../../config";
import { LoadingOutlined } from "@ant-design/icons";
import {
  allCategoriesContext,
  allProductsContext,
} from "../../context/index.js";

function Add_UpdateProductModal({
  openModal,
  setOpenModal,
  editProductId,
  setEditProductId,
}) {
  // ===> When a null is received in the editProductId prop,
  // it means the modal is open for adding a new product.
  // And if it's not null but contains an ID,
  //  it means the modal is open for editing a product. <===

  const { allCategories } = useContext(allCategoriesContext);
  const [productNameInput, setProductNameInput] = useState("");
  const [productDisInput, setProductDisInput] = useState("");
  const [productPriceInput, setProductPriceInput] = useState("");
  const [productInputFile, setProductInputFile] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const allProducts = useContext(allProductsContext);
  const [editProduct, setEditProduct] = useState(null);

  const closeModal = () => {
    setEditProductId(null);
    setEditProduct(null);
    setProductNameInput("");
    setProductDisInput("");
    setProductPriceInput("");
    setProductInputFile(null);
    setLoading(false);
    setOpenModal(false);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productsRef = doc(collection(db, "products"));
      const storageRef = ref(storage, `products/${productsRef.id}`);
      const snapshot = await uploadBytes(storageRef, productInputFile);
      const imageUrl = await getDownloadURL(snapshot.ref);
      await setDoc(productsRef, {
        productId: productsRef.id,
        name: productNameInput.trim(),
        discription: productDisInput.trim(),
        imgUrl: imageUrl,
        price: productPriceInput.trim(),
        timeStamp: serverTimestamp(),
        category: categoryInput,
      });
      const categoryRef = doc(db, "categories", categoryInput);
      await updateDoc(categoryRef, {
        products: arrayUnion(productsRef.id),
      });
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prevCategoryRef = doc(
        db,
        "categories",
        editProduct?.category?.categoryId
      );
      await updateDoc(prevCategoryRef, {
        products: arrayRemove(editProductId),
      });
      const productRef = doc(db, "products", editProductId);
      if (productInputFile) {
        const storageRef = ref(storage, `products/${editProductId}`);
        const snapshot = await uploadBytes(storageRef, editProduct.imageUrl);
        const imageUrl = await getDownloadURL(snapshot.ref);
        await updateDoc(productRef, {
          name: productNameInput.trim(),
          discription: productDisInput.trim(),
          imgUrl: imageUrl,
          price: productPriceInput.trim(),
          timeStamp: serverTimestamp(),
          category: categoryInput,
        });
      } else {
        await updateDoc(productRef, {
          name: productNameInput.trim(),
          discription: productDisInput.trim(),
          price: productPriceInput.trim(),
          timeStamp: serverTimestamp(),
          category: categoryInput,
        });
      }
      const categoryRef = doc(db, "categories", categoryInput);
      await updateDoc(categoryRef, {
        products: arrayUnion(productRef.id),
      });
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  const options = categories.map((category) => ({
    value: category.categoryId,
    label: category.name,
  }));

  useEffect(() => {
    if (editProductId) {
      const findProduct = allProducts.find(
        (product) => product.productId == editProductId
      );
      if (findProduct) {
        const category = allCategories.find(
          (category) => category.categoryId == findProduct.category
        );
        setEditProduct({ ...findProduct, category });
        setProductNameInput(findProduct.name);
        setProductDisInput(findProduct.discription);
        setProductPriceInput(findProduct.price);
        setCategoryInput(category.categoryId);
      }
    }
    setCategories(allCategories);
  }, [allCategories, allProducts, editProductId]);

  return (
    <Modal
      title={editProductId == null ? "Add Product" : "Update Product"}
      open={openModal}
      centered
      maskClosable={false}
      onCancel={closeModal}
      footer={null}
    >
      <form
        onSubmit={!editProductId && !editProduct ? addProduct : updateProduct}
        className="mt-6"
      >
        <div>
          <label className="montserrat-font text-sm font-medium text-gray-600">
            Product Name
            <input
              value={productNameInput}
              onChange={(e) => setProductNameInput(e.target.value)}
              type="text"
              className="text-black w-full h-14 border-2 border-gray-400 focus:border-teal-500 focus:outline-none mt-2 bg-transparent rounded-lg px-2 box-border"
            />
          </label>
        </div>
        <div className="mt-5">
          <label className="montserrat-font text-sm font-medium text-gray-600">
            Product Discription
            <textarea
              value={productDisInput}
              onChange={(e) => setProductDisInput(e.target.value)}
              className="text-black w-full h-28 border-2 border-gray-400 focus:border-teal-500 focus:outline-none mt-2 bg-transparent rounded-lg p-2 box-border resize-none"
            ></textarea>
          </label>
        </div>
        <div className="mt-5 w-full">
          <label className="montserrat-font text-sm font-medium text-gray-600 w-full flex items-center">
            Select Category
            <Select
              showSearch
              defaultValue={{
                value: editProduct?.category?.categoryId,
                label: editProduct?.category?.name,
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(categoryId) => setCategoryInput(categoryId)}
              options={options}
            />
          </label>
        </div>
        <div className="mt-5">
          <label className="montserrat-font text-sm font-medium text-gray-600">
            Product Price
            <input
              value={productPriceInput}
              onChange={(e) => setProductPriceInput(e.target.value)}
              type="number"
              className="text-black w-full h-14 border-2 border-gray-400 focus:border-teal-500 focus:outline-none mt-2 bg-transparent rounded-lg px-2 box-border"
            />
          </label>
        </div>
        <div className="mt-5 w-full flex items-center">
          {editProductId && editProduct && !productInputFile && (
            <img src={editProduct.imgUrl} className="h-24 w-20 bg-cover mr-4" />
          )}
          <div className="w-full flex flex-col">
            <label
              htmlFor="productImg"
              className="montserrat-font text-sm font-medium text-gray-600 w-fit"
            >
              Choose Image
            </label>
            <input
              id="productImg"
              type="file"
              className="mt-2 w-fit"
              onChange={(e) => setProductInputFile(e.target.files[0])}
            />
          </div>
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
            disabled={
              loading ||
              !productNameInput.trim() ||
              !productDisInput.trim() ||
              !categoryInput ||
              !productPriceInput.trim()
            }
            type="submit"
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
            ) : !editProductId ? (
              "Add"
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default Add_UpdateProductModal;
