import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/App.css";
import "../css/productDetail.css";
import { HeartOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Header from "../components/Header";
import { allProductsContext } from "../../context/allProductsContext";

function ProductDetail() {
  const { productId } = useParams();
  const allProducts = useContext(allProductsContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const findProduct = allProducts.find(
      (product) => product.productId == productId
    );
    setProduct(findProduct);
  }, [allProducts]);
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
        <div className="min-h-screen max-h-fit w-full flex justify-center items-center productDetail_mainDiv">
          <Header />
          <div className="flex product_detail_container mt-[170px] sm:mt-[200px] md:mt-[210px] lg:mt-[88px] mb-5">
            <div className="bg-gray-300 product_img_div flex items-center justify-center">
              <img src={product.imgUrl} className="max-w-[80%] max-h-[80%]" />
            </div>
            <div className="flex flex-col product_info_div ml-9">
              <h1 className="text-4xl montserrat-font font-semibold text-black">
                {product.name}
              </h1>
              <h6 className="text-2xl ubunti-font font-bold text-gray-600 mt-4 mb-3">
                RS {product.price}
              </h6>
              <p
                className="montserrat-font text-gray-400"
                style={{ fontSize: "15px" }}
              >
                {product.discription}
              </p>
              <div className="mt-8 flex items-center w-full h-auto">
                <button className="sm:ml-4">
                  <HeartOutlined className="text-3xl text-gray-500" />
                </button>
                <button className="mx-6 flex-1 h-12 bg-teal-500 text-white text-lg font-medium rounded-lg montserrat-font">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
