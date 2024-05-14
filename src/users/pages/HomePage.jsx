import React from "react";
import "../css/App.css";
import "../css/homePage.css";
import Header from "../components/Header";
import { Carousel } from "antd";
import CAROUSEL_IMAGE1 from "../assets/images/carousel_img_1.jpg";
import CAROUSEL_IMAGE2 from "../assets/images/carousel_img_2.webp";
import CAROUSEL_IMAGE3 from "../assets/images/carousel_img_3.jpeg";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import LatestCollection from "../components/LatestCollection";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen max-h-fit w-full relative">
      <Header />
      <main className="mt-[124px] sm:mt-[164px] md:mt-[164px] lg:mt-[88px] w-full h-auto">
        <Carousel autoplay={true}>
          <img
            src={CAROUSEL_IMAGE1}
            className="w-full h-[250px] md:h-[350px] lg:h-[430px] xl:h-[552px] object-cover"
          />
          <img
            src={CAROUSEL_IMAGE2}
            className="w-full h-[250px] md:h-[350px] lg:h-[430px] xl:h-[552px] object-cover"
          />
          <img
            src={CAROUSEL_IMAGE3}
            className="w-full h-[250px] md:h-[350px] lg:h-[430px] xl:h-[552px] object-cover"
          />
        </Carousel>
        <Categories />
        <LatestCollection />
        <Footer />
      </main>
    </div>
  );
}

export default HomePage;
