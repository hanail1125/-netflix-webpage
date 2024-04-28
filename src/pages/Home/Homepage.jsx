import React from 'react';
import Banner from './Components/Banner/Banner';
import PopularMovieSlide from './Components/PopularMovieSlide/PopularMovieSlide';
import RatedMovieSlide from './Components/RatedMovieSlide/RatedMovieSlide';
import UpcomingMovieSlide from './Components/UpcomingMovieSlide/UpcomingMovieSlide';
import Test from '../../Test';

const HomePage = () => {
  return (
    <>
      <div>
        <Banner movieType='popular' />
        <PopularMovieSlide movieType='popular' />
        <RatedMovieSlide movieType='top_rated' />
        <UpcomingMovieSlide movieType='upcoming' />
      </div>
    </>
  );
};

export default HomePage;