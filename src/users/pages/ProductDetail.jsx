import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/App.css";
import "../css/productDetail.css";
import { HeartFilled, HeartOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Header from "../components/Header";
import {
  allProductsContext,
  allCategoriesContext,
  currentUserDataContext,
} from "../../context/index.js";
import { favouriteToggleContext } from "../../context/FavouriteToggleContext.jsx";
import Footer from "../components/Footer.jsx";
import { cartItemToggleContext } from "../../context/CartTogglecontext.jsx";

function ProductDetail() {
  const { productId } = useParams();
  const allProducts = useContext(allProductsContext);
  const { currentUserData } = useContext(currentUserDataContext);
  const { allCategories, topCollectionDoc } = useContext(allCategoriesContext);
  const [product, setProduct] = useState(null);
  const toggleFavourite = useContext(favouriteToggleContext);
  const {toggleCart} = useContext(cartItemToggleContext);

  useEffect(() => {
    const findProduct = allProducts.find(
      (product) => product.productId == productId
    );
    setProduct(findProduct);
  }, [allProducts]);

  const cartProductNotExist =
    currentUserData?.cartItems.findIndex(
      (item) => item.productId == productId
    ) === -1;
  return (
    <>
      {!product ? (
        <div className="flex items-center justify-center min-h-screen max-h-fit w-full bg-teal-500">
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
      ) : (
        <div className="min-h-screen max-h-fit w-full flex justify-center relative items-center productDetail_mainDiv">
          <Header />
          <div className="flex product_detail_container mt-[170px] sm:mt-[200px] md:mt-[210px] lg:mt-[150px] mb-28">
            <div className="bg-gray-300 product_img_div flex items-center justify-center overflow-hidden">
              <img
                src={product.imgUrl}
                className="max-w-full max-h-full bg-cover"
              />
            </div>
            <div className="flex flex-col product_info_div ml-9">
              <h1 className="text-4xl montserrat-font font-semibold text-black">
                {product.name}
              </h1>
              <div className="flex justify-between items-center mt-4 mb-3">
                <h6 className="text-2xl ubunti-font font-bold text-gray-600">
                  RS {product.price}
                </h6>
                <h6 className=" montserrat-font flex items-center">
                  <span className="text-gray-400 font-medium text-sm mr-2">
                    Category:
                  </span>
                  <span className="text-gray-600 font-semibold flex items-center text-base">
                    {product.category == topCollectionDoc.categoryId
                      ? topCollectionDoc.name
                      : allCategories.find(
                          (category) => product.category == category.categoryId
                        )?.name}
                  </span>
                </h6>
              </div>
              <p
                className="montserrat-font text-gray-400"
                style={{ fontSize: "15px" }}
              >
                {product.discription}
              </p>
              <div className="mt-8 flex items-center w-full h-auto">
                <button
                  className="sm:ml-4"
                  onClick={() => toggleFavourite(productId)}
                >
                  {currentUserData.favouriteItems.includes(
                    product.productId
                  ) ? (
                    <HeartFilled className="text-3xl text-red-600" />
                  ) : (
                    <HeartOutlined className="text-3xl text-gray-500" />
                  )}
                </button>
                <button
                  onClick={() =>
                    toggleCart({ productId: product.productId, quantity: 1 })
                  }
                  className={`mx-6 flex-1 h-12 ${
                    cartProductNotExist ? "bg-teal-500" : "bg-gray-500"
                  } text-white text-lg font-medium rounded-lg montserrat-font`}
                >
                  {cartProductNotExist ? "Add To Cart" : "Remove From Cart"}
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default ProductDetail;
