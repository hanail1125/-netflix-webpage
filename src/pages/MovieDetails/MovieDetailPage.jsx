import React, {useState} from 'react';
import './MovieDetailPage.style.css';
import {Alert, Badge, Col, Container, Row, Spinner, Button, Modal} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import {useMoviesIdQuery} from '../../hooks/useMoviesIDQuery';
import MovieReviews from '../Home/Components/Reviews/MovieReviews';
import RecommendAtions from '../Home/Components/RecommendAtions/RecommendAtions';
import {VideoPlayer} from '../../hooks/VideoPlayer';


const MovieDetailPage = () => {
  const [tabMenu, setTabMenu] = useState('REVIEWS');
  const [show, setShow] = useState(false);

  const location = useLocation();
  const {movieId} = location.state;
  const {data, isLoading, isError, error} = useMoviesIdQuery(movieId);
  // console.log('useMoviesIdData ===>', data);

  const onTabMenu = (value) => {
    return setTabMenu(value);
  };

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

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Container className='MovieDetailArea'>
        <Row>
          <Col lg={5} xs={12}>
            <div
              style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path})`,
                width: '100%',
                height: '100%',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
              }}
              className='movie-poster'
            />
          </Col>
          <Col lg={7} xs={12}>
            <div className='movieDetailInfo'>
              {data?.genres?.map((genre, idx) => (
                <Badge bg="danger" key={idx} className='me-2'>{genre.name}</Badge>
              ))}
              <h1>{data?.title}</h1>
              <h4>
                {data?.title !== data?.original_title ? data?.original_title : ''}
              </h4>
              <div style={{display: 'flex', flexDirection: 'row', marginBottom: 30}}>
                <Badge text='dark' bg="warning" className='me-2 vote_average'>추천률</Badge>
                <div style={{marginRight: 15}}>{data?.vote_average}</div>
                <Badge text='dark' bg="warning" className='me-2 vote_average'>인기순</Badge>
                <div style={{marginRight: 15}}>{data?.popularity}</div >
                <Badge text='dark' bg="warning" style={{color: data?.adult ? '#dc3545' : 'yellow'}}>
                  {data?.adult ? 'Over18' : 'ALL'}
                </Badge>
              </div>
              <div style={{
                borderTop: '1px solid #fff',
                borderBottom: '1px solid #fff',
                padding: '25px 0'
              }}>
                {data?.overview ? data?.overview : '영화 요약 정보 없음.'}
              </div>
              <div className='info2'>
                <div className='release_date'>
                  <Badge text='light' bg='danger'>투자금액</Badge>
                  <div>{data?.budget ? `$ ${data?.budget.toLocaleString()}` : '정보 없음'}</div>
                </div>
                <div className='release_date'>
                  <Badge text='light' bg='danger'>수익금액</Badge>
                  <div>{data?.revenue ? `$ ${data?.revenue.toLocaleString()}` : '정보 없음'}</div>
                </div>
                <div className='release_date'>
                  <Badge text='light' bg='danger'>개봉일자</Badge>
                  <div>{data?.release_date}</div>
                </div>
                <div className='release_date'>
                  <Badge text='light' bg='danger'>상영시간</Badge>
                  <div>{data?.runtime ? `${data?.runtime}분` : '정보 없음'}</div>
                </div>
              </div>
            </div>
          </Col>
          <Button
            className='btn btn-warning btn-lg trailer-btn'
            onClick={handleShow}
          >예고편 보기</Button>
        </Row>
        <div className='tabMenus'>
          <button
            onClick={() => onTabMenu('REVIEWS')}
            className={tabMenu === 'REVIEWS' ? 'Active' : 'noActive'}
          >감상 후기</button>
          <button
            onClick={() => onTabMenu('RELATED_MOVIES')}
            className={tabMenu === 'RELATED_MOVIES' ? 'Active' : 'noActive'}
          >추천 영화</button>
        </div>
        {tabMenu === 'REVIEWS' && <MovieReviews />}
        {tabMenu === 'RELATED_MOVIES' && <RecommendAtions />}
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <VideoPlayer />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MovieDetailPage;