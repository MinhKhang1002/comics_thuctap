import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./readcomic.scss";
import { useParams } from "react-router";
import { comicsAPI } from "../../api/axiosClient";
import { useRecoilState } from "recoil";
import { access_token } from "../../store/login";

const ReadComic = (props) => {
  const { endpoint, chapter } = useParams();
  const [detail, setDetail] = useState();
  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const token = accessToken;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await comicsAPI.get(
          `chapter/detail/${endpoint}/${chapter}?view=true`,
          config
        );
        console.log(response.data.data[0]);
        setDetail(response.data.data[0]);
      } catch {
        console.log("error");
      }
    };
    getDetail();
  }, []);
  return (
    <div className="main">
      {detail && (
        <>
          <h1>{detail.book_endpoint}</h1>
          <h2>{detail.title}</h2>

          {detail.images &&
            detail.images[0].includes("https") &&
            detail.images.map((item, i) => (
              <img className="comic" key={i} src={item} alt=""></img>
            ))}

          {detail.images &&
            detail.images[0] !== "https://i.imgur.com/Znxamr4.jpg" &&
            detail.images.map((item, i) => <p className="comic">{item}</p>)}
        </>
      )}
    </div>
  );
};

export default ReadComic;
