import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import { allProductsContext, currentUserDataContext } from "../../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { cartItemToggleContext } from "../../context/CartTogglecontext";

function CartProducts() {
  const { currentUserData } = useContext(currentUserDataContext);
  const allProducts = useContext(allProductsContext);
  const [cartProducts, setCartProducts] = useState([]);
  const removeCart = useContext(cartItemToggleContext);
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  const setCartItems = (localStorageCart) => {
    const filterProducts = [];
    allProducts.forEach((product) => {
      const findItem = localStorageCart.find(
        (item) => item.productId == product.productId
      );
      findItem &&
        filterProducts.push({ ...product, quantity: findItem.quantity });
    });
    setCartProducts([...filterProducts]);
  };

  const inc_decQuantity = ({ productId, type }) => {
    const updatedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    updatedCartItems.forEach((product) => {
      if (product.productId === productId) {
        product.quantity =
          type === "increment"
            ? product.quantity + 1
            : product.quantity > 1
            ? product.quantity - 1
            : product.quantity;
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  useEffect(() => {
    const getItems = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(getItems);
  }, [
    currentUserData,
    allProducts,
    JSON.parse(localStorage.getItem("cartItems")),
  ]);
  return (
    <div className="w-full min-h-screen max-h-fit relative flex flex-col">
      <Header />
      <main className="flex flex-col flex-1">
        <div className="h-[100px] sm:h-[150px] md:h-[150px] lg:h-[88px] w-full"></div>
        <div
          className="h-52 w-full bg-slate-800 flex flex-col justify-center items-center"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <h1 className="text-6xl montserrat-font text-white font-bold">
            Cart List
          </h1>
        </div>
        {cartProducts.length > 0 ? (
          <div className="flex h-auto justify-between w-full mb-24">
            <div className="w-3/5 ml-4 h-auto">
              <h6 className="mb-4 mt-10 montserrat-font text-2xl text-gray-500 font-semibold">
                {cartProducts.length == 1
                  ? `${cartProducts.length} item`
                  : `${cartProducts.length} items`}
              </h6>
              <ul>
                {cartProducts.map(
                  ({ imgUrl, name, price, productId, quantity }) => (
                    <li
                      key={productId}
                      className="h-auto p-4 my-8 box-border flex items-center bg-gray-300"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                    >
                      <div className="w-auto h-auto flex items-center">
                        <div className="min-w-28 max-w-28 h-auto">
                          <img
                            src={imgUrl}
                            className="h-24 cover cursor-pointer"
                            onClick={() => handleProductClick(productId)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1
                            className="font-bold text-2xl montserrat-font cursor-pointer"
                            onClick={() => handleProductClick(productId)}
                          >
                            {name}
                          </h1>
                          <h6 className="nunito-font font-semibold text-xl text-gray-500">
                            RS {price}
                          </h6>
                        </div>
                      </div>
                      <div className="flex-1 h-auto flex items-center justify-end">
                        <div className="text-gray-500 mr-8 flex items-center">
                          <button
                            className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center"
                            onClick={() =>
                              inc_decQuantity({ productId, type: "increment" })
                            }
                          >
                            <PlusOutlined className="text-lg" />
                          </button>
                          <span className="text-2xl mx-4 montserrat-font">
                            {quantity}
                          </span>
                          <button
                            className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center"
                            onClick={() =>
                              inc_decQuantity({ productId, type: "decrement" })
                            }
                          >
                            <MinusOutlined className="text-lg" />
                          </button>
                        </div>
                        <button onClick={() => removeCart({ productId })}>
                          <CloseOutlined className="text-3xl" />
                        </button>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div
              className="h-[300px] w-[30%] bg-white mr-4 mt-16"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            ></div>
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
