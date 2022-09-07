import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";

const VideoList = (props) => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, props.id);
      setVideos(response.results.slice(0, 5));
      //console.log(response.cast);
    };

    getVideos();
  }, [category, props.id]);
  return (
    <>
      {videos.map((video, i) => (
        <Video key={i} item={video}></Video>
      ))}
    </>
  );
};

const Video = (props) => {
  const item = props.item;
  console.log(item);
  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        height="820px"
        width="100%"
        title="video"
      />
    </div>
  );
};

export default VideoList;
