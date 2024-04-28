import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const API_KEY = process.env.REACT_APP_API_KEY;

const fetchRecommendAtions = async (movieId) => {
  return await api.get(`/movie/${movieId}/recommendations?language=ko-KR&api_key=${API_KEY}`);
};

export const useRecommendAtionsQuery = (movieId) => {
  return useQuery({
    queryKey: [`recommendations-${movieId}`],
    queryFn: () => fetchRecommendAtions(movieId),
    select: (result) => result.data,
  });
};