import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './RecommendAtions.style.css';
import {useRecommendAtionsQuery} from '../../../../hooks/useRecommendAtionsQuery';

const RecommendAtions = () => {
  const location = useLocation();
  const {movieId} = location.state;
  const {data, isLoading, isError, error} = useRecommendAtionsQuery(movieId);

  const navigate = useNavigate();

  return (
    <div style={{flex: 1}} className='recommendAtions-Area'>
      {data?.results?.length === 0 && (
        <div className='noRecommendAtions'>추천 영화 정보 없음.</div>
      )}
      <div className='recommendAtions'>
        {data?.results?.map((result, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/movies/${result?.id}`, {state: {movieId: result?.id}})}
          >
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${result?.poster_path}`}
              alt={result?.original_title} height={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendAtions;
