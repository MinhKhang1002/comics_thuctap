import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { access_token } from "../../store/login";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import tmdbApi, { category, categoryComics, comics } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./movie-list.scss";
import MovieCard from "../moviecard/MovieCard";
import { useRecoilState } from "recoil";

const MovieList = (props) => {
  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const token = accessToken;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getList = async () => {
      //   let response = null;
      //   const params = {};
      //   if (props.type !== "similar") {
      //     switch (props.category) {
      //       case category.movie:
      //         response = await tmdbApi.getMoviesList(props.type, {
      //           params,
      //         });
      //         break;
      //       default:
      //         response = await tmdbApi.getTvList(props.type, {
      //           params,
      //         });
      //     }
      //   } else {
      //     response = await tmdbApi.similar(props.category, props.id);
      //   }

      //   setItems(response.results);
      let response = null;
      if (props.category !== "relate") {
        switch (props.category) {
          case categoryComics.topday:
            response = await comics.getTopDay();
            break;
          case categoryComics.topmonth:
            response = await comics.getTopMonth();
            break;
          case categoryComics.topyear:
            response = await comics.getTopYear();
            break;
          case categoryComics.topsearch:
            response = await comics.getTopSearch();
            break;
          case categoryComics.toprating:
            response = await comics.getTopRating();
            break;
          case categoryComics.lastupdate:
            response = await comics.getLastUpdate();
            break;
          case categoryComics.bookfollow:
            response = await comics.getBookFollowing(config);
            break;
          case categoryComics.history:
            response = await comics.getHistory(config);
            
            break;

          default:
          // response = await tmdbApi.getTvList(props.type, {
          //   params,
          // });
        }
      } else {
        response = await comics.relate(props.endpoint);
      }
      if (props.category === categoryComics.history) {
        setHistory(response.data.data);
      }
      
      setItems(response.data.data);
      // console.log(response.data.data);
    };

    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} />
          </SwiperSlide>
        ))}
        {history.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item.book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// MovieList.propTypes = {
//   category: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
// };

export default MovieList;
