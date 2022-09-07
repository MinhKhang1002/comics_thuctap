import React from "react";
import { useParams } from "react-router";
import PageHeader from "../components/page-header/PageHeader";
import { category as cate } from "../api/tmdbApi";
import MovieGrid from "../components/movie-grid/MovieGrid";
import HeroSlide from "../components/heroslide/Heroslide";
const Catalog = () => {
  const { category } = useParams();

  return (
    <>
      <PageHeader>Danh sách truyện</PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid />
        </div>
      </div>
    </>
  );
};

export default Catalog;
