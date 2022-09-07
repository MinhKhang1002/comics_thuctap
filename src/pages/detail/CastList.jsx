import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
const CastList = (props) => {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);
  useEffect(() => {
    const getCasts = async () => {
      const response = await tmdbApi.cast("movie", props.id);
      setCasts(response.cast.slice(0, 5));
    };

    getCasts();
  }, []);

  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div className="casts__item" key={i}>
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.profile_path
              )})`,
            }}
          ></div>
          <p className="casts__item__name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
