import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovies = async (movieType) => {
  return await api.get(`/movie/${movieType}?language=ko-KR`);
};

export const useMoviesQuery = (movieType) => {
  return useQuery({
    queryKey: [`movie-${movieType}`],
    queryFn: () => fetchMovies(movieType),
    select: (result) => result.data,
  });
};