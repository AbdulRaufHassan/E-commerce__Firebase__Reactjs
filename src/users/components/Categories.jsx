import React from "react";
import "../css/App.css";
import "../css/homePage.css";
import TEA_SHIRT_IMG from "../assets/images/teaShirt_img.png";
import SHIRT_IMG from "../assets/images/shirt_img.png";
import PANT_IMG from "../assets/images/pant_img.png";
import WATCH_IMG from "../assets/images/watch_img.png";

function Categories() {
  return (
    <div className="w-full h-auto box-border py-16">
      <div className="w-full h-auto flex items-center px-2 box-border">
        <div className="flex-1 h-[2px] bg-gray-400"></div>
        <h1 className="font-bold text-2xl montserrat-font mx-5 uppercase">
          EXPLORE CATEGORIES
        </h1>
        <div className="flex-1 h-[2px] bg-gray-400"></div>
      </div>
      <div className="h-auto w-full overflow-x-auto hide-scroll-bar">
        <ul className="min-w-fit max-w-fit mx-auto h-auto box-border pt-14 flex categories">
          <li className="flex flex-col items-center w-auto h-auto cursor-pointer mx-4 category">
            <div className="rounded-full bg-gray-300 category_img_div flex justify-center items-center">
              <img src={TEA_SHIRT_IMG} className="h-32 bg-cover" />
            </div>
            <h6 className="text-teal-500 ubuntu-font font-medium text-2xl mt-3">
              Tea Shirts
            </h6>
          </li>
          <li className="flex flex-col items-center w-auto h-auto cursor-pointer mx-4 category">
            <div className="rounded-full bg-gray-300 category_img_div flex justify-center items-center">
              <img src={TEA_SHIRT_IMG} className="h-32 bg-cover" />
            </div>
            <h6 className="text-teal-500 ubuntu-font font-medium text-2xl mt-3">
              Tea Shirts
            </h6>
          </li>
          <li className="flex flex-col items-center w-auto h-auto cursor-pointer mx-4 category">
            <div className="rounded-full bg-gray-300 category_img_div flex justify-center items-center">
              <img src={TEA_SHIRT_IMG} className="h-32 bg-cover" />
            </div>
            <h6 className="text-teal-500 ubuntu-font font-medium text-2xl mt-3">
              Tea Shirts
            </h6>
          </li>
          <li className="flex flex-col items-center w-auto h-auto cursor-pointer mx-4 category">
            <div className="rounded-full bg-gray-300 category_img_div flex justify-center items-center">
              <img src={TEA_SHIRT_IMG} className="h-32 bg-cover" />
            </div>
            <h6 className="text-teal-500 ubuntu-font font-medium text-2xl mt-3">
              Tea Shirts
            </h6>
          </li>
          <li className="flex flex-col items-center w-auto h-auto cursor-pointer mx-4 category">
            <div className="rounded-full bg-gray-300 category_img_div flex justify-center items-center">
              <img src={TEA_SHIRT_IMG} className="h-32 bg-cover" />
            </div>
            <h6 className="text-teal-500 ubuntu-font font-medium text-2xl mt-3">
              Tea Shirts
            </h6>
          </li>
          <li className="flex flex-col items-center w-auto h-auto cursor-pointer mx-4 category">
            <div className="rounded-full bg-gray-300 category_img_div flex justify-center items-center">
              <img src={TEA_SHIRT_IMG} className="h-32 bg-cover" />
            </div>
            <h6 className="text-teal-500 ubuntu-font font-medium text-2xl mt-3">
              Tea Shirts
            </h6>
          </li>
          <li className="flex flex-col items-center w-auto h-auto cursor-pointer mx-4 category">
            <div className="rounded-full bg-gray-300 category_img_div flex justify-center items-center">
              <img src={TEA_SHIRT_IMG} className="h-32 bg-cover" />
            </div>
            <h6 className="text-teal-500 ubuntu-font font-medium text-2xl mt-3">
              Tea Shirts
            </h6>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Categories;
