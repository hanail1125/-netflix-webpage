import React from 'react';
import './MovieSlider.style.css';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import MovieCard from '../MovieCard/MovieCard';

const MovieSlider = ({ title, movies, responsive, movieType }) => {
  // console.log('movieType ---->', movieType);
  return (
    <div>
      <h3>{title}</h3>
      {movies?.length > 0 &&
        (
          <Carousel
            responsive={responsive}
            infinite={true}
            centerMode={true}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {movies?.map((movie, idx) => {
              return (
                <MovieCard movie={movie} key={idx} movieType={movieType} />
              );
            })}
          </Carousel >
        )
      }
    </div>
  );
};

export default MovieSlider;
