import React, {useState} from 'react';
import {useMoviesReviewsQuery} from '../../../../hooks/useMoviesReviews';
import {useLocation} from 'react-router-dom';
import './MovieReviews.style.css';

const MovieReviews = () => {
  const location = useLocation();
  const {movieId} = location.state;
  const {data, isLoading, isError, error} = useMoviesReviewsQuery(movieId);

  const [expandedReviews, setExpandedReviews] = useState(Array(data?.results?.length));

  const toggleText = (idx) => {
    setExpandedReviews((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  // console.log('ReviewsMovieId ===>', movieId);
  // console.log('ReviewsData ===>', data);

  return (
    <div style={{flex: 1}} className='reviewsArea'>
      <div>
        {data?.results?.length === 0 && (
          <div className='noReviews'>리뷰 정보 없음.</div>
        )}
        {data?.results?.map((result, idx) => (
          <div key={idx} className='reviews'>
            <h5>{result?.author}</h5>
            <div className='reviewsText'>
              {expandedReviews[idx] ? result?.content : `${result?.content.slice(0, 300)} ...`}
            </div>
            <div onClick={() => toggleText(idx)} className='toggleBtn' style={{color: '#bbb'}}>
              {expandedReviews[idx] ? '접기' : '더보기'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieReviews;
