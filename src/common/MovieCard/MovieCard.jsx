import React from 'react';
import {Badge} from 'react-bootstrap';
import './MovieCard.style.css';
import {useMoviesGenreQuery} from '../../hooks/useMoviesGenre';
import {useNavigate} from 'react-router-dom';

const MovieCard = ({movie, addClass, movieType}) => {
  const {data: genreData} = useMoviesGenreQuery();
  // console.log('movieType ===>?????', movieType);

  const navigate = useNavigate();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  const onClickDetailPage = (e) => {
    e.preventDefault();
    navigate(`/movies/${movie?.id}`, {state: {movieId: movie?.id, movieType}});
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path})`
      }}
      className={`movie-card ${addClass}`}
      onClick={onClickDetailPage}
    >
      <div className='overlay'>
        <h4>{movie?.title}</h4>
        <h6>
          {movie?.title !== movie?.original_title ? movie?.original_title + ' / ' : ''}
          <span>MID : {movie?.id}</span>
        </h6>

        {showGenre(movie.genre_ids).map((genre, idx) => (
          <Badge bg="danger" key={idx} className='me-1'>{genre}</Badge>
        ))}
        <div className='average'>{movie?.vote_average}</div>
        <div>{movie?.popularity}</div >
        <div
          style={{color: movie?.adult ? 'yellow' : '#dc3545'}}
        >{movie?.adult ? 'Over18' : 'Under18'}</div>
      </div>
    </div>
  );
};

export default MovieCard;