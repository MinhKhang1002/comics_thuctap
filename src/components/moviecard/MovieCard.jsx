import React from "react";

import "./movie-card.scss";

import { Link } from "react-router-dom";

import Button from "../button/Button";

import { category, categoryComics } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const MovieCard = (props) => {
  const item = props.item;

  const link = "/" + "book/detail" + "/" + item.endpoint;

  // console.log(item.endpoint);

  // const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  const bg = item.theme;

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i>Đọc truyện</i>
        </Button>
      </div>
      <h4>{item.title || item.name}</h4>
    </Link>
  );
};

export default MovieCard;
