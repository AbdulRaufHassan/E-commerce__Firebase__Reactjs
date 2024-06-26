import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import { allProductsContext, currentUserDataContext } from "../../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { favouriteToggleContext } from "../../context/FavouriteToggleContext";
import { cartItemToggleContext } from "../../context/CartTogglecontext";
import ADD_TO_CART from "../assets/images/add_to_cart_icon.png";
import REMOVE_FROM_CART from "../assets/images/remove_from_cart_icon.png";
import { Spin } from "antd";

function FavouriteProducts() {
  const { currentUserData } = useContext(currentUserDataContext);
  const allProducts = useContext(allProductsContext);
  const navigate = useNavigate();
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const removeFavourite = useContext(favouriteToggleContext);
  const { toggleCart } = useContext(cartItemToggleContext);
  const [loading, setLoading] = useState(true);

  const handleProductClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  useEffect(() => {
    const filterProducts = allProducts.filter((product) =>
      currentUserData?.favouriteItems.includes(product.productId)
    );
    setFavouriteProducts(filterProducts);
    setLoading(false);
  }, [currentUserData, allProducts]);
  return (
    <div className="w-full min-h-screen max-h-fit relative flex flex-col">
      <Header />
      <main className="flex flex-col flex-1">
        <div className="h-[124px] sm:h-[156px] md:h-[156px] lg:h-[88px] w-full"></div>
        <div className="h-[150px] md:h-52 w-full bg-slate-800 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl montserrat-font text-white font-bold">
            Favourite List
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
        ) : currentUserData && favouriteProducts.length > 0 ? (
          <>
            <h6 className="ml-4 mb-4 mt-10 montserrat-font text-xl sm:text-2xl text-gray-500 font-semibold">
              {favouriteProducts.length == 1
                ? `${favouriteProducts.length} item`
                : `${favouriteProducts.length} items`}
            </h6>
            <ul className="mb-24">
              {favouriteProducts.map(({ imgUrl, name, price, productId }) => {
                const cartProductNotExist =
                  currentUserData?.cartItems.findIndex(
                    (item) => item.productId == productId
                  ) === -1;
                return (
                  <li
                    key={productId}
                    className="w-[calc(100%-8px)] sm:w-[calc(100%-16px)] mx-1 sm:mx-2 xl:w-4/5 h-auto pr-2 sm:pr-4 py-4 xl:mx-auto mb-8 box-border flex items-center bg-gray-300"
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
                      <div className="flex flex-col">
                        <h1
                          className="font-bold text-[16px] sm:text-xl lg:text-2xl montserrat-font cursor-pointer"
                          onClick={() => handleProductClick(productId)}
                        >
                          {name}
                        </h1>
                        <h6 className="nunito-font font-semibold text-sm sm:text-lg md:text-xl text-gray-500">
                          RS {price}
                        </h6>
                      </div>
                    </div>
                    <div className="flex-1 ml-4 h-auto flex items-center justify-end">
                      <button
                        onClick={() => toggleCart({ productId, quantity: 1 })}
                        className={`text-xs sm:text-sm lg:text-base w-[40px] h-[40px] sm:w-[165px] lg:w-48 sm:h-12 flex items-center justify-center ${
                          cartProductNotExist ? "bg-teal-500" : "bg-gray-500"
                        } text-white mr-3 lg:mr-8 font-medium rounded-full sm:rounded-3xl montserrat-font`}
                      >
                        {cartProductNotExist ? (
                          <>
                            <img
                              src={ADD_TO_CART}
                              className="block sm:hidden h-5"
                            />
                            <span className="hidden sm:block">Add To Cart</span>
                          </>
                        ) : (
                          <>
                            <img
                              src={REMOVE_FROM_CART}
                              className="block sm:hidden h-5"
                            />
                            <span className="hidden sm:block">
                              Remove From Cart
                            </span>
                          </>
                        )}
                      </button>
                      <button onClick={() => removeFavourite(productId)}>
                        <CloseOutlined className="text-xl sm:text-3xl" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          currentUserData && (
            <div className="mb-16 w-full flex justify-center items-center flex-1 montserrat-font text-2xl">
              <h1>No favourite products yet!</h1>
            </div>
          )
        )}
      </main>
      <Footer />
    </div>
  );
}

export default FavouriteProducts;
