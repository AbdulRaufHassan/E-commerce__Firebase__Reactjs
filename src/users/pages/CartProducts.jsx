import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import {
  allCategoriesContext,
  allProductsContext,
  currentUserDataContext,
} from "../../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  CloseOutlined,
  LoadingOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { cartItemToggleContext } from "../../context/CartTogglecontext";
import { Spin } from "antd";
import {
  collection,
  db,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "../../config";

function CartProducts() {
  const { currentUserData } = useContext(currentUserDataContext);
  const { allCategories } = useContext(allCategoriesContext);
  const allProducts = useContext(allProductsContext);
  const [cartProducts, setCartProducts] = useState([]);
  const { toggleCart } = useContext(cartItemToggleContext);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  const getAndSetCartItems = (localStorageCart) => {
    const filterProducts = [];
    allProducts.forEach((product) => {
      const findItem = localStorageCart.find(
        (item) => item.productId == product.productId
      );
      const categoryFind = allCategories.find(
        (category) => category.categoryId == product.category
      );
      findItem &&
        filterProducts.push({
          ...product,
          category: {
            categoryId: categoryFind.categoryId,
            categoryName: categoryFind.name,
            categoryImage: categoryFind.imgUrl,
          },
          quantity: findItem.quantity,
        });
    });
    setCartProducts([...filterProducts]);
    setLoading(false);
  };

  const calculateTotal = () => {
    let value = 0;
    cartProducts.forEach((product) => {
      value += product.price * product.quantity;
    });
    setTotal(value);
  };

  const inc_decQuantity = ({ productId, type }) => {
    const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = getCartItems.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity:
            type === "increment" ? item.quantity + 1 : item.quantity - 1,
        };
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    getAndSetCartItems(updatedCartItems);
    calculateTotal();
  };

  const submitOrder = async () => {
    setBtnLoading(true);
    let cartItems = [];
    cartProducts.forEach((crtProduct) => {
      cartItems.push({
        productId: crtProduct.productId,
        productName: crtProduct.name,
        price: Number(crtProduct.price),
        image: crtProduct.imgUrl,
        quantity: crtProduct.quantity,
        category: crtProduct.category,
      });
    });
    const ordersRef = doc(collection(db, "orders"));
    await setDoc(ordersRef, {
      orderId: ordersRef.id,
      userUid: currentUserData.uid,
      userEmailAddress: currentUserData.emailAddress,
      cartItems,
      totalPrice: total,
      timeStamp: serverTimestamp(),
    });
    const userRef = doc(db, "users", currentUserData.uid);
    await updateDoc(userRef, {
      cartItems: [],
    });
    setBtnLoading(false);
  };

  useEffect(() => {
    getAndSetCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, [currentUserData]);

  useEffect(() => {
    calculateTotal();
  });

  return (
    <div className="w-full min-h-screen max-h-fit relative flex flex-col">
      <Header />
      <main className="flex flex-col flex-1">
        <div className="h-[124px] sm:h-[156px] md:h-[156px] lg:h-[88px] w-full"></div>
        <div className="h-[150px] md:h-52 w-full bg-slate-800 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl montserrat-font text-white font-bold">
            Cart List
          </h1>
        </div>
        {!currentUserData || loading ? (
          <div className="flex items-center justify-center w-full mt-11">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 60,
                    color: "black",
                  }}
                  spin
                />
              }
            />
          </div>
        ) : cartProducts.length > 0 ? (
          <div className="flex h-auto justify-between flex-col-reverse lg:flex-row w-full mb-24">
            <div className="h-auto mx-2 md:mx-4 w-[calc(100%-16px)] md:w-[calc(100%-32px)] lg:w-[65%]">
              <h6 className="mx-4 mt-10 mb-4 montserrat-font text-xl sm:text-2xl text-gray-500 font-semibold">
                {cartProducts.length == 1
                  ? `${cartProducts.length} item`
                  : `${cartProducts.length} items`}
              </h6>
              <ul className="w-full">
                {cartProducts.map(
                  ({ imgUrl, name, price, productId, quantity }) => (
                    <li
                      key={productId}
                      className="h-auto py-4 pr-2 sm:pr-4 min-w-full max-w-full mb-8 box-border flex items-center bg-gray-300"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <div className="w-auto h-auto flex items-center">
                        <div className="min-w-[80px] max-w-[80px] sm:min-w-28 sm:max-w-28 h-auto flex items-center justify-center">
                          <img
                            src={imgUrl}
                            className="h-[70px] sm:h-24 cover cursor-pointer"
                            onClick={() => handleProductClick(productId)}
                          />
                        </div>
                        <div className="flex flex-col pr-5 sm:pr-0">
                          <h1
                            className="font-bold text-[16px] sm:text-xl md:text-2xl montserrat-font cursor-pointer"
                            onClick={() => handleProductClick(productId)}
                          >
                            {name}
                          </h1>
                          <h6 className="nunito-font font-semibold text-sm sm:text-lg md:text-xl text-gray-500">
                            RS {price}
                          </h6>
                        </div>
                      </div>
                      <div className="flex-1 h-auto flex items-center justify-end">
                        <div className="text-gray-500 mr-4 sm:mr-6 md:mr-8 flex items-center">
                          <button
                            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] rounded-full bg-white flex items-center justify-center"
                            onClick={() =>
                              inc_decQuantity({ productId, type: "increment" })
                            }
                          >
                            <PlusOutlined className="text-base sm:text-lg" />
                          </button>
                          <span className="text-xl sm:text-2xl mx-2 sm:mx-3 md:mx-4 montserrat-font">
                            {quantity}
                          </span>
                          <button
                            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] rounded-full bg-white flex items-center justify-center"
                            onClick={() =>
                              quantity != 1 &&
                              inc_decQuantity({ productId, type: "decrement" })
                            }
                          >
                            <MinusOutlined className="text-base sm:text-lg" />
                          </button>
                        </div>
                        <button onClick={() => toggleCart({ productId })}>
                          <CloseOutlined className="text-xl sm:text-3xl" />
                        </button>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div
              className="h-fit w-[300px] sm:w-[400px] lg:w-[30%] ml-4 lg:ml-0 bg-white mr-4 mt-10 p-4 box-border flex flex-col"
              style={{
                boxShadow:
                  "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
              }}
            >
              <div className="w-full flex justify-between montserrat-font mt-2">
                <h1 className="text-gray-500 text-2xl font-semibold">Total</h1>
                <h1 className="text-black text-2xl">{total}</h1>
              </div>
              <button
                disabled={btnLoading}
                className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-6 montserrat-font"
                onClick={submitOrder}
              >
                {btnLoading ? (
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
                  "Buy Now"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-16 w-full flex justify-center items-center flex-1 montserrat-font text-2xl">
            <h1>No Cart products yet!</h1>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default CartProducts;
