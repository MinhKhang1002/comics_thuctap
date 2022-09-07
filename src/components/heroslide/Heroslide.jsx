import React, { useState, useEffect } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi, { comics, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/Button";

import "./hero-slide.scss";
import { Link, useNavigate } from "react-router-dom";

const HeroSlide = () => {
  const [comic, setComic] = useState([]);
  SwiperCore.use([Autoplay]);
  useEffect(() => {
    const getComics = async () => {
      try {
        const res = await comics.getTopSearch();
        setComic(res.data.data.slice(1, 10));
      } catch {
        console.log("error");
      }
    };
    getComics();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {comic.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""} `}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HeroSlideItem = (props) => {
  let navigate = useNavigate();

  const item = props.item;
  const link = "/" + "book/detail" + "/" + item.endpoint;
  const poster = props.poster;
  // console.log(poster);
  const background = item.theme;
  // console.log(poster);
  // console.log(background);
  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.description}</div>
          <div className="btns">
            <Link to={link}>
              <Button>Xem ngay</Button>
            </Link>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={item.theme || item.thumb} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
