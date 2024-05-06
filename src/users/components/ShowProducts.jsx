import React, { useContext } from "react";
import "../css/App.css";
import "../css/showProducts.css";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { currentUserDataContext } from "../../context";
import { favouriteToggleContext } from "../../context/FavouriteToggleContext.jsx";

function ShowProducts({ products, onClickFunc }) {
  const { currentUserData } = useContext(currentUserDataContext);
  const toggleFavourite = useContext(favouriteToggleContext);

  return (
    <ul className="min-w-fit max-w-fit mx-auto h-auto box-border pb-24 flex justify-center flex-wrap">
      {products.map(({ imgUrl, name, price, productId }) => (
        <li
          key={productId}
          className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_product"
        >
          <div
            className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center product_img_div"
            onClick={() => onClickFunc(productId)}
          >
            <img src={imgUrl} className="h-52 bg-cover" />
          </div>
          <div className="w-full flex-1 flex flex-col justify-start p-3 box-border">
            <h6
              className="montserrat-font flex-1 flex items-center font-bold text-2xl mt-2 w-full cursor-pointer"
              onClick={() => onClickFunc(productId)}
            >
              {name}
            </h6>
            <div className="flex items-center justify-between">
              <h6 className="nunito-font font-semibold text-xl mt-1 mb-2 w-full text-gray-400">
                RS {price}
              </h6>
              <button onClick={() => toggleFavourite(productId)}>
                {currentUserData.favouriteItems.includes(productId) ? (
                  <HeartFilled className="text-3xl text-red-600" />
                ) : (
                  <HeartOutlined className="text-3xl text-gray-500" />
                )}
              </button>
            </div>
            <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-4 montserrat-font">
              Add To Cart
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ShowProducts;
