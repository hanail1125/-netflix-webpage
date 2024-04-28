import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import './UpcomingMovieSlide.style.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery';

const UpcomingMovieSlide = ({ movieType }) => {
  const { data, isLoading, isError, error } = useMoviesQuery(movieType);
  // console.log('UpcomingMovieData ===>', data);

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
    <div className='upcomingMovie-Slide'>
      <MovieSlider
        title='상영 예정 영화'
        movies={data?.results}
        responsive={responsive}
        movieType={movieType}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
