import React from "react";
// core version + navigation, pagination modules:
import { Autoplay, EffectCube, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

export function Carousel() {
  // init Swiper:
  // init Swiper:
  //   const swiper = new Swiper(".swiper", {
  //     // configure Swiper to use modules
  //     modules: [Navigation, Pagination, EffectCube],
  //   });

  return (
    <div className="carousel-container">
      <Swiper
        effect={"cube"}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Link className="btn-wrapper" to={"notes-app"}>
            <img src="https://img.favpng.com/25/25/10/post-it-note-computer-icons-sticky-notes-application-software-png-favpng-em2Hk0EpzsFVdufcfPw2KsVC2_t.jpg" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link className="btn-wrapper" to={"mail-app"}>
            <img src="https://a.slack-edge.com/602dd9/img/plugins/channel_email_address/service_512.png" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
