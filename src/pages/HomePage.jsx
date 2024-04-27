import React from "react";
import "../css/App.css";
import "../css/homePage.css";
import Header from "../components/Header";
import { Carousel } from "antd";
import CAROUSEL_IMAGE1 from "../assets/images/carousel_img_1.jpg";
import CAROUSEL_IMAGE2 from "../assets/images/carousel_img_2.webp";
import CAROUSEL_IMAGE3 from "../assets/images/carousel_img_3.png";
import Categories from "../components/Categories";
import LatestCollection from "../components/LatestCollection";

function HomePage() {
  return (
    <div className="flex flex-col relative">
      <Header />
      <main className="mt-[88px] w-full h-auto">
        <Carousel autoplay={true}>
          <img
            src={CAROUSEL_IMAGE1}
            className="w-full xs:h-[250px] md:h-[310px] lg:h-[350px] xl:h-[552px] object-fill"
          />
          <img
            src={CAROUSEL_IMAGE2}
            className="w-full xs:h-[250px] md:h-[310px] lg:h-[350px] xl:h-[552px] object-cover"
          />
          <img
            src={CAROUSEL_IMAGE3}
            className="w-full xs:h-[250px] md:h-[310px] lg:h-[350px] xl:h-[552px] object-contain"
          />
        </Carousel>
        <Categories />
        <LatestCollection />
      </main>
    </div>
  );
}

export default HomePage;
