import React from 'react';
import {useMoviesQuery} from '../../../../hooks/useMoviesQuery';
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';
import {Button, Spinner} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function Banner({movieType}) {
  const {data, isLoading, isError, error} = useMoviesQuery(movieType);
  console.log('BannerData ===>', data);

  const navigate = useNavigate();

  const onClickDetailPage = (e) => {
    e.preventDefault();
    navigate(
      `/movies/${data?.results[0].id}`,
      {state: {movieId: data?.results[0].id, movieType}}
    );
  };

  const indexNum = data?.results[0].overview !== '' ? 0 : 1;

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
    <div style={{
      backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[indexNum].backdrop_path})`
    }}
      className='banner'
    >
      <div className='text-white banner-text-area'>
        <div className='banner-text-area-title'>
          <h1>{data?.results[indexNum].title}</h1>
          <h3>{data?.results[indexNum].original_title}</h3>
        </div>
        <p className='banner-overview'>{data?.results[indexNum].overview}</p>
        <Button onClick={onClickDetailPage} className='btn btn-outline-light btn-lg'>자세히 보기</Button>
      </div>
    </div>
  );
}

export default Banner;
