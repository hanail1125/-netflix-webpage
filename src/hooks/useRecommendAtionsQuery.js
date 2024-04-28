import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const fetchRecommendAtions = async (movieId) => {
  return await api.get(`/movie/${movieId}/recommendations?language=ko-KR`);
};

export const useRecommendAtionsQuery = (movieId) => {
  return useQuery({
    queryKey: [`recommendations-${movieId}`],
    queryFn: () => fetchRecommendAtions(movieId),
    select: (result) => result.data,
  });
};