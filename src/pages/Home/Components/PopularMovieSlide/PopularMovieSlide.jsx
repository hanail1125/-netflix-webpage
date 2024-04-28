import React from 'react';
import {Alert, Spinner} from 'react-bootstrap';
import './PopularMovieSlide.style.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import {responsive} from '../../../../constants/responsive';
import {useMoviesQuery} from '../../../../hooks/useMoviesQuery';

const PopularMovieSlide = ({movieType}) => {
  const {data, isLoading, isError, error} = useMoviesQuery(movieType);
  // console.log('PopularMovieData ===>', data);

  if (isLoading) {
    return (
      <div style={{height: '91vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Spinner
          animation='border'
          variant='danger'
          style={{width: '5rem', height: '5rem'}}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert >;
  }

  return (
    <div className='popularMovie-Slide'>
      <MovieSlider
        title='상위 인기 영화'
        movies={data?.results}
        responsive={responsive}
        movieType={movieType}
      />
    </div >
  );
};

export default PopularMovieSlide;
