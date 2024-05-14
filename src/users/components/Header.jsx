import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import "../css/homePage.css";
import {
  HeartOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import LOGO from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import {
  allProductsContext,
  currentUserDataContext,
} from "../../context/index.js";
import { cartItemToggleContext } from "../../context/CartTogglecontext.jsx";
import { auth, signOut } from "../../config/index.js";

function Header() {
  const { currentUserData } = useContext(currentUserDataContext);
  const { setCartItemLocalStrg } = useContext(cartItemToggleContext);
  const [productSearchInput, setProductSearchInput] = useState("");
  const allProducts = useContext(allProductsContext);
  const navigate = useNavigate();
  const [totalCartItems, setTotalCartItems] = useState(0);

  useEffect(() => {
    if (currentUserData?.cartItems) {
      setCartItemLocalStrg();
      const localCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      let totalQuantity = 0;
      localCartItems.forEach((item) => {
        totalQuantity += item.quantity;
      });
      setTotalCartItems(totalQuantity);
    }
  });

  const searchProducts =
    productSearchInput.trim() &&
    allProducts.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(productSearchInput.toLowerCase());
    });

  return (
    <header className="h-auto w-full fixed top-0 left-0 z-50 bg-teal-500 px-2 md:px-5 py-1 header_boxShadow">
      <div className="flex items-center justify-between lg:justify-normal flex-wrap lg:flex-nowrap w-full h-auto">
        <button
          className="h-auto w-auto order-1"
          onClick={() => navigate("/Home")}
        >
          <img src={LOGO} className="h-14 sm:h-20" />
        </button>
        <div className="flex h-12 relative sm:h-16 flex-none lg:flex-1 w-full justify-center order-3 lg:order-2 mt-2 mb-1 lg:mt-0 lg:mb-0">
          <input
            value={productSearchInput}
            onChange={(e) => setProductSearchInput(e.target.value)}
            type="text"
            placeholder="Search Product..."
            className="h-full w-full lg:w-[80%] focus:outline-none focus:border-2 focus:border-gray-500 px-4 rounded-[30px] montserrat-font font-semibold"
          />
          {productSearchInput.trim() && (
            <div
              className={`absolute hide-scroll-bar p-2 pb-0 ${
                searchProducts.length > 1 ? "xl:py-2" : "xl:pt-2"
              } box-border top-[53px] sm:top-[70px] left-1/2 transform -translate-x-1/2 right-2/4 min-h-fit max-h-[300px] w-full lg:w-[75%] bg-white z-50 rounded-xl overflow-auto`}
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
              }}
            >
              {searchProducts.length > 0 ? (
                <ul
                  className={`flex flex-col ${
                    searchProducts.length > 1 && "xl:flex-row xl:flex-wrap"
                  } justify-center items-start`}
                >
                  {searchProducts.map((product) => (
                    <li
                      key={product.productId}
                      className={`w-full ${
                        searchProducts.length > 1 && "xl:w-[48%] xl:m-1"
                      } cursor-pointer rounded-md h-24 flex items-center mb-2 bg-slate-200 border border-gray-500`}
                      onClick={() =>
                        navigate(`/productDetail/${product.productId}`)
                      }
                    >
                      <div className="w-[60px] h-16 sm:w-[70px] sm:h-20 flex items-center justify-center">
                        <img
                          src={product.imgUrl}
                          className="max-w-full max-h-full bg-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="montserrat-font font-semibold text-base sm:text-lg">
                          {product.name}
                        </h4>
                        <h5 className="ubuntu-font text-gray-500 text-sm sm:text-base">
                          RS {product.price}
                        </h5>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex w-full h-[200px] items-center justify-center text-2xl montserrat-font">
                  No Product Found
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-auto flex items-center montserrat-font order-2 lg:order-3">
          <button
            className="mx-4 sm:mx-6 relative"
            onClick={() => navigate("/favouriteList")}
          >
            <HeartOutlined className="text-2xl sm:text-3xl" />
            <span className="w-[17px] h-[17px] sm:w-[20px] sm:h-[20px] flex items-center justify-center bg-white rounded-full text-xs absolute top-[-5px] right-[-10px] sm:right-[-12px]">
              {currentUserData?.favouriteItems?.length || 0}
            </span>
          </button>
          <button
            className="mx-4 sm:mx-6 relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartOutlined className="text-2xl sm:text-3xl" />
            <span className="w-[17px] h-[17px] sm:w-[20px] sm:h-[20px] flex items-center justify-center bg-white rounded-full text-xs absolute top-[-5px] right-[-10px] sm:right-[-12px]">
              {totalCartItems}
            </span>
          </button>
          <button
            className="ml-4 sm:ml-6"
            onClick={() => {
              signOut(auth)
                .then(() => {
                  console.log("sign out successfully");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <LogoutOutlined className="text-2xl sm:text-3xl" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
