import React from "react";
import "../css/App.css";
import "../css/homePage.css";
import TEA_SHIRT_IMG from "../assets/images/teaShirt_img.png";
import SHIRT_IMG from "../assets/images/shirt_img.png";
import PANT_IMG from "../assets/images/pant_img.png";
import WATCH_IMG from "../assets/images/watch_img.png";
import { HeartOutlined } from "@ant-design/icons";

function LatestCollection() {
  return (
    <div className="w-full h-auto box-border mb-6">
      <div className="w-full h-auto flex items-center px-2 box-border">
        <div className="flex-1 h-[2px] bg-gray-400"></div>
        <h1 className="font-bold text-2xl montserrat-font mx-5 uppercase">
          Latest Collection
        </h1>
        <div className="flex-1 h-[2px] bg-gray-400"></div>
      </div>
      <ul className="min-w-fit max-w-fit mx-auto h-auto box-border pt-14 flex justify-center flex-wrap">
        <li className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_item">
          <div className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center item_img_div">
            <img src={TEA_SHIRT_IMG} className="h-52 bg-cover" />
          </div>
          <div className="w-full p-3 box-border">
            <h6 className="montserrat-font font-bold text-2xl mt-2 w-full cursor-pointer">
              Product Name
            </h6>
            <div className="flex items-center justify-between">
              <h6 className="nunito-font font-semibold text-base mt-1 mb-2 w-full text-gray-400">
                RS 500
              </h6>
              <button>
                <HeartOutlined className="text-3xl text-gray-500" />
              </button>
            </div>
            <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-4 montserrat-font">
              Add To Cart
            </button>
          </div>
        </li>
        <li className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_item">
          <div className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center item_img_div">
            <img src={TEA_SHIRT_IMG} className="h-52 bg-cover" />
          </div>
          <div className="w-full p-3 box-border">
            <h6 className="montserrat-font font-bold text-2xl mt-2 w-full cursor-pointer">
              Product Name
            </h6>
            <div className="flex items-center justify-between">
              <h6 className="nunito-font font-semibold text-base mt-1 mb-2 w-full text-gray-400">
                RS 500
              </h6>
              <button>
                <HeartOutlined className="text-3xl text-gray-500" />
              </button>
            </div>
            <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-4 montserrat-font">
              Add To Cart
            </button>
          </div>
        </li>
        <li className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_item">
          <div className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center item_img_div">
            <img src={TEA_SHIRT_IMG} className="h-52 bg-cover" />
          </div>
          <div className="w-full p-3 box-border">
            <h6 className="montserrat-font font-bold text-2xl mt-2 w-full cursor-pointer">
              Product Name
            </h6>
            <div className="flex items-center justify-between">
              <h6 className="nunito-font font-semibold text-base mt-1 mb-2 w-full text-gray-400">
                RS 500
              </h6>
              <button>
                <HeartOutlined className="text-3xl text-gray-500" />
              </button>
            </div>
            <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-4 montserrat-font">
              Add To Cart
            </button>
          </div>
        </li>
        <li className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_item">
          <div className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center item_img_div">
            <img src={TEA_SHIRT_IMG} className="h-52 bg-cover" />
          </div>
          <div className="w-full p-3 box-border">
            <h6 className="montserrat-font font-bold text-2xl mt-2 w-full cursor-pointer">
              Product Name
            </h6>
            <div className="flex items-center justify-between">
              <h6 className="nunito-font font-semibold text-base mt-1 mb-2 w-full text-gray-400">
                RS 500
              </h6>
              <button>
                <HeartOutlined className="text-3xl text-gray-500" />
              </button>
            </div>
            <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-4 montserrat-font">
              Add To Cart
            </button>
          </div>
        </li>
        <li className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_item">
          <div className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center item_img_div">
            <img src={TEA_SHIRT_IMG} className="h-52 bg-cover" />
          </div>
          <div className="w-full p-3 box-border">
            <h6 className="montserrat-font font-bold text-2xl mt-2 w-full cursor-pointer">
              Product Name
            </h6>
            <div className="flex items-center justify-between">
              <h6 className="nunito-font font-semibold text-base mt-1 mb-2 w-full text-gray-400">
                RS 500
              </h6>
              <button>
                <HeartOutlined className="text-3xl text-gray-500" />
              </button>
            </div>
            <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-4 montserrat-font">
              Add To Cart
            </button>
          </div>
        </li>
        <li className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_item">
          <div className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center item_img_div">
            <img src={TEA_SHIRT_IMG} className="h-52 bg-cover" />
          </div>
          <div className="w-full p-3 box-border">
            <h6 className="montserrat-font font-bold text-2xl mt-2 w-full cursor-pointer">
              Product Name
            </h6>
            <div className="flex items-center justify-between">
              <h6 className="nunito-font font-semibold text-base mt-1 mb-2 w-full text-gray-400">
                RS 500
              </h6>
              <button>
                <HeartOutlined className="text-3xl text-gray-500" />
              </button>
            </div>
            <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-4 montserrat-font">
              Add To Cart
            </button>
          </div>
        </li>
        <li className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_item">
          <div className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center item_img_div">
            <img src={TEA_SHIRT_IMG} className="h-52 bg-cover" />
          </div>
          <div className="w-full p-3 box-border">
            <h6 className="montserrat-font font-bold text-2xl mt-2 w-full cursor-pointer">
              Product Name
            </h6>
            <div className="flex items-center justify-between">
              <h6 className="nunito-font font-semibold text-base mt-1 mb-2 w-full text-gray-400">
                RS 500
              </h6>
              <button>
                <HeartOutlined className="text-3xl text-gray-500" />
              </button>
            </div>
            <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-4 montserrat-font">
              Add To Cart
            </button>
          </div>
        </li>
        <li className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_item">
          <div className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center item_img_div">
            <img src={TEA_SHIRT_IMG} className="h-52 bg-cover" />
          </div>
          <div className="w-full p-3 box-border">
            <h6 className="montserrat-font font-bold text-2xl mt-2 w-full cursor-pointer">
              Product Name
            </h6>
            <div className="flex items-center justify-between">
              <h6 className="nunito-font font-semibold text-base mt-1 mb-2 w-full text-gray-400">
                RS 500
              </h6>
              <button>
                <HeartOutlined className="text-3xl text-gray-500" />
              </button>
            </div>
            <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-4 montserrat-font">
              Add To Cart
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default LatestCollection;
