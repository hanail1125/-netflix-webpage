import React from 'react';
import YouTube from 'react-youtube';
import {useVideoIdQuery} from './useVideoIDQuery';
import { useLocation } from 'react-router-dom';

export const VideoPlayer = () => {
  const location = useLocation();
  const {movieId} = location.state;
  const {data, isLoading, isError, error} = useVideoIdQuery(movieId);

  //console.log('VideoIdData ===>', data?.results[0].key);

  const opts = {
    width: '1080',
    height: '720',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <YouTube
      videoId={data?.results[0].key}
      opts={opts}
      onReady={onReady}
    />
  );
};