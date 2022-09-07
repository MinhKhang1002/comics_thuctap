import React from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/heroslide/Heroslide";
//import MovieList from "../components/movie-list/MovieList";
import { access_token } from "../store/login";
import { category, categoryComics, movieType, tvType } from "../api/tmdbApi";
import MovieList from "../components/movielist/MovieList";
import { useRecoilState } from "recoil";
const Home = () => {
  const [accessToken, setAccessToken] = useRecoilState(access_token);

  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Lịch sử đọc truyện</h2>
            <Link to="/comics">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList category={categoryComics.history} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Truyện đang theo dõi</h2>
            <Link to="/comics">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList category={categoryComics.bookfollow} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Truyện hot trong ngày</h2>
            <Link to="/comics">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList category={categoryComics.topday} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Truyện rating cao</h2>
            <Link to="/comics">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList
            category={categoryComics.toprating}
            type={movieType.top_rated}
          />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Truyện được tìm kiếm</h2>
            <Link to="/comics">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList
            category={categoryComics.topsearch}
            type={tvType.popular}
          />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Truyện hay trong tháng</h2>
            <Link to="/comics">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList category={categoryComics.topmonth} type={tvType.popular} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Truyện hay trong năm</h2>
            <Link to="/comics">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList category={categoryComics.topyear} type={tvType.popular} />
        </div>
      </div>
    </>
  );
};

export default Home;
