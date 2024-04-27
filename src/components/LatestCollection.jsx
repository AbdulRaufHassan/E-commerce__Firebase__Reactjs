import React from "react";
import "../css/App.css";
import "../css/homePage.css";
import TEA_SHIRT_IMG from "../assets/images/teaShirt_img.png";
import SHIRT_IMG from "../assets/images/shirt_img.png";
import PANT_IMG from "../assets/images/pant_img.png";
import WATCH_IMG from "../assets/images/watch_img.png";

function LatestCollection() {
  return (
    <div className="w-full h-auto box-border">
      <div className="w-full h-auto flex items-center px-2 box-border">
        <div className="flex-1 h-[2px] bg-gray-400"></div>
        <h1 className="font-bold text-2xl montserrat-font mx-5 uppercase">
          Latest Collection
        </h1>
        <div className="flex-1 h-[2px] bg-gray-400"></div>
      </div>
      <ul className="min-w-fit max-w-fit mx-auto h-auto box-border pt-14 flex justify-center flex-wrap">
        <li className="flex flex-col items-center w-[300px] h-auto rounded-2xl bg-gray-300 cursor-pointer p-3 box-border m-2">
          <img src={TEA_SHIRT_IMG} className="h-48" />
          <h6 className="montserrat-font font-bold text-2xl mt-6 w-full">
            Product Name
          </h6>
          <h6 className="nunito-font font-bold text-base mt-1 mb-2 w-full text-gray-600">
            RS 500
          </h6>
          <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-2 montserrat-font">
            Add To Cart
          </button>
        </li>
        <li className="flex flex-col items-center w-[300px] h-auto rounded-2xl bg-gray-300 cursor-pointer p-3 box-border m-2">
          <img src={SHIRT_IMG} className="h-48" />
          <h6 className="montserrat-font font-bold text-2xl mt-6 w-full">
            Product Name
          </h6>
          <h6 className="nunito-font font-bold text-base mt-1 mb-2 w-full text-gray-600">
            RS 500
          </h6>
          <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-2 montserrat-font">
            Add To Cart
          </button>
        </li>
        <li className="flex flex-col items-center w-[300px] h-auto rounded-2xl bg-gray-300 cursor-pointer p-3 box-border m-2">
          <img src={WATCH_IMG} className="h-48" />
          <h6 className="montserrat-font font-bold text-2xl mt-6 w-full">
            Product Name
          </h6>
          <h6 className="nunito-font font-bold text-base mt-1 mb-2 w-full text-gray-600">
            RS 500
          </h6>
          <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-2 montserrat-font">
            Add To Cart
          </button>
        </li>
        <li className="flex flex-col items-center w-[300px] h-auto rounded-2xl bg-gray-300 cursor-pointer p-3 box-border m-2">
          <img src={PANT_IMG} className="h-48" />
          <h6 className="montserrat-font font-bold text-2xl mt-6 w-full">
            Product Name
          </h6>
          <h6 className="nunito-font font-bold text-base mt-1 mb-2 w-full text-gray-600">
            RS 500
          </h6>
          <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-2 montserrat-font">
            Add To Cart
          </button>
        </li>
        <li className="flex flex-col items-center w-[300px] h-auto rounded-2xl bg-gray-300 cursor-pointer p-3 box-border m-2">
          <img src={TEA_SHIRT_IMG} className="h-48" />
          <h6 className="montserrat-font font-bold text-2xl mt-6 w-full">
            Product Name
          </h6>
          <h6 className="nunito-font font-bold text-base mt-1 mb-2 w-full text-gray-600">
            RS 500
          </h6>
          <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-2 montserrat-font">
            Add To Cart
          </button>
        </li>
        <li className="flex flex-col items-center w-[300px] h-auto rounded-2xl bg-gray-300 cursor-pointer p-3 box-border m-2">
          <img src={SHIRT_IMG} className="h-48" />
          <h6 className="montserrat-font font-bold text-2xl mt-6 w-full">
            Product Name
          </h6>
          <h6 className="nunito-font font-bold text-base mt-1 mb-2 w-full text-gray-600">
            RS 500
          </h6>
          <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-2 montserrat-font">
            Add To Cart
          </button>
        </li>
        <li className="flex flex-col items-center w-[300px] h-auto rounded-2xl bg-gray-300 cursor-pointer p-3 box-border m-2">
          <img src={WATCH_IMG} className="h-48" />
          <h6 className="montserrat-font font-bold text-2xl mt-6 w-full">
            Product Name
          </h6>
          <h6 className="nunito-font font-bold text-base mt-1 mb-2 w-full text-gray-600">
            RS 500
          </h6>
          <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-2 montserrat-font">
            Add To Cart
          </button>
        </li>
        <li className="flex flex-col items-center w-[300px] h-auto rounded-2xl bg-gray-300 cursor-pointer p-3 box-border m-2">
          <img src={PANT_IMG} className="h-48" />
          <h6 className="montserrat-font font-bold text-2xl mt-6 w-full">
            Product Name
          </h6>
          <h6 className="nunito-font font-bold text-base mt-1 mb-2 w-full text-gray-600">
            RS 500
          </h6>
          <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-2 montserrat-font">
            Add To Cart
          </button>
        </li>
      </ul>
    </div>
  );
}

export default LatestCollection;
