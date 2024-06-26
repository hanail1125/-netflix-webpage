import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import './RatedMovieSlide.style.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery';

const RatedMovieSlide = ({ movieType }) => {
  const { data, isLoading, isError, error } = useMoviesQuery(movieType);

  if (isLoading) {
    return (
      <div style={{ height: '91vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner
          animation='border'
          variant='danger'
          style={{ width: '5rem', height: '5rem' }}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant='denger'>{error.message}</Alert >;
  }

  return (
    <div className='ratedMovie-Slide'>
      <MovieSlider
        title='최고 등급 영화'
        movies={data?.results}
        responsive={responsive}
        movieType={movieType}
      />
    </div>
  );
};

export default RatedMovieSlide;
