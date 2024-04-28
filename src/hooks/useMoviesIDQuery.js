import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const fetchMoviesId = async (movieId) => {
  return await api.get(`/movie/${movieId}?language=ko-KR`);
};

export const useMoviesIdQuery = (movieId) => {
  return useQuery({
    queryKey: [`movie-${movieId}`],
    queryFn: () => fetchMoviesId(movieId),
    select: (result) => result.data,
  });
};